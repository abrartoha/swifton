import type { Metadata } from "next";
import { PageHeader, SectionHeading } from "@/components/ui";
import { createClient } from "@/lib/supabase/server";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { AnimatedGrid } from "@/components/AnimatedGrid";

export const metadata: Metadata = {
  title: "Services — Vehicle Rental, Hospitality & Security",
  description:
    "Explore the services delivered across Swifton Group brands: vehicle rental and rideshare fleet, professional housekeeping, and licensed security personnel across Australia.",
  alternates: { canonical: "https://swiftongroup.com.au/services" },
  openGraph: {
    title: "Services — Swifton Group",
    description:
      "Vehicle rental, hospitality, and security services delivered by our family of Australian brands.",
    url: "https://swiftongroup.com.au/services",
  },
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
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ]}
      />
      <PageHeader
        eyebrow="What we do"
        title="Services across the group"
        intro="A group-wide look at the services our brands deliver every day. Each is run by an independent Swifton brand — visit that brand's website for full details."
      />

      <section className="container-page py-20">
        <SectionHeading eyebrow="Our offering" title="Delivered by our brands" />

        <AnimatedGrid className="mt-12 grid gap-6 md:grid-cols-2" stagger={150}>
          {list.map((s, i) => {
            const accents = [
              "border-t-brand-red",
              "border-t-brand-orange",
              "border-t-brand-green",
              "border-t-brand-blue",
            ];
            return (
              <article
                key={s.id}
                className={`flex flex-col rounded-2xl border border-navy-100 border-t-[3px] ${accents[i % 4]} bg-white p-8 shadow-elegant transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
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
            );
          })}
        </AnimatedGrid>
      </section>
    </>
  );
}
