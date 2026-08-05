import type { Metadata } from "next";
import { PageHeader } from "@/components/ui";
import { site } from "@/lib/site";
import { ContactForm } from "./ContactForm";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Contact Us — Get in Touch with Swifton Group Melbourne",
  description:
    "Contact Swifton Group head office in Melbourne. Send an enquiry to the right brand team — vehicle rental, hospitality, security, or careers. We respond promptly.",
  alternates: { canonical: "https://swiftongroup.com.au/contact" },
  openGraph: {
    title: "Contact Swifton Group",
    description:
      "Get in touch with Swifton Group. Your enquiry is routed to the right brand team.",
    url: "https://swiftongroup.com.au/contact",
  },
};

export default function ContactPage() {
  const { address } = site;
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
      />
      <PageHeader
        eyebrow="Contact"
        title="Let's talk."
        intro="Choose the brand your enquiry relates to and we'll make sure it reaches the right team."
      />

      <section className="container-page py-20">
        <div className="grid gap-14 md:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-navy-900">
              Head office
            </h2>
            <div className="gold-rule mt-4" />
            <address className="mt-6 space-y-4 text-sm not-italic leading-relaxed text-navy-700">
              <div>
                <p className="font-medium text-navy-500">Registered office</p>
                <p>
                  {address.street}
                  <br />
                  {address.city} {address.state} {address.postcode},{" "}
                  {address.country}
                </p>
              </div>
              <div>
                <p className="font-medium text-navy-500">Email</p>
                <a
                  href={`mailto:${site.email}`}
                  className="text-gold-600 hover:text-gold-700"
                >
                  {site.email}
                </a>
              </div>
              <div>
                <p className="font-medium text-navy-500">Company</p>
                <p>
                  {site.legalName}
                  <br />
                  ABN {site.abn}
                </p>
              </div>
            </address>
          </div>

          <div className="rounded-2xl border border-navy-100 bg-white p-8 shadow-elegant">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
