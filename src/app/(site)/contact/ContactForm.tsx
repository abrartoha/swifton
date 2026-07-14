"use client";

import { useActionState } from "react";
import { submitEnquiry, type ContactState } from "./actions";
import { enquiryDestinations } from "@/lib/site";

const initial: ContactState = { ok: false };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitEnquiry, initial);

  if (state.ok) {
    return (
      <div className="rounded-2xl border border-gold-200 bg-sand-100 p-10 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-navy-900 text-gold-400">
          ✓
        </div>
        <h3 className="mt-5 font-serif text-2xl font-semibold text-navy-900">
          Thank you — your enquiry is on its way.
        </h3>
        <p className="mt-3 text-navy-600">
          The right team will be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {state.error && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {state.error}
        </p>
      )}

      {/* Honeypot — visually hidden, ignored by humans */}
      <div className="hidden" aria-hidden>
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="field-label">
            Full name
          </label>
          <input id="name" name="name" required className="field" />
          {state.fieldErrors?.name && (
            <p className="mt-1 text-xs text-red-600">
              {state.fieldErrors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="field-label">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="field"
          />
          {state.fieldErrors?.email && (
            <p className="mt-1 text-xs text-red-600">
              {state.fieldErrors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="field-label">
            Phone <span className="text-navy-400">(optional)</span>
          </label>
          <input id="phone" name="phone" className="field" />
        </div>
        <div>
          <label htmlFor="destination" className="field-label">
            Enquiry for
          </label>
          <select
            id="destination"
            name="destination"
            defaultValue="group"
            className="field"
          >
            {enquiryDestinations.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="field-label">
          Subject <span className="text-navy-400">(optional)</span>
        </label>
        <input id="subject" name="subject" className="field" />
      </div>

      <div>
        <label htmlFor="message" className="field-label">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="field resize-y"
        />
        {state.fieldErrors?.message && (
          <p className="mt-1 text-xs text-red-600">
            {state.fieldErrors.message}
          </p>
        )}
      </div>

      <button type="submit" disabled={pending} className="btn-primary w-full">
        {pending ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}
