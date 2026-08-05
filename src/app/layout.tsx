import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://swiftongroup.com.au"),
  title: {
    default: `${site.tradingName} — Australian Family of Brands | Vehicle Rental, Hospitality, Cleaning, Security & Mobility`,
    template: `%s | ${site.tradingName}`,
  },
  description:
    "Swifton Group is a Melbourne-based family of independent Australian brands spanning vehicle rental, hospitality, cleaning, security and mobility. Trusted foundation serving businesses and communities across Australia.",
  keywords: [
    "Swifton Group",
    "Australian business group",
    "vehicle rental Australia",
    "hospitality services Melbourne",
    "security contracting",
    "Swifton Vehicle Rental",
    "Swifton Hospitality",
    "Swifton Cleaning",
    "commercial cleaning Melbourne",
    "Swifton Security",
    "RideNexx",
    "Melbourne business",
    "family of brands",
  ],
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  publisher: site.legalName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: `${site.tradingName} — Australian Family of Brands`,
    description:
      "A Melbourne-based family of independent Australian brands — vehicle rental, hospitality, cleaning, security and mobility — built on one trusted foundation.",
    siteName: site.tradingName,
    locale: "en_AU",
    type: "website",
    url: "https://swiftongroup.com.au",
    images: [
      {
        url: "/images/logo-square.png",
        width: 1080,
        height: 1080,
        alt: "Swifton Group — Family of Brands",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.tradingName} — Australian Family of Brands`,
    description:
      "A Melbourne-based family of independent Australian brands — vehicle rental, hospitality, cleaning, security and mobility.",
    images: ["/images/logo-square.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://swiftongroup.com.au",
  },
  verification: {
    // Add your verification codes when ready:
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU" className={`${serif.variable} ${sans.variable}`}>
      <head>
        <link rel="icon" href="/images/logo-icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/logo-square.png" />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
