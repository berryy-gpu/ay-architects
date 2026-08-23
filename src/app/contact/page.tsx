import type { Metadata } from "next";
import Link from "next/link";

import { ContactForm } from "@/components/sections/ContactForm";
import { ContactMethodCard } from "@/components/ui/ContactMethodCard";
import { CtaSection } from "@/components/ui/CtaSection";
import { CONTACT_METHODS, contactInfo } from "@/config/contact";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Get in touch with AY Architects — email, WhatsApp, or send a message directly.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <main className="bg-background px-8 pt-32 pb-24 sm:px-12 md:px-16 md:pt-40 md:pb-28">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.25em] text-foreground/70 transition-colors duration-300 hover:text-foreground"
        >
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:-translate-x-1"
          >
            ←
          </span>
          Home
        </Link>

        <div className="mt-12 md:mt-16">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-foreground/70">
            Contact
          </p>
          <h1 className="mt-3 font-display text-4xl text-foreground sm:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-6 max-w-xl font-sans text-base text-foreground/80">
            Tell us about your project and we&rsquo;ll get back to you shortly
            — or reach out directly using the details below.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-16 md:mt-20 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:gap-20">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-1">
            {CONTACT_METHODS.map((method) => (
              <ContactMethodCard key={method.label} method={method} />
            ))}
          </div>

          <ContactForm />
        </div>
      </main>

      <CtaSection
        compact
        heading="Prefer WhatsApp?"
        copy="Message us directly for a faster response."
        buttonLabel="Message on WhatsApp"
        buttonHref={contactInfo.whatsapp[0].href}
        buttonExternal
      />
    </>
  );
}
