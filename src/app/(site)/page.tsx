import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { brands, site } from "@/lib/site";
import { BrandCard, SectionHeading } from "@/components/ui";
import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  alternates: { canonical: "https://swiftongroup.com.au" },
};

const stats = [
  { value: "6", label: "Brands in the family", color: "text-brand-red" },
  { value: "1", label: "Trusted foundation", color: "text-brand-green" },
  { value: "AU", label: "Melbourne-based group", color: "text-brand-blue" },
];

const missionItems = [
  {
    t: "Independent identities",
    d: "Every brand has its own website, look, and voice — never diluted.",
    accent: "border-t-brand-red",
    shadow: "hover:shadow-brand-glow-red",
  },
  {
    t: "Shared standards",
    d: "One foundation for trust, security, and care across the group.",
    accent: "border-t-brand-orange",
    shadow: "hover:shadow-brand-glow-orange",
  },
  {
    t: "Australian-owned",
    d: "Proudly based in Melbourne, operating across the country.",
    accent: "border-t-brand-green",
    shadow: "hover:shadow-brand-glow-green",
  },
  {
    t: "Built to grow",
    d: "New brands join the family without disrupting the rest.",
    accent: "border-t-brand-blue",
    shadow: "hover:shadow-brand-glow",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 text-white">
        {/* Animated background orbs */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="absolute -top-32 right-0 h-[500px] w-[500px] animate-pulse-glow rounded-full opacity-20 blur-[100px]"
            style={{ background: "radial-gradient(circle, #00aeef 0%, transparent 70%)" }}
          />
          <div
            className="absolute -bottom-20 -left-20 h-[400px] w-[400px] animate-pulse-glow rounded-full opacity-15 blur-[80px]"
            style={{ background: "radial-gradient(circle, #e52528 0%, transparent 70%)", animationDelay: "1.5s" }}
          />
          <div
            className="absolute left-1/2 top-1/3 h-[350px] w-[350px] animate-pulse-glow rounded-full opacity-10 blur-[90px]"
            style={{ background: "radial-gradient(circle, #8dc63f 0%, transparent 70%)", animationDelay: "3s" }}
          />
          <div
            className="absolute right-1/4 top-2/3 h-[300px] w-[300px] animate-pulse-glow rounded-full opacity-10 blur-[80px]"
            style={{ background: "radial-gradient(circle, #f7a823 0%, transparent 70%)", animationDelay: "2s" }}
          />
        </div>

        <div className="container-page relative py-28 md:py-40">
          <p className="animate-fade-in-down eyebrow text-brand-orange">
            Swifton Group Pty Ltd
          </p>
          <h1 className="mt-6 max-w-4xl animate-fade-in-up font-serif text-5xl font-semibold leading-[1.05] md:text-7xl">
            A family of brands, built on{" "}
            <span className="gradient-text">one foundation</span>.
          </h1>
          <p className="mt-8 max-w-2xl animate-fade-in-up text-lg leading-relaxed text-navy-200 md:text-xl" style={{ animationDelay: "0.15s" }}>
            Swifton Group brings together independent Australian businesses
            across vehicle rental, hospitality, security and mobility — each
            with its own identity, all backed by the same standard of trust
            and care.
          </p>
          <div className="mt-10 flex animate-fade-in-up flex-wrap gap-4" style={{ animationDelay: "0.3s" }}>
            <Link href="#brands" className="btn-gold">
              Explore our brands
            </Link>
            <Link href="/about" className="btn-outline border-navy-700 text-white hover:bg-navy-900">
              About the group
            </Link>
          </div>

          <dl className="mt-20 grid max-w-2xl animate-fade-in-up grid-cols-3 gap-8 border-t border-navy-800 pt-10" style={{ animationDelay: "0.45s" }}>
            {stats.map((s) => (
              <div key={s.label}>
                <dt className={`font-serif text-4xl font-semibold ${s.color}`}>
                  {s.value}
                </dt>
                <dd className="mt-2 text-sm text-navy-300">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Colorful bottom border */}
        <div
          className="h-1"
          style={{
            background: "linear-gradient(90deg, #e52528, #f7a823, #8dc63f, #00aeef)",
          }}
        />
      </section>

      {/* Brands */}
      <section id="brands" className="container-page py-24">
        <ScrollReveal>
          <SectionHeading eyebrow="The Family" title="Our brands" align="center">
            Each brand operates independently on its own website. Choose a brand
            to visit its site and, where offered, its client or staff portal.
          </SectionHeading>
        </ScrollReveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((b, i) => (
            <ScrollReveal key={b.slug} delay={i * 100}>
              <BrandCard
                name={b.name}
                category={b.category}
                summary={b.summary}
                href={b.href}
                external={b.external}
                comingSoon={b.status === "coming-soon"}
                index={i}
              />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Mission band */}
      <section className="relative overflow-hidden bg-sand-100">
        {/* Subtle colorful background decoration */}
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.03]">
          <div
            className="absolute right-0 top-0 h-80 w-80 rounded-full blur-[100px]"
            style={{ background: "#00aeef" }}
          />
          <div
            className="absolute bottom-0 left-0 h-80 w-80 rounded-full blur-[100px]"
            style={{ background: "#e52528" }}
          />
        </div>

        <div className="container-page relative grid gap-12 py-24 md:grid-cols-2 md:items-center">
          <ScrollReveal direction="left">
            <SectionHeading eyebrow="Our Mission" title="One group, many strengths.">
              We build businesses that people rely on every day. By operating as
              a family under one roof, each Swifton brand shares the same
              commitment to quality, compliance, and looking after the people it
              serves.
            </SectionHeading>
          </ScrollReveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {missionItems.map((item, i) => (
              <ScrollReveal key={item.t} direction="right" delay={i * 120}>
                <div
                  className={`rounded-xl border border-navy-100 border-t-[3px] ${item.accent} bg-white p-6 transition-all duration-300 hover:-translate-y-1 ${item.shadow}`}
                >
                  <h3 className="font-serif text-lg font-semibold text-navy-900">
                    {item.t}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-600">
                    {item.d}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-24">
        <ScrollReveal direction="scale">
          <div className="relative overflow-hidden rounded-3xl bg-navy-950 px-8 py-16 text-center text-white md:px-16">
            {/* Animated gradient border */}
            <div
              aria-hidden
              className="absolute inset-0 rounded-3xl p-[2px]"
              style={{
                background: "linear-gradient(135deg, #e52528, #f7a823, #8dc63f, #00aeef, #e52528)",
                backgroundSize: "300% 300%",
                animation: "gradient-shift 6s ease infinite",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "exclude",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
              }}
            />

            {/* Background orbs */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div
                className="absolute -right-10 -top-10 h-40 w-40 animate-pulse-glow rounded-full opacity-20 blur-[60px]"
                style={{ background: "#00aeef" }}
              />
              <div
                className="absolute -bottom-10 -left-10 h-40 w-40 animate-pulse-glow rounded-full opacity-15 blur-[60px]"
                style={{ background: "#f7a823", animationDelay: "1.5s" }}
              />
            </div>

            <h2 className="relative mx-auto max-w-2xl font-serif text-3xl font-semibold md:text-4xl">
              Work with the{" "}
              <span className="gradient-text">Swifton family</span>
            </h2>
            <p className="relative mx-auto mt-5 max-w-xl text-navy-200">
              Whether you&apos;re a client, a partner, or looking to join our team,
              we&apos;d love to hear from you.
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-4">
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
            <p className="relative mt-8 text-sm text-navy-400">
              {site.legalName} · {site.address.city}, {site.address.state}
            </p>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
