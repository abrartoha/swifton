import Link from "next/link";
import { Logo } from "./Logo";
import { brands, site } from "@/lib/site";

export function Footer() {
  const { address } = site;
  return (
    <footer className="mt-24 border-t border-navy-800 bg-navy-950 text-navy-200">
      <div className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo variant="light" />
            <p className="mt-5 text-sm leading-relaxed text-navy-300">
              {site.tagline}
            </p>
            <address className="mt-6 text-sm not-italic leading-relaxed text-navy-300">
              {address.line1}, {address.line2}
              <br />
              {address.city} {address.state} {address.postcode},{" "}
              {address.country}
              <br />
              <a
                href={`mailto:${site.email}`}
                className="text-gold-400 hover:text-gold-300"
              >
                {site.email}
              </a>
            </address>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
              Our Brands
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {brands.map((b) => (
                <li key={b.slug}>
                  <a
                    href={b.href}
                    className="text-navy-300 transition-colors hover:text-white"
                    {...(b.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {b.name}
                    {b.status === "coming-soon" && (
                      <span className="ml-2 text-[0.65rem] uppercase tracking-wide text-navy-500">
                        Soon
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
              Company
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-navy-300 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-navy-300 hover:text-white"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-navy-300 hover:text-white"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-navy-300 hover:text-white"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-navy-300 hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-navy-300 hover:text-white">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-navy-800 pt-8 text-xs text-navy-400 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p>
            ABN {site.abn} &nbsp;·&nbsp; ACN {site.acn}
          </p>
        </div>
      </div>
    </footer>
  );
}
