import type { Metadata } from "next";
import { PageHeader } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms governing use of the Swifton Group website and services.",
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms & Conditions"
        intro="These terms govern your use of the Swifton Group website. Individual brands and services may have their own additional terms."
      />
      <article className="container-page py-16">
        <p className="text-sm text-navy-500">
          Last updated: {new Date().getFullYear()}
        </p>

        <Section title="1. About these terms">
          This website is operated by {site.legalName} (ABN {site.abn}). By
          using this website you agree to these terms. If you do not agree,
          please do not use the site.
        </Section>

        <Section title="2. The Swifton Group family">
          Swifton Group operates a number of independent brands, each with its
          own website and, where applicable, its own terms of service. Terms
          specific to a brand&apos;s services — for example rental-specific terms
          — are published on that brand&apos;s website and apply in addition to
          these terms.
        </Section>

        <Section title="3. Use of the website">
          You agree to use this website lawfully and not to attempt to gain
          unauthorised access to any system, disrupt the service, or misuse any
          form or content. Content on this site is provided for general
          information and may change without notice.
        </Section>

        <Section title="4. Intellectual property">
          All trademarks, brand names, text, and design on this website are owned
          by or licensed to {site.legalName} and may not be used without
          permission.
        </Section>

        <Section title="5. Enquiries and applications">
          Information you submit through enquiry or careers forms is handled in
          accordance with our Privacy Policy. Submitting a form does not create
          any contract or offer of employment.
        </Section>

        <Section title="6. Liability">
          To the extent permitted by law, {site.legalName} is not liable for any
          loss arising from use of this website. Nothing in these terms excludes
          rights you have under the Australian Consumer Law.
        </Section>

        <Section title="7. Governing law">
          These terms are governed by the laws of Victoria, Australia, and you
          submit to the non-exclusive jurisdiction of its courts.
        </Section>

        <Section title="8. Contact">
          Questions about these terms can be sent to{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-gold-600 hover:text-gold-700"
          >
            {site.email}
          </a>
          .
        </Section>
      </article>
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="font-serif text-2xl font-semibold text-navy-900">
        {title}
      </h2>
      <p className="mt-3 leading-relaxed text-navy-700">{children}</p>
    </section>
  );
}
