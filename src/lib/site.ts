/**
 * Single source of truth for group-wide details and the brand family.
 * Keeping this here means legal footer, nav, and home cards never drift.
 */

export const site = {
  legalName: "Swifton Group Pty Ltd",
  tradingName: "Swifton Group",
  tagline: "A family of independent brands, built on one foundation.",
  abn: process.env.NEXT_PUBLIC_GROUP_ABN ?? "00 000 000 000",
  acn: process.env.NEXT_PUBLIC_GROUP_ACN ?? "000 000 000",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "info@swiftongroup.com.au",
  address: {
    line1: "Suite 2, Level 9",
    line2: "2 Queen Street",
    city: "Melbourne",
    state: "VIC",
    postcode: "3000",
    country: "Australia",
  },
} as const;

export type Brand = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  href: string;
  /** external means it lives on its own domain */
  external: boolean;
  status: "live" | "coming-soon";
};

/**
 * The spokes of the group. Each brand is a standalone website on its own
 * domain; the mother site simply routes visitors to the right one.
 */
export const brands: Brand[] = [
  {
    slug: "rentals",
    name: "Swifton Rentals",
    category: "Vehicle Rental",
    summary:
      "Cars, scooters, and electric cycles for rideshare and personal use, with a full self-service client portal.",
    href: "https://swiftonrentals.com.au",
    external: true,
    status: "live",
  },
  {
    slug: "hospitality",
    name: "Swifton Hospitality",
    category: "Housekeeping & Cleaning",
    summary:
      "Professional housekeeping and cleaning contracting for hotels, venues, and commercial sites.",
    href: "https://swiftonhospitality.com.au",
    external: true,
    status: "live",
  },
  {
    slug: "security",
    name: "Swifton Security",
    category: "Security Contracting",
    summary:
      "Licensed security personnel for hotels, pubs, clubs, and private or public events.",
    href: "https://swiftonsecurity.com.au",
    external: true,
    status: "live",
  },
  {
    slug: "global",
    name: "Swifton Global",
    category: "Education & Migration",
    summary:
      "Education pathways and migration services — courses, certifications, and expert guidance.",
    href: "https://swiftonglobal.com.au",
    external: true,
    status: "live",
  },
  {
    slug: "ridenexx",
    name: "RideNexx",
    category: "Mobility",
    summary:
      "The group's newest mobility brand. Full service offering launching soon.",
    href: "#",
    external: true,
    status: "coming-soon",
  },
  {
    slug: "edu-connect",
    name: "Edu Connect",
    category: "Education",
    summary:
      "An established education platform within the Swifton family of brands.",
    href: "https://educonnect.com.au",
    external: true,
    status: "live",
  },
];

/** Enquiry destinations used by the contact form dropdown. */
export const enquiryDestinations = [
  { value: "group", label: "Swifton Group (Head Office)" },
  { value: "rentals", label: "Swifton Rentals" },
  { value: "hospitality", label: "Swifton Hospitality" },
  { value: "security", label: "Swifton Security" },
  { value: "global", label: "Swifton Global" },
  { value: "ridenexx", label: "RideNexx" },
  { value: "careers", label: "Careers / Recruitment" },
] as const;
