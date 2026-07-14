import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "No Access",
  robots: { index: false, follow: false },
};

export default function NoAccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-950 px-6">
      <div className="mx-auto max-w-lg text-center">
        <p className="eyebrow text-gold-400">403</p>
        <h1 className="mt-3 font-serif text-3xl font-semibold text-white">
          You don&apos;t have access to the group admin.
        </h1>
        <p className="mt-3 text-navy-300">
          Your account is signed in, but its role doesn&apos;t permit access to
          this area. If you believe this is a mistake, contact head office.
        </p>
        <form action="/auth/signout" method="post" className="mt-8">
          <button type="submit" className="btn-gold">
            Sign out
          </button>
        </form>
        <p className="mt-4">
          <Link href="/" className="text-sm text-navy-400 hover:text-white">
            ← Back to the website
          </Link>
        </p>
      </div>
    </div>
  );
}
