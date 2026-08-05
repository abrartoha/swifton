import type { Metadata } from "next";
import { brands, site } from "@/lib/site";
import { PageHeader, SectionHeading } from "@/components/ui";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "About Us — Melbourne Australian Business Group",
  description:
    "Learn about Swifton Group, a Melbourne-based holding group operating independent Australian brands in vehicle rental, hospitality, cleaning, security and mobility. ABN registered, Australian-owned.",
  alternates: { canonical: "https://swiftongroup.com.au/about" },
  openGraph: {
    title: "About Swifton Group — Melbourne Australian Business Group",
    description:
      "A Melbourne-based holding group bringing together businesses in vehicle rental, hospitality, cleaning, security and mobility.",
    url: "https://swiftongroup.com.au/about",
  },
};

const values = [
  {
    t: "Trust first",
    d: "Every brand earns trust through reliability, transparency, and doing right by clients and staff.",
    color: "border-t-brand-red",
  },
  {
    t: "Compliance built in",
    d: "Australian legal, privacy, and licensing obligations are met across every business we run.",
    color: "border-t-brand-green",
  },
  {
    t: "People at the centre",
    d: "From renters to rostered staff, the people we serve come first in every decision.",
    color: "border-t-brand-blue",
  },
];

const brandDotColors = [
  "bg-brand-red",
  "bg-brand-orange",
  "bg-brand-green",
  "bg-brand-blue",
  "bg-brand-red",
  "bg-brand-orange",
];

export default function AboutPage() {
  const { address } = site;
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "About Us", href: "/about" },
        ]}
      />
      <PageHeader
        eyebrow="About Swifton Group"
        title="A family of businesses, one shared foundation."
        intro="Swifton Group operates a family of independent brands across Australia. Each stands on its own — with its own website, identity, and customers — while sharing the standards that make the whole group dependable."
      />

      <section className="container-page py-20">
        <div className="grid gap-14 md:grid-cols-[1.3fr_1fr]">
          <ScrollReveal direction="left">
            <div className="space-y-6 leading-relaxed text-navy-700">
              <SectionHeading eyebrow="Who we are" title="Group background" />
              <p>
                Swifton Group Pty Ltd is a Melbourne-based holding group bringing
                together businesses in vehicle rental, hospitality, cleaning,
                security, and mobility. What began as a set of individual
                ventures has grown
                into a coordinated family of brands, each independent on the
                surface and unified in the values beneath.
              </p>
              <p>
                As part of a group-wide consolidation, Swifton Hospitality was
                renamed from ActiveHospitality. Its reputation, portfolio, and
                client relationships carry forward under the Swifton name.
              </p>
              <p>
                We keep each brand distinct for the people who use it, while the
                group provides a common standard of quality, security, and
                compliance across everything we do.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={200}>
            <aside className="color-bar-top h-fit rounded-2xl border border-navy-100 bg-sand-100 p-8">
              <h3 className="font-serif text-xl font-semibold text-navy-900">
                Registered details
              </h3>
              <dl className="mt-6 space-y-4 text-sm">
                <div>
                  <dt className="font-medium text-navy-500">Legal name</dt>
                  <dd className="text-navy-900">{site.legalName}</dd>
                </div>
                <div>
                  <dt className="font-medium text-navy-500">Registered office</dt>
                  <dd className="text-navy-900">
                    {address.street}
                    <br />
                    {address.city} {address.state} {address.postcode},{" "}
                    {address.country}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-navy-500">ABN</dt>
                  <dd className="text-navy-900">{site.abn}</dd>
                </div>
                <div>
                  <dt className="font-medium text-navy-500">Contact</dt>
                  <dd>
                    <a
                      href={`mailto:${site.email}`}
                      className="text-brand-blue transition-colors hover:text-brand-blue/80"
                    >
                      {site.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </aside>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-sand-100">
        <div className="container-page py-20">
          <ScrollReveal>
            <SectionHeading
              eyebrow="What we stand for"
              title="Our values"
              align="center"
            />
          </ScrollReveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <ScrollReveal key={v.t} delay={i * 150}>
                <div
                  className={`rounded-2xl border border-navy-100 border-t-[3px] ${v.color} bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
                >
                  <h3 className="font-serif text-xl font-semibold text-navy-900">
                    {v.t}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-600">
                    {v.d}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <ScrollReveal>
          <SectionHeading eyebrow="The family" title="Brands we operate" />
        </ScrollReveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((b, i) => (
            <ScrollReveal key={b.slug} delay={i * 100}>
              <div className="rounded-xl border border-navy-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold-600">
                  <span
                    className={`inline-block h-2 w-2 rounded-full ${brandDotColors[i]}`}
                  />
                  {b.category}
                </span>
                <h3 className="mt-2 font-serif text-lg font-semibold text-navy-900">
                  {b.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">
                  {b.summary}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
