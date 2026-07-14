import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { enquiryDestinations } from "@/lib/site";

export const dynamic = "force-dynamic";

type Enquiry = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  destination: string;
  subject: string | null;
  message: string;
  status: string;
  created_at: string;
};

const destLabel = (v: string) =>
  enquiryDestinations.find((d) => d.value === v)?.label ?? v;

export default async function EnquiriesPage() {
  await requireAdmin();

  let enquiries: Enquiry[] = [];
  let dbError = false;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("contact_enquiries")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) throw error;
    enquiries = (data as Enquiry[]) ?? [];
  } catch {
    dbError = true;
  }

  return (
    <div>
      <p className="eyebrow">Group Admin</p>
      <h1 className="mt-2 font-serif text-3xl font-semibold text-navy-900">
        Enquiries
      </h1>
      <p className="mt-2 text-navy-600">
        Messages from the group and brand contact forms, routed by destination.
      </p>

      {dbError ? (
        <div className="mt-8 rounded-xl border border-gold-200 bg-sand-100 p-6 text-sm text-navy-700">
          Connect Supabase to view enquiries. See <code>README.md</code>.
        </div>
      ) : enquiries.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-navy-200 bg-white p-12 text-center text-navy-500">
          No enquiries yet.
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {enquiries.map((e) => (
            <article
              key={e.id}
              className="rounded-2xl border border-navy-100 bg-white p-6 shadow-elegant"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-navy-900 px-3 py-1 text-xs font-medium text-gold-400">
                  {destLabel(e.destination)}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    e.status === "new"
                      ? "bg-gold-100 text-gold-700"
                      : "bg-navy-50 text-navy-500"
                  }`}
                >
                  {e.status}
                </span>
                <span className="ml-auto text-xs text-navy-400">
                  {new Date(e.created_at).toLocaleString("en-AU")}
                </span>
              </div>
              <h2 className="mt-4 font-serif text-lg font-semibold text-navy-900">
                {e.subject || "(No subject)"}
              </h2>
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-navy-700">
                {e.message}
              </p>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 border-t border-navy-100 pt-4 text-sm text-navy-600">
                <span>{e.name}</span>
                <a
                  href={`mailto:${e.email}`}
                  className="text-gold-600 hover:text-gold-700"
                >
                  {e.email}
                </a>
                {e.phone && <span>{e.phone}</span>}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
