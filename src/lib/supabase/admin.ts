import { createClient } from "@supabase/supabase-js";

/**
 * Service-role client — bypasses Row-Level Security.
 *
 * SECURITY: only import this from trusted server code (Route Handlers /
 * Server Actions) after you have independently verified the caller's role.
 * The service key must never reach the browser. This module has no
 * "use client" and reads a non-public env var, so bundling it client-side
 * would fail the build.
 */
export function createAdminClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not configured");
  }
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
