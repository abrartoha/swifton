import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-sand-50 px-6">
      <div className="text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-3 font-serif text-4xl font-semibold text-navy-900">
          Page not found
        </h1>
        <p className="mt-3 text-navy-600">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <Link href="/" className="btn-primary mt-8">
          Return home
        </Link>
      </div>
    </div>
  );
}
