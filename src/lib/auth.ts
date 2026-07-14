import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/** Roles as defined in Section 4 of the specification. */
export type Role =
  | "super_admin"
  | "division_manager"
  | "hr_manager"
  | "employee"
  | "rental_client"
  | "public";

/** Roles permitted to view the group admin dashboard. */
export const ADMIN_ROLES: Role[] = [
  "super_admin",
  "division_manager",
  "hr_manager",
];

export type Profile = {
  id: string;
  full_name: string | null;
  role: Role;
  brand: string | null;
};

/**
 * Returns the signed-in user and their profile, or null.
 * getUser() verifies the token with Supabase on every call.
 */
export async function getCurrentProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, full_name, role, brand")
    .eq("id", user.id)
    .single();

  return (profile as Profile) ?? null;
}

/**
 * Guard for admin pages. Redirects to /login if signed out, or to
 * /admin/no-access if the role is not permitted. Returns the profile
 * so pages can further scope by role/brand.
 */
export async function requireAdmin(): Promise<Profile> {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  if (!ADMIN_ROLES.includes(profile.role)) redirect("/no-access");
  return profile;
}
