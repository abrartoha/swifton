# Swifton Group — Mother Website

The corporate "mother" website for **Swifton Group Pty Ltd**: the group's front
door that introduces the family of brands, routes enquiries to the right team,
lists careers, and houses the role-gated **group admin**.

Built with **Next.js (App Router) + TypeScript + Tailwind CSS**, backed by
**Supabase** (Postgres + Auth) with strict Row-Level Security.

---

## Design

An elegant, clean identity for the "mother" of the group:

- **Midnight navy** — authority, trust, the anchor brand
- **Warm gold** — heritage and quality; the accent that ties the family together
- **Warm neutrals** — generous whitespace and calm, editorial layout
- Serif display (Cormorant Garamond) + clean sans (Inter)

Design tokens live in [`tailwind.config.ts`](./tailwind.config.ts).

---

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

The **public pages work immediately** with placeholder Supabase values — they
fall back to curated content. Auth, the admin dashboard, and live data need a
real Supabase project (below).

---

## Connecting Supabase

1. Create a free project at [supabase.com](https://supabase.com).
2. In the SQL editor, run [`supabase/schema.sql`](./supabase/schema.sql). This
   creates every table with **Row-Level Security enabled** and least-privilege
   policies.
3. Copy `.env.local.example` to `.env.local` and fill in:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (server-only — never exposed to the browser)
4. Create your first admin: sign a user up through Supabase Auth, then run in
   the SQL editor:
   ```sql
   update public.profiles set role = 'super_admin' where id = '<user-uuid>';
   ```
5. Sign in at `/login` and you'll reach `/admin`.

---

## Security model

Security was a first-class requirement. What's in place:

| Layer | Protection |
| --- | --- |
| **Database** | RLS enabled on **every** table; nothing is readable/writable without an explicit policy. |
| **Roles** | `super_admin`, `division_manager`, `hr_manager`, `employee`, `rental_client`, `public` (Section 4 of the spec). |
| **Privilege escalation** | A DB trigger blocks non-super-admins from changing their own role. |
| **Admin gate** | Middleware guards `/admin`, and every admin page independently re-checks the role server-side via `requireAdmin()`. |
| **Auth verification** | Uses `supabase.auth.getUser()` (revalidates the token) — never trusts `getSession()` alone for authorization. |
| **Service-role key** | Isolated in `src/lib/supabase/admin.ts`, server-only, never bundled to the client. |
| **Input validation** | All form input validated server-side with **zod**; length caps on every field. |
| **Bot mitigation** | Honeypot fields on public forms. |
| **Open-redirect safety** | Login only honours same-origin relative redirects. |
| **HTTP headers** | Strict CSP, HSTS, `X-Frame-Options: DENY`, `nosniff`, restrictive `Permissions-Policy` (see `next.config.ts`). |
| **Generic auth errors** | Login never reveals whether an email exists. |
| **Secrets** | `.env.local` is git-ignored; only `NEXT_PUBLIC_*` values reach the browser. |

---

## Project structure

```
src/
  app/
    (site)/            Public pages (Header + Footer chrome)
      page.tsx         Home — hero + brand family cards
      about/           About the group + registered details
      services/        Group-wide services (was "projects")
      careers/         Openings + application tracker + apply flow
      contact/         Routed enquiry form (server action + zod)
      privacy/  terms/ Legal pages (Australian requirements)
    login/             Portal login
    admin/             Role-gated group admin (layout re-checks role)
    auth/signout/      POST sign-out route
    no-access/         Shown to signed-in users without an admin role
  components/          Logo, Header, Footer, shared UI
  lib/
    site.ts            Group details + brand family (single source of truth)
    auth.ts            Role helpers + requireAdmin()
    supabase/          client / server / admin / middleware
supabase/schema.sql    Full DB schema with RLS policies
```

---

## Notes

- Brand cards link out to each brand's own website (see `src/lib/site.ts`) —
  update the `href`s as domains are purchased.
- Group details (ABN/ACN/address/email) come from env vars with sensible
  fallbacks, shown in the footer and legal pages per Australian requirements.
- Deployment to Vercel/GitHub is intentionally out of scope here — this runs
  locally as requested.
