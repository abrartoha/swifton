import Link from "next/link";
import { brands, site } from "@/lib/site";
import { BrandCard, SectionHeading } from "@/components/ui";

const stats = [
  { value: "6", label: "Brands in the family" },
  { value: "1", label: "Trusted foundation" },
  { value: "AU", label: "Melbourne-based group" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(60% 60% at 70% 20%, rgba(201,162,75,0.18), transparent 60%)",
          }}
        />
        <div className="container-page relative py-28 md:py-40">
          <p className="eyebrow text-gold-400">Swifton Group Pty Ltd</p>
          <h1 className="mt-6 max-w-4xl font-serif text-5xl font-semibold leading-[1.05] md:text-7xl">
            A family of brands, built on one foundation.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-navy-200 md:text-xl">
            Swifton Group brings together independent Australian businesses
            across vehicle rental, hospitality, security, education and
            mobility — each with its own identity, all backed by the same
            standard of trust and care.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="#brands" className="btn-gold">
              Explore our brands
            </Link>
            <Link href="/about" className="btn-outline border-navy-700 text-white hover:bg-navy-900">
              About the group
            </Link>
          </div>

          <dl className="mt-20 grid max-w-2xl grid-cols-3 gap-8 border-t border-navy-800 pt-10">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-serif text-4xl font-semibold text-gold-400">
                  {s.value}
                </dt>
                <dd className="mt-2 text-sm text-navy-300">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Brands */}
      <section id="brands" className="container-page py-24">
        <SectionHeading eyebrow="The Family" title="Our brands" align="center">
          Each brand operates independently on its own website. Choose a brand
          to visit its site and, where offered, its client or staff portal.
        </SectionHeading>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((b) => (
            <BrandCard
              key={b.slug}
              name={b.name}
              category={b.category}
              summary={b.summary}
              href={b.href}
              external={b.external}
              comingSoon={b.status === "coming-soon"}
            />
          ))}
        </div>
      </section>

      {/* Mission band */}
      <section className="bg-sand-100">
        <div className="container-page grid gap-12 py-24 md:grid-cols-2 md:items-center">
          <div>
            <SectionHeading eyebrow="Our Mission" title="One group, many strengths.">
              We build businesses that people rely on every day. By operating as
              a family under one roof, each Swifton brand shares the same
              commitment to quality, compliance, and looking after the people it
              serves.
            </SectionHeading>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                t: "Independent identities",
                d: "Every brand has its own website, look, and voice — never diluted.",
              },
              {
                t: "Shared standards",
                d: "One foundation for trust, security, and care across the group.",
              },
              {
                t: "Australian-owned",
                d: "Proudly based in Melbourne, operating across the country.",
              },
              {
                t: "Built to grow",
                d: "New brands join the family without disrupting the rest.",
              },
            ].map((item) => (
              <div
                key={item.t}
                className="rounded-xl border border-navy-100 bg-white p-6"
              >
                <h3 className="font-serif text-lg font-semibold text-navy-900">
                  {item.t}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">
                  {item.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-24">
        <div className="overflow-hidden rounded-3xl bg-navy-950 px-8 py-16 text-center text-white md:px-16">
          <h2 className="mx-auto max-w-2xl font-serif text-3xl font-semibold md:text-4xl">
            Work with the Swifton family
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-navy-200">
            Whether you&apos;re a client, a partner, or looking to join our team,
            we&apos;d love to hear from you.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-gold">
              Get in touch
            </Link>
            <Link
              href="/careers"
              className="btn-outline border-navy-700 text-white hover:bg-navy-900"
            >
              View careers
            </Link>
          </div>
          <p className="mt-8 text-sm text-navy-400">
            {site.legalName} · {site.address.city}, {site.address.state}
          </p>
        </div>
      </section>
    </>
  );
}
