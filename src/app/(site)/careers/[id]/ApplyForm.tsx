"use client";

import { useActionState } from "react";
import { submitApplication, type ApplyState } from "./actions";

const initial: ApplyState = { ok: false };

export function ApplyForm({ jobId }: { jobId: string }) {
  const [state, formAction, pending] = useActionState(
    submitApplication,
    initial,
  );

  if (state.ok) {
    return (
      <div className="rounded-2xl border border-gold-200 bg-sand-100 p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-navy-900 text-gold-400">
          ✓
        </div>
        <h3 className="mt-4 font-serif text-xl font-semibold text-navy-900">
          Application received
        </h3>
        <p className="mt-2 text-sm text-navy-600">
          Thank you. We&apos;ll review your application and be in touch. Sign in
          to track your progress through the stages.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="jobId" value={jobId} />
      {state.error && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {state.error}
        </p>
      )}

      <div className="hidden" aria-hidden>
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label htmlFor="full_name" className="field-label">
          Full name
        </label>
        <input id="full_name" name="full_name" required className="field" />
        {state.fieldErrors?.full_name && (
          <p className="mt-1 text-xs text-red-600">
            {state.fieldErrors.full_name}
          </p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
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
        <div>
          <label htmlFor="phone" className="field-label">
            Phone <span className="text-navy-400">(optional)</span>
          </label>
          <input id="phone" name="phone" className="field" />
        </div>
      </div>

      <div>
        <label htmlFor="cover_note" className="field-label">
          Cover note <span className="text-navy-400">(optional)</span>
        </label>
        <textarea
          id="cover_note"
          name="cover_note"
          rows={4}
          className="field resize-y"
          placeholder="Tell us briefly why you'd be a great fit."
        />
      </div>

      <p className="text-xs text-navy-500">
        By applying you agree to our{" "}
        <a href="/privacy" className="text-gold-600 hover:text-gold-700">
          Privacy Policy
        </a>
        .
      </p>

      <button type="submit" disabled={pending} className="btn-primary w-full">
        {pending ? "Submitting…" : "Submit application"}
      </button>
    </form>
  );
}
