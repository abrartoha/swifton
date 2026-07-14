"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const schema = z.object({
  email: z.string().trim().email().max(200),
  password: z.string().min(1).max(200),
  redirectTo: z.string().optional(),
});

export type LoginState = { error?: string };

/** Only allow same-origin relative redirects to avoid open-redirect abuse. */
function safeRedirect(target: string | undefined): string {
  if (target && target.startsWith("/") && !target.startsWith("//")) {
    return target;
  }
  return "/admin";
}

export async function signIn(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsed = schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    redirectTo: formData.get("redirectTo"),
  });

  if (!parsed.success) {
    return { error: "Please enter a valid email and password." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    // Deliberately generic — don't reveal whether the email exists.
    return { error: "Invalid email or password." };
  }

  redirect(safeRedirect(parsed.data.redirectTo));
}
