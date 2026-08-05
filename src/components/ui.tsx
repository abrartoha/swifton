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
    <section className="relative overflow-hidden border-b border-navy-100 bg-gradient-to-b from-navy-950 to-navy-900 text-white">
      {/* Subtle colorful background accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute -right-20 -top-20 h-60 w-60 animate-pulse-glow rounded-full opacity-10 blur-[80px]"
          style={{ background: "#00aeef" }}
        />
        <div
          className="absolute -bottom-10 -left-10 h-48 w-48 animate-pulse-glow rounded-full opacity-10 blur-[60px]"
          style={{ background: "#f7a823", animationDelay: "1.5s" }}
        />
      </div>
      <div className="container-page relative py-20 md:py-28">
        <p className="animate-fade-in-down eyebrow text-brand-orange">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl animate-fade-in-up font-serif text-4xl font-semibold leading-tight md:text-5xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-6 max-w-2xl animate-fade-in-up text-lg leading-relaxed text-navy-200" style={{ animationDelay: "0.15s" }}>
            {intro}
          </p>
        )}
      </div>
      {/* Colorful bottom border */}
      <div
        className="h-[3px]"
        style={{
          background: "linear-gradient(90deg, #e52528, #f7a823, #8dc63f, #00aeef)",
        }}
      />
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

const brandColors = [
  { border: "hover:border-brand-red", dot: "bg-brand-red" },
  { border: "hover:border-brand-orange", dot: "bg-brand-orange" },
  { border: "hover:border-brand-green", dot: "bg-brand-green" },
  { border: "hover:border-brand-blue", dot: "bg-brand-blue" },
  { border: "hover:border-brand-red", dot: "bg-brand-red" },
  { border: "hover:border-brand-orange", dot: "bg-brand-orange" },
];

/** A brand card that links out to the brand's own website. */
export function BrandCard({
  name,
  category,
  summary,
  href,
  external,
  comingSoon,
  index = 0,
}: {
  name: string;
  category: string;
  summary: string;
  href: string;
  external: boolean;
  comingSoon: boolean;
  index?: number;
}) {
  const color = brandColors[index % brandColors.length];

  const inner = (
    <div className={`color-bar-top group relative flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-8 shadow-elegant transition-all duration-300 hover:-translate-y-2 hover:shadow-lg ${color.border}`}>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold-600">
          <span className={`inline-block h-2 w-2 rounded-full ${color.dot}`} />
          {category}
        </span>
        {comingSoon && (
          <span className="rounded-full bg-navy-50 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-navy-500">
            Coming Soon
          </span>
        )}
      </div>
      <h3 className="mt-4 font-serif text-2xl font-semibold text-navy-900 transition-colors duration-300 group-hover:text-navy-800">
        {name}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-600">
        {summary}
      </p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-navy-900">
        {comingSoon ? "Learn more soon" : "Visit website"}
        <span
          aria-hidden
          className="transition-transform duration-300 group-hover:translate-x-2"
        >
          &rarr;
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
