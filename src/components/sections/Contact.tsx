"use client";

import { useEffect, useRef } from "react";

import { gsap } from "@/animations/gsap/gsap.config";
import { contactInfo } from "@/config/contact";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface ContactItem {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}

const CONTACT_ITEMS: ContactItem[] = [
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

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set("[data-contact-heading], [data-contact-item]", {
          opacity: 1,
          y: 0,
        });
        return;
      }

      gsap.to("[data-contact-heading]", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: section, start: "top 75%" },
      });

      gsap.to("[data-contact-item]", {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: { amount: 0.35, from: "start" },
        scrollTrigger: { trigger: section, start: "top 65%" },
      });
    }, section);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative bg-background px-8 py-24 sm:px-12 md:px-16 md:py-32"
    >
      <div data-contact-heading className="translate-y-4 opacity-0">
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-foreground/70">
          Contact
        </p>
        <h2 className="mt-3 font-display text-4xl text-foreground sm:text-5xl">
          Get in Touch
        </h2>
      </div>

      <dl className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
        {CONTACT_ITEMS.map((item) => (
          <div
            key={item.label}
            data-contact-item
            className="translate-y-3 opacity-0"
          >
            <dt className="font-sans text-[11px] uppercase tracking-[0.3em] text-foreground/70">
              {item.label}
            </dt>
            <dd className="mt-2">
              {item.href ? (
                <a
                  href={item.href}
                  {...(item.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group relative inline-block font-sans text-base text-foreground sm:text-lg"
                >
                  {item.value}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100" />
                </a>
              ) : (
                <span className="font-sans text-base text-foreground sm:text-lg">
                  {item.value}
                </span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
