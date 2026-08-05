import type { Metadata } from "next";
import { PageHeader } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Swifton Group Pty Ltd collects, uses, stores, and protects your personal information in accordance with Australian Privacy Principles.",
  alternates: { canonical: "https://swiftongroup.com.au/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        intro="This policy explains how Swifton Group handles personal information in line with the Australian Privacy Principles."
      />
      <article className="container-page prose-legal py-16">
        <p className="text-sm text-navy-500">Last updated: {new Date().getFullYear()}</p>

        <Section title="1. Who we are">
          {site.legalName} (ABN {site.abn}) operates the Swifton
          Group family of brands. This policy applies to the Swifton Group
          website and the group&apos;s handling of personal information across
          our brands.
        </Section>

        <Section title="2. Information we collect">
          We may collect your name, contact details, and any information you
          provide through enquiry, careers, or account forms. Where a brand
          offers a portal, we may also collect identity documents, payment
          details (processed by our payment provider), and records relating to
          the service you use.
        </Section>

        <Section title="3. How we use your information">
          We use your information to respond to enquiries, provide our services,
          process payments, manage employment and rostering, meet legal and
          licensing obligations, and keep you informed about your account or
          application.
        </Section>

        <Section title="4. Disclosure">
          We do not sell your personal information. We may share it within the
          Swifton Group only as needed to deliver a service you have requested,
          and with trusted providers (such as payment and hosting services) who
          are bound to protect it. We may disclose information where required by
          law.
        </Section>

        <Section title="5. Storage and security">
          Personal documents are stored securely with encryption and access is
          strictly limited by role. We retain information only as long as needed
          for the purpose it was collected or as required by law. Identity
          documents collected for verification are removed once they are no
          longer required.
        </Section>

        <Section title="6. Your rights">
          You may request access to, or correction of, the personal information
          we hold about you. Contact us at{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-gold-600 hover:text-gold-700"
          >
            {site.email}
          </a>{" "}
          and we will respond within a reasonable time.
        </Section>

        <Section title="7. Contact">
          For any privacy question or complaint, email {site.email} or write to
          us at {site.address.line1}, {site.address.line2}, {site.address.city}{" "}
          {site.address.state} {site.address.postcode}, {site.address.country}.
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
