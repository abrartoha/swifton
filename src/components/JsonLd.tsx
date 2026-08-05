import { site, brands } from "@/lib/site";

function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.tradingName,
    legalName: site.legalName,
    url: "https://swiftongroup.com.au",
    logo: "https://swiftongroup.com.au/images/logo-dark.png",
    image: "https://swiftongroup.com.au/images/logo-square.png",
    description:
      "Swifton Group is a Melbourne-based family of independent Australian brands spanning vehicle rental, hospitality, security and mobility.",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.postcode,
      addressCountry: "AU",
    },
    email: site.email,
    foundingLocation: {
      "@type": "Place",
      name: "Melbourne, Victoria, Australia",
    },
    areaServed: {
      "@type": "Country",
      name: "Australia",
    },
    sameAs: [],
    subOrganization: brands
      .filter((b) => b.status === "live")
      .map((b) => ({
        "@type": "Organization",
        name: b.name,
        url: b.href,
        description: b.summary,
      })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.tradingName,
    url: "https://swiftongroup.com.au",
    publisher: {
      "@type": "Organization",
      name: site.tradingName,
      logo: {
        "@type": "ImageObject",
        url: "https://swiftongroup.com.au/images/logo-dark.png",
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://swiftongroup.com.au/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `https://swiftongroup.com.au${item.href}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function LocalBusinessJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://swiftongroup.com.au/#business",
    name: site.tradingName,
    legalName: site.legalName,
    image: "https://swiftongroup.com.au/images/logo-square.png",
    url: "https://swiftongroup.com.au",
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.postcode,
      addressCountry: "AU",
    },
    // Suburb-level coordinates for Sunshine VIC 3020. Replace with the exact
    // rooftop position if the Google Business Profile listing is set up.
    geo: {
      "@type": "GeoCoordinates",
      latitude: -37.7886,
      longitude: 144.8321,
    },
    areaServed: {
      "@type": "Country",
      name: "Australia",
    },
    priceRange: "$$",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export {
  OrganizationJsonLd,
  WebSiteJsonLd,
  BreadcrumbJsonLd,
  LocalBusinessJsonLd,
};
