import Link from "next/link";
import type { ReactNode } from "react";

/** Small page hero used on interior pages. */
export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="border-b border-navy-100 bg-gradient-to-b from-navy-950 to-navy-900 text-white">
      <div className="container-page py-20 md:py-28">
        <p className="eyebrow text-gold-400">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-tight md:text-5xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-200">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}

/** Section heading with eyebrow + gold rule. */
export function SectionHeading({
  eyebrow,
  title,
  children,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-3 font-serif text-3xl font-semibold text-navy-900 md:text-4xl">
        {title}
      </h2>
      <div
        className={`gold-rule mt-5 ${align === "center" ? "mx-auto" : ""}`}
      />
      {children && (
        <p className="mt-5 max-w-2xl text-navy-600 leading-relaxed">
          {children}
        </p>
      )}
    </div>
  );
}

/** A brand card that links out to the brand's own website. */
export function BrandCard({
  name,
  category,
  summary,
  href,
  external,
  comingSoon,
}: {
  name: string;
  category: string;
  summary: string;
  href: string;
  external: boolean;
  comingSoon: boolean;
}) {
  const inner = (
    <div className="group relative flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-8 shadow-elegant transition-all duration-300 hover:-translate-y-1 hover:border-gold-300">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-600">
          {category}
        </span>
        {comingSoon && (
          <span className="rounded-full bg-navy-50 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-navy-500">
            Coming Soon
          </span>
        )}
      </div>
      <h3 className="mt-4 font-serif text-2xl font-semibold text-navy-900">
        {name}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-600">
        {summary}
      </p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-navy-900">
        {comingSoon ? "Learn more soon" : "Visit website"}
        <span
          aria-hidden
          className="transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </span>
      </span>
    </div>
  );

  if (comingSoon) {
    return <div className="cursor-default opacity-90">{inner}</div>;
  }

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }

  return <Link href={href}>{inner}</Link>;
}
