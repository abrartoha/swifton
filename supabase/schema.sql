-- ============================================================================
-- Swifton Group — Mother website database schema
-- ----------------------------------------------------------------------------
-- Run this in the Supabase SQL editor (or via `supabase db push`).
-- Security model: Row-Level Security is ON for every table. Nothing is
-- readable or writable unless a policy below explicitly allows it.
-- ============================================================================

-- Extensions -----------------------------------------------------------------
create extension if not exists "pgcrypto";

-- Roles enum -----------------------------------------------------------------
do $$
begin
  if not exists (select 1 from pg_type where typname = 'user_role') then
    create type user_role as enum (
      'super_admin',
      'division_manager',
      'hr_manager',
      'employee',
      'rental_client',
      'public'
    );
  end if;
end$$;

-- ============================================================================
-- profiles — one row per auth user, carrying role + brand
-- ============================================================================
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  full_name   text,
  role        user_role not null default 'public',
  brand       text,                      -- e.g. 'hospitality', 'security'; null for group-wide
  created_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Helper: is the current user an admin-tier role?
-- SECURITY DEFINER avoids recursive RLS when a policy needs to read profiles.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
      and role in ('super_admin', 'division_manager', 'hr_manager')
  );
$$;

create or replace function public.is_super_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'super_admin'
  );
$$;

-- A user can read their own profile; admins can read all.
create policy "profiles: read own or admin"
  on public.profiles for select
  using (id = auth.uid() or public.is_admin());

-- A user may update their own non-privileged fields.
-- Role changes are blocked here (see trigger below) so users can't escalate.
create policy "profiles: update own"
  on public.profiles for update
  using (id = auth.uid())
  with check (id = auth.uid());

-- Super admins may update any profile (incl. role).
create policy "profiles: super admin manage"
  on public.profiles for all
  using (public.is_super_admin())
  with check (public.is_super_admin());

-- Prevent privilege escalation: a non-super-admin cannot change their own role.
create or replace function public.prevent_role_escalation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.role is distinct from old.role and not public.is_super_admin() then
    raise exception 'Not permitted to change role';
  end if;
  return new;
end;
$$;

drop trigger if exists trg_prevent_role_escalation on public.profiles;
create trigger trg_prevent_role_escalation
  before update on public.profiles
  for each row execute function public.prevent_role_escalation();

-- New auth users get a default 'public' profile automatically.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, new.raw_user_meta_data ->> 'full_name', 'public')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================================
-- contact_enquiries — from the public contact + brand enquiry forms
-- ============================================================================
create table if not exists public.contact_enquiries (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  email        text not null,
  phone        text,
  destination  text not null default 'group',   -- routed brand
  subject      text,
  message      text not null,
  status       text not null default 'new',      -- new | in_progress | closed
  created_at   timestamptz not null default now()
);

alter table public.contact_enquiries enable row level security;

-- Public visitors may submit (INSERT) an enquiry, but never read them.
create policy "enquiries: public can submit"
  on public.contact_enquiries for insert
  to anon, authenticated
  with check (true);

-- Only admins may read/manage enquiries.
create policy "enquiries: admin read"
  on public.contact_enquiries for select
  using (public.is_admin());

create policy "enquiries: admin update"
  on public.contact_enquiries for update
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================================================
-- services — the group's service showcase (was "projects")
-- ============================================================================
create table if not exists public.services (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  brand        text not null,             -- which brand delivers it
  summary      text,
  description  text,
  outcome      text,
  image_url    text,
  is_published boolean not null default false,
  sort_order   int not null default 0,
  created_at   timestamptz not null default now()
);

alter table public.services enable row level security;

-- Anyone may read *published* services; admins see everything.
create policy "services: read published or admin"
  on public.services for select
  to anon, authenticated
  using (is_published = true or public.is_admin());

create policy "services: admin manage"
  on public.services for all
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================================================
-- job_postings — open roles across all brands
-- ============================================================================
create table if not exists public.job_postings (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  brand        text not null,
  location     text,
  employment_type text,
  description  text,
  is_open      boolean not null default true,
  created_at   timestamptz not null default now()
);

alter table public.job_postings enable row level security;

create policy "jobs: read open or admin"
  on public.job_postings for select
  to anon, authenticated
  using (is_open = true or public.is_admin());

create policy "jobs: admin manage"
  on public.job_postings for all
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================================================
-- job_applications — candidate submissions + status tracker
-- ============================================================================
create table if not exists public.job_applications (
  id           uuid primary key default gen_random_uuid(),
  job_id       uuid references public.job_postings (id) on delete set null,
  applicant_id uuid references auth.users (id) on delete set null,
  full_name    text not null,
  email        text not null,
  phone        text,
  cv_url       text,                       -- file lives in storage; this points to it
  cover_note   text,
  -- Application Received -> Under Review -> Interview -> Decision
  stage        text not null default 'received',
  created_at   timestamptz not null default now()
);

alter table public.job_applications enable row level security;

-- Anyone may submit an application.
create policy "applications: submit"
  on public.job_applications for insert
  to anon, authenticated
  with check (true);

-- A signed-in applicant may read their own applications (to track status);
-- admins may read all.
create policy "applications: read own or admin"
  on public.job_applications for select
  using (
    (applicant_id is not null and applicant_id = auth.uid())
    or public.is_admin()
  );

create policy "applications: admin manage"
  on public.job_applications for update
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================================================
-- audit_log — accountability trail of key admin actions
-- ============================================================================
create table if not exists public.audit_log (
  id          uuid primary key default gen_random_uuid(),
  actor_id    uuid references auth.users (id) on delete set null,
  action      text not null,
  entity      text,
  entity_id   text,
  detail      jsonb,
  created_at  timestamptz not null default now()
);

alter table public.audit_log enable row level security;

-- Only super admins may read the audit log; inserts happen via trusted
-- server code using the service role (which bypasses RLS).
create policy "audit: super admin read"
  on public.audit_log for select
  using (public.is_super_admin());

-- ============================================================================
-- Done. Every table above has RLS enabled with least-privilege policies.
-- To create the first super admin, sign a user up, then run (as service role):
--   update public.profiles set role = 'super_admin' where id = '<user-uuid>';
-- ============================================================================
