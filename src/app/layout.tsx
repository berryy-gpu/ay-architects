import type { Metadata } from "next";

import { Footer } from "@/components/layout/Footer";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { Navbar } from "@/components/layout/Navbar";
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="font-sans antialiased">
        <RootProviders>
          <LoadingScreen />
          <Navbar />
          {children}
          <Footer />
        </RootProviders>
      </body>
    </html>
  );
}
