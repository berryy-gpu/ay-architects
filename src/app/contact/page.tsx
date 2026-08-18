import type { Metadata } from "next";
import Link from "next/link";

import { ContactForm } from "@/components/sections/ContactForm";
import { contactInfo } from "@/config/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with AY Architects — email, WhatsApp, or send a message directly.",
};

interface ContactDetail {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}

const CONTACT_DETAILS: ContactDetail[] = [
  {
    label: "Email",
    value: contactInfo.email,
    href: `mailto:${contactInfo.email}`,
  },
  ...contactInfo.whatsapp.map((entry) => ({
    label: entry.label,
    value: entry.display,
    href: entry.href,
    external: true,
  })),
  { label: "Location", value: contactInfo.location },
  { label: "Hours", value: contactInfo.hours },
];

export default function ContactPage() {
  return (
    <main className="bg-background px-8 pt-32 pb-24 sm:px-12 md:px-16 md:pt-40 md:pb-32">
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
        <dl className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 md:grid-cols-1">
          {CONTACT_DETAILS.map((detail) => (
            <div key={detail.label}>
              <dt className="font-sans text-[11px] uppercase tracking-[0.3em] text-foreground/70">
                {detail.label}
              </dt>
              <dd className="mt-2">
                {detail.href ? (
                  <a
                    href={detail.href}
                    {...(detail.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group relative inline-block font-sans text-base text-foreground sm:text-lg"
                  >
                    {detail.value}
                    <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100" />
                  </a>
                ) : (
                  <span className="font-sans text-base text-foreground sm:text-lg">
                    {detail.value}
                  </span>
                )}
              </dd>
            </div>
          ))}
        </dl>

        <ContactForm />
      </div>
    </main>
  );
}
