import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { AdminProvider } from "@/components/admin/AdminProvider";
import { ContentSync } from "@/components/admin/ContentSync";
import { site } from "@/lib/site";
import "./globals.css";

// Single typeface across the site (headings + body) — Inter, as before.
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.legalName} — ${site.tagline}`,
    template: `%s — ${site.legalName}`,
  },
  description: site.description,
  keywords: [
    "городское озеленение",
    "зелёная инфраструктура",
    "городские парки",
    "ландшафтное строительство",
    "экологическое восстановление",
    "системы полива",
    "озеленение бульваров",
    "посадка деревьев",
    "тепличный комплекс",
    "Nord Botanic",
    "Кокшетау",
  ],
  authors: [{ name: site.legalName }],
  openGraph: {
    type: "website",
    title: `${site.legalName} — ${site.tagline}`,
    description: site.description,
    siteName: site.legalName,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.legalName} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#06120C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.legalName,
    description: site.description,
    url: site.url,
    slogan: site.tagline,
    foundingDate: String(site.founded),
    telephone: site.contact.phone,
    sameAs: [site.contact.instagramHref],
    address: {
      "@type": "PostalAddress",
      streetAddress: site.office.lines[0],
      addressLocality: "Кокшетау",
      addressCountry: "KZ",
    },
  };

  return (
    <html lang="ru" className={inter.variable}>
      <body className="min-h-screen bg-paper">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-forest-900 focus:px-5 focus:py-3 focus:text-sm focus:text-sand-50"
        >
          Перейти к содержимому
        </a>
        <AdminProvider>
          <ContentSync />
          <ScrollProgress />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </AdminProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </body>
    </html>
  );
}
