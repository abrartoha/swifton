import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Portal Login",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const { redirect } = await searchParams;

  return (
    <div className="flex min-h-screen flex-col bg-navy-950">
      <div className="container-page pt-10">
        <Logo variant="light" />
      </div>

      <div className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <div className="rounded-2xl bg-white p-8 shadow-elegant md:p-10">
            <p className="eyebrow">Swifton Group</p>
            <h1 className="mt-3 font-serif text-3xl font-semibold text-navy-900">
              Portal login
            </h1>
            <p className="mt-3 text-sm text-navy-600">
              Sign in to access the group admin. Client and staff portals live
              on each brand&apos;s own website.
            </p>
            <div className="mt-8">
              <LoginForm redirectTo={redirect} />
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-navy-400">
            <Link href="/" className="hover:text-white">
              ← Back to swiftongroup.com.au
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
