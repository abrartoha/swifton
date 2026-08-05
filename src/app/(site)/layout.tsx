import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  OrganizationJsonLd,
  WebSiteJsonLd,
  LocalBusinessJsonLd,
} from "@/components/JsonLd";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <OrganizationJsonLd />
      <WebSiteJsonLd />
      <LocalBusinessJsonLd />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
