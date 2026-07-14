import { getCurrentProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function safeCount(
  table: string,
  eq?: { column: string; value: string | boolean },
): Promise<number | null> {
  try {
    const supabase = await createClient();
    const query = supabase
      .from(table)
      .select("*", { count: "exact", head: true });
    const { count } = eq
      ? await query.eq(eq.column, eq.value)
      : await query;
    return count ?? 0;
  } catch {
    return null;
  }
}

export default async function AdminOverview() {
  const profile = await getCurrentProfile();

  const [newEnquiries, openRoles, applications, publishedServices] =
    await Promise.all([
      safeCount("contact_enquiries", { column: "status", value: "new" }),
      safeCount("job_postings", { column: "is_open", value: true }),
      safeCount("job_applications"),
      safeCount("services", { column: "is_published", value: true }),
    ]);

  const cards = [
    { label: "New enquiries", value: newEnquiries },
    { label: "Open roles", value: openRoles },
    { label: "Applications", value: applications },
    { label: "Published services", value: publishedServices },
  ];

  return (
    <div>
      <p className="eyebrow">Group Admin</p>
      <h1 className="mt-2 font-serif text-3xl font-semibold text-navy-900">
        Welcome back{profile?.full_name ? `, ${profile.full_name}` : ""}.
      </h1>
      <p className="mt-2 text-navy-600">
        An at-a-glance view of the whole group.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-2xl border border-navy-100 bg-white p-6 shadow-elegant"
          >
            <p className="text-sm text-navy-500">{c.label}</p>
            <p className="mt-3 font-serif text-4xl font-semibold text-navy-900">
              {c.value === null ? "—" : c.value}
            </p>
          </div>
        ))}
      </div>

      {newEnquiries === null && (
        <div className="mt-10 rounded-xl border border-gold-200 bg-sand-100 p-6 text-sm text-navy-700">
          <p className="font-medium">Connect Supabase to see live figures.</p>
          <p className="mt-1 text-navy-600">
            Add your project keys to <code>.env.local</code> and run{" "}
            <code>supabase/schema.sql</code>. Full setup steps are in{" "}
            <code>README.md</code>.
          </p>
        </div>
      )}

      <div className="mt-12 rounded-2xl border border-navy-100 bg-white p-8">
        <h2 className="font-serif text-xl font-semibold text-navy-900">
          Managing the group
        </h2>
        <p className="mt-2 text-sm text-navy-600">
          This is the group&apos;s central admin. From here, head office oversees
          every brand&apos;s enquiries, services, and careers. Brand-specific
          portals (Rentals clients, Hospitality &amp; Security staff) live on
          each brand&apos;s own website and share this same secure engine.
        </p>
      </div>
    </div>
  );
}
