"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { enquiryDestinations } from "@/lib/site";

const destinations = enquiryDestinations.map((d) => d.value) as [
  string,
  ...string[],
];

// Server-side validation — never trust the client. Length caps also blunt
// abuse and oversized payloads.
const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.string().trim().email("Please enter a valid email").max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  destination: z.enum(destinations),
  subject: z.string().trim().max(160).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Please add a little more detail")
    .max(4000),
  // Honeypot: bots fill hidden fields; humans leave it blank.
  company: z.string().max(0).optional(),
});

export type ContactState = {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};

export async function submitEnquiry(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    destination: formData.get("destination"),
    subject: formData.get("subject"),
    message: formData.get("message"),
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

  // Silently accept honeypot hits so bots don't learn they were caught.
  if (parsed.data.company) return { ok: true };

  const { company: _drop, ...enquiry } = parsed.data;

  try {
    const supabase = await createClient();
    // Anon insert is permitted by the "enquiries: public can submit" RLS policy.
    const { error } = await supabase.from("contact_enquiries").insert({
      name: enquiry.name,
      email: enquiry.email,
      phone: enquiry.phone || null,
      destination: enquiry.destination,
      subject: enquiry.subject || null,
      message: enquiry.message,
    });
    if (error) throw error;
  } catch {
    return {
      ok: false,
      error:
        "We couldn't send your enquiry right now. Please email us directly and we'll respond promptly.",
    };
  }

  return { ok: true };
}
