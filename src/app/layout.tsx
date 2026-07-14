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
    default: `${site.tradingName} — Family of Brands`,
    template: `%s · ${site.tradingName}`,
  },
  description:
    "Swifton Group is a family of independent Australian brands spanning vehicle rental, hospitality, security, education and mobility — built on one trusted foundation.",
  openGraph: {
    title: `${site.tradingName} — Family of Brands`,
    description:
      "A family of independent Australian brands, built on one trusted foundation.",
    siteName: site.tradingName,
    locale: "en_AU",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU" className={`${serif.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
