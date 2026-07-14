import type { Metadata } from "next";
import { PageHeader, SectionHeading } from "@/components/ui";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Services",
  description:
    "The services delivered across the Swifton Group family of brands — from vehicle rental to hospitality, security, and education.",
};

// Rendered fresh so newly published services appear without a rebuild.
export const dynamic = "force-dynamic";

type ServiceRow = {
  id: string;
  title: string;
  brand: string;
  summary: string | null;
  outcome: string | null;
  image_url: string | null;
};

/** Curated fallback shown when the database has no published services yet. */
const fallbackServices: Omit<ServiceRow, "id">[] = [
  {
    title: "Vehicle rental & rideshare fleet",
    brand: "Swifton Rentals",
    summary:
      "Cars, scooters, and electric cycles on flexible weekly terms, with a full self-service portal for agreements, invoices, and payments.",
    outcome: "Trusted by rideshare drivers and everyday renters.",
    image_url: null,
  },
  {
    title: "Housekeeping & commercial cleaning",
    brand: "Swifton Hospitality",
    summary:
      "Professional housekeeping and cleaning contracts for hotels, venues, and commercial sites, delivered by a trained, rostered workforce.",
    outcome: "Consistent standards across every site.",
    image_url: null,
  },
  {
    title: "Event & venue security",
    brand: "Swifton Security",
    summary:
      "Licensed security personnel for hotels, pubs, clubs, and private or public events, coordinated through a unified staff system.",
    outcome: "Compliant, reliable crowd and venue safety.",
    image_url: null,
  },
  {
    title: "Education & migration guidance",
    brand: "Swifton Global",
    summary:
      "Course pathways, certifications, and migration services with clear fees and expert, end-to-end support for students.",
    outcome: "Guiding students from enrolment to arrival.",
    image_url: null,
  },
];

export default async function ServicesPage() {
  let services: ServiceRow[] = [];

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("services")
      .select("id, title, brand, summary, outcome, image_url")
      .eq("is_published", true)
      .order("sort_order", { ascending: true });
    if (data) services = data as ServiceRow[];
  } catch {
    // Supabase not yet configured — fall back to the curated list below.
  }

  const list =
    services.length > 0
      ? services
      : fallbackServices.map((s, i) => ({ ...s, id: `fallback-${i}` }));

  return (
    <>
      <PageHeader
        eyebrow="What we do"
        title="Services across the group"
        intro="A group-wide look at the services our brands deliver every day. Each is run by an independent Swifton brand — visit that brand's website for full details."
      />

      <section className="container-page py-20">
        <SectionHeading eyebrow="Our offering" title="Delivered by our brands" />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {list.map((s) => (
            <article
              key={s.id}
              className="flex flex-col rounded-2xl border border-navy-100 bg-white p-8 shadow-elegant"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-600">
                {s.brand}
              </span>
              <h3 className="mt-3 font-serif text-2xl font-semibold text-navy-900">
                {s.title}
              </h3>
              {s.summary && (
                <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-600">
                  {s.summary}
                </p>
              )}
              {s.outcome && (
                <p className="mt-5 border-t border-navy-100 pt-4 text-sm italic text-navy-500">
                  {s.outcome}
                </p>
              )}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
