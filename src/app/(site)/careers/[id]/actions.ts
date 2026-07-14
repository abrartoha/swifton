"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const schema = z.object({
  jobId: z.string().uuid(),
  full_name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.string().trim().email("Please enter a valid email").max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  cover_note: z.string().trim().max(3000).optional().or(z.literal("")),
  company: z.string().max(0).optional(), // honeypot
});

export type ApplyState = {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};

export async function submitApplication(
  _prev: ApplyState,
  formData: FormData,
): Promise<ApplyState> {
  const parsed = schema.safeParse({
    jobId: formData.get("jobId"),
    full_name: formData.get("full_name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    cover_note: formData.get("cover_note"),
    company: formData.get("company"),
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return { ok: false, error: "Please check the form.", fieldErrors };
  }

  if (parsed.data.company) return { ok: true }; // silently drop bots

  try {
    const supabase = await createClient();
    // Link to the applicant if they happen to be signed in (so they can
    // track status), otherwise store as an anonymous application.
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("job_applications").insert({
      job_id: parsed.data.jobId,
      applicant_id: user?.id ?? null,
      full_name: parsed.data.full_name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      cover_note: parsed.data.cover_note || null,
      stage: "received",
    });
    if (error) throw error;
  } catch {
    return {
      ok: false,
      error:
        "We couldn't submit your application right now. Please try again shortly.",
    };
  }

  return { ok: true };
}
