import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { Logo } from "@/components/Logo";

const roleLabels: Record<string, string> = {
  super_admin: "Super Admin",
  division_manager: "Division Manager",
  hr_manager: "HR / Roster Manager",
};

const navItems = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/enquiries", label: "Enquiries" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/careers", label: "Careers" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side gate. Runs on every admin page render — never trust the
  // middleware alone. Redirects if signed out or not an admin role.
  const profile = await requireAdmin();

  return (
    <div className="flex min-h-screen bg-sand-50">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-navy-100 bg-white md:flex">
        <div className="border-b border-navy-100 px-6 py-6">
          <Logo />
        </div>
        <nav className="flex-1 space-y-1 px-4 py-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-navy-700 hover:bg-navy-50 hover:text-navy-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-navy-100 px-6 py-5">
          <p className="text-sm font-medium text-navy-900">
            {profile.full_name ?? "Signed in"}
          </p>
          <p className="text-xs text-navy-500">
            {roleLabels[profile.role] ?? profile.role}
            {profile.brand ? ` · ${profile.brand}` : ""}
          </p>
          <form action="/auth/signout" method="post" className="mt-4">
            <button
              type="submit"
              className="text-sm font-medium text-gold-600 hover:text-gold-700"
            >
              Sign out
            </button>
          </form>
        </div>
      </aside>

      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-navy-100 bg-white px-6 py-4 md:hidden">
          <Logo />
          <form action="/auth/signout" method="post">
            <button type="submit" className="text-sm font-medium text-gold-600">
              Sign out
            </button>
          </form>
        </header>
        <main className="px-6 py-10 md:px-10">{children}</main>
      </div>
    </div>
  );
}
