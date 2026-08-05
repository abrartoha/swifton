import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, SectionHeading } from "@/components/ui";
import { createClient } from "@/lib/supabase/server";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { AnimatedGrid } from "@/components/AnimatedGrid";

export const metadata: Metadata = {
  title: "Careers — Join the Swifton Family | Jobs in Melbourne Australia",
  description:
    "Browse open positions across Swifton Group brands — hospitality, security, and vehicle rental roles in Melbourne and across Australia. Apply online and track your application.",
  alternates: { canonical: "https://swiftongroup.com.au/careers" },
  openGraph: {
    title: "Careers at Swifton Group",
    description:
      "Join the Swifton family. Open positions in hospitality, security, and vehicle rental across Australia.",
    url: "https://swiftongroup.com.au/careers",
  },
};

export const dynamic = "force-dynamic";

type Job = {
  id: string;
  title: string;
  brand: string;
  location: string | null;
  employment_type: string | null;
  description: string | null;
};

const stages = [
  { n: 1, t: "Application Received", d: "We confirm your application has arrived." },
  { n: 2, t: "Under Review", d: "Our team reviews your experience and fit." },
  { n: 3, t: "Interview", d: "We meet to get to know each other." },
  { n: 4, t: "Decision", d: "We let you know the outcome." },
];

export default async function CareersPage() {
  let jobs: Job[] = [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("job_postings")
      .select("id, title, brand, location, employment_type, description")
      .eq("is_open", true)
      .order("created_at", { ascending: false });
    if (data) jobs = data as Job[];
  } catch {
    // DB not configured yet — show the empty state below.
  }

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Careers", href: "/careers" },
        ]}
      />
      <PageHeader
        eyebrow="Careers"
        title="Join the Swifton family."
        intro="We hire across all our brands — from hospitality and security staff to office and management roles. Explore open positions and apply in minutes."
      />

      {/* Process tracker */}
      <section className="container-page py-20">
        <SectionHeading
          eyebrow="How it works"
          title="Our application process"
          align="center"
        />
        <AnimatedGrid className="mt-12 grid gap-6 md:grid-cols-4" stagger={120}>
          {stages.map((s) => {
            const stepColors = ["bg-brand-red", "bg-brand-orange", "bg-brand-green", "bg-brand-blue"];
            return (
              <li
                key={s.n}
                className="relative list-none rounded-2xl border border-navy-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <span className={`flex h-10 w-10 items-center justify-center rounded-full ${stepColors[s.n - 1]} font-serif text-lg font-semibold text-white`}>
                  {s.n}
                </span>
                <h3 className="mt-4 font-semibold text-navy-900">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">
                  {s.d}
                </p>
              </li>
            );
          })}
        </AnimatedGrid>
        <p className="mt-8 text-center text-sm text-navy-500">
          Once you apply, you can track your progress through these stages from
          your applicant login.
        </p>
      </section>

      {/* Openings */}
      <section className="bg-sand-100">
        <div className="container-page py-20">
          <SectionHeading eyebrow="Open roles" title="Current openings" />

          {jobs.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-dashed border-navy-200 bg-white p-12 text-center">
              <p className="text-navy-700">
                There are no published openings right now.
              </p>
              <p className="mt-2 text-sm text-navy-500">
                We&apos;re always keen to meet good people. Send us your details
                and we&apos;ll be in touch when a role opens.
              </p>
              <Link href="/contact" className="btn-primary mt-6">
                Register your interest
              </Link>
            </div>
          ) : (
            <div className="mt-10 space-y-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="flex flex-col gap-4 rounded-2xl border border-navy-100 bg-white p-6 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-600">
                      {job.brand}
                    </span>
                    <h3 className="mt-1 font-serif text-xl font-semibold text-navy-900">
                      {job.title}
                    </h3>
                    <p className="mt-1 text-sm text-navy-500">
                      {[job.location, job.employment_type]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </div>
                  <Link
                    href={`/careers/${job.id}`}
                    className="btn-primary shrink-0"
                  >
                    View &amp; apply
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
