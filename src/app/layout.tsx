import type { Metadata } from "next";

import { Footer } from "@/components/layout/Footer";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { Navbar } from "@/components/layout/Navbar";
import { MusicToggle } from "@/components/ui/MusicToggle";
import { contactInfo } from "@/config/contact";
import { siteConfig } from "@/config/site";
import { fontVariables } from "@/config/fonts";
import { RootProviders } from "@/providers/RootProviders";

import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: "/",
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: siteConfig.defaultOgImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.defaultOgImage],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

// schema.org structured data for local/professional-service SEO. Every
// field is either a fixed fact about the studio or pulled from
// src/config/contact.ts (the site's single real source for contact info) —
// no invented street address, phone, or social profile. See the SEO audit
// report for exactly what's included and why.
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Architect",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  image: `${siteConfig.url}${siteConfig.defaultOgImage}`,
  logo: `${siteConfig.url}/ay-watermark.png`,
  email: contactInfo.email,
  telephone: contactInfo.whatsapp[0].display,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lahore",
    addressCountry: "PK",
  },
  sameAs: [contactInfo.instagram],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <RootProviders>
          <LoadingScreen />
          <Navbar />
          {children}
          <Footer />
          <MusicToggle src="/audio/hero-music.mp3" />
        </RootProviders>
      </body>
    </html>
  );
}
