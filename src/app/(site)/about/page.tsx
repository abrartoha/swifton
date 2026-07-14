import type { Metadata } from "next";
import { brands, site } from "@/lib/site";
import { PageHeader, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Swifton Group is a Melbourne-based family of independent Australian brands, united by one foundation of trust, compliance, and care.",
};

const values = [
  {
    t: "Trust first",
    d: "Every brand earns trust through reliability, transparency, and doing right by clients and staff.",
  },
  {
    t: "Compliance built in",
    d: "Australian legal, privacy, and licensing obligations are met across every business we run.",
  },
  {
    t: "People at the centre",
    d: "From renters to rostered staff, the people we serve come first in every decision.",
  },
];

export default function AboutPage() {
  const { address } = site;
  return (
    <>
      <PageHeader
        eyebrow="About Swifton Group"
        title="A family of businesses, one shared foundation."
        intro="Swifton Group operates a family of independent brands across Australia. Each stands on its own — with its own website, identity, and customers — while sharing the standards that make the whole group dependable."
      />

      <section className="container-page py-20">
        <div className="grid gap-14 md:grid-cols-[1.3fr_1fr]">
          <div className="space-y-6 text-navy-700 leading-relaxed">
            <SectionHeading eyebrow="Who we are" title="Group background" />
            <p>
              Swifton Group Pty Ltd is a Melbourne-based holding group bringing
              together businesses in vehicle rental, hospitality, security,
              education and migration, and mobility. What began as a set of
              individual ventures has grown into a coordinated family of brands,
              each independent on the surface and unified in the values beneath.
            </p>
            <p>
              As part of a group-wide consolidation, two brands were renamed:
              Swifton Hospitality (formerly ActiveHospitality) and Swifton
              Global (formerly GMQ Global). Their reputations, portfolios, and
              client relationships carry forward under the Swifton name.
            </p>
            <p>
              We keep each brand distinct for the people who use it, while the
              group provides a common standard of quality, security, and
              compliance across everything we do.
            </p>
          </div>

          <aside className="h-fit rounded-2xl border border-navy-100 bg-sand-100 p-8">
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
                  {address.line1}, {address.line2}
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
                <dt className="font-medium text-navy-500">ACN</dt>
                <dd className="text-navy-900">{site.acn}</dd>
              </div>
              <div>
                <dt className="font-medium text-navy-500">Contact</dt>
                <dd>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-gold-600 hover:text-gold-700"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="bg-sand-100">
        <div className="container-page py-20">
          <SectionHeading
            eyebrow="What we stand for"
            title="Our values"
            align="center"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <div
                key={v.t}
                className="rounded-2xl border border-navy-100 bg-white p-8"
              >
                <h3 className="font-serif text-xl font-semibold text-navy-900">
                  {v.t}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-navy-600">
                  {v.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <SectionHeading eyebrow="The family" title="Brands we operate" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((b) => (
            <div
              key={b.slug}
              className="rounded-xl border border-navy-100 bg-white p-6"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-600">
                {b.category}
              </span>
              <h3 className="mt-2 font-serif text-lg font-semibold text-navy-900">
                {b.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">
                {b.summary}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
