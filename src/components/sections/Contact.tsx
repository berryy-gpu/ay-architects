"use client";

import { useEffect, useRef } from "react";

import { gsap } from "@/animations/gsap/gsap.config";
import { ContactMethodCard } from "@/components/ui/ContactMethodCard";
import { CtaSection } from "@/components/ui/CtaSection";
import { CONTACT_METHODS } from "@/config/contact";
import { useMediaQuery } from "@/hooks/useMediaQuery";

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
        gsap.set("[data-contact-heading], [data-reveal-item]", {
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
        scrollTrigger: { trigger: section, start: "top 75%", once: true },
      });

      gsap.to("[data-reveal-item]", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: { each: 0.07, from: "start" },
        scrollTrigger: { trigger: section, start: "top 65%", once: true },
      });
    }, section);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <>
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

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-20 md:grid-cols-3 xl:grid-cols-5">
          {CONTACT_METHODS.map((method) => (
            <ContactMethodCard key={method.label} method={method} animated />
          ))}
        </div>
      </section>

      <CtaSection
        compact
        heading="Ready to Bring Your Vision to Life?"
        copy="Tell us about your project and we'll get back to you shortly."
        buttonLabel="Contact Us"
        buttonHref="/contact"
      />
    </>
  );
}
