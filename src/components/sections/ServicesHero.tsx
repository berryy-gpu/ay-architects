"use client";

import { useEffect, useRef } from "react";

import { gsap, ScrollTrigger } from "@/animations/gsap/gsap.config";
import { siteConfig } from "@/config/site";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function ServicesHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        // A different, calmer path — not just a faster version of the
        // motion one. Instant appearance, opacity only, no stagger.
        gsap.set("[data-hero-line], [data-hero-rule]", {
          opacity: 1,
          y: 0,
          scaleX: 1,
        });
        gsap.set("[data-positioning-line]", { opacity: 1 });
        return;
      }

      // Mount entrance: headline lines, then the rule as a closing beat.
      // Finishes well under 1.2s total.
      const tl = gsap.timeline({ delay: 0.15 });

      tl.to("[data-hero-line]", {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: "power3.out",
        stagger: 0.07,
      }).to(
        "[data-hero-rule]",
        { scaleX: 1, duration: 0.4, ease: "power2.inOut" },
        "-=0.25"
      );

      // Positioning line: a separate, later beat — a plain scroll-triggered
      // fade, not part of the hero's own entrance sequence.
      gsap.to("[data-positioning-line]", {
        opacity: 1,
        duration: 0.8,
        ease: "power1.out",
        scrollTrigger: { trigger: "[data-positioning-line]", start: "top 90%" },
      });
    }, section);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === "[data-positioning-line]") trigger.kill();
      });
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[85vh] flex-col items-start justify-center bg-background-dark px-8 py-28 sm:px-12 md:px-16"
    >
      <h1 className="font-display text-6xl leading-[0.95] text-foreground-on-dark sm:text-7xl md:text-8xl">
        <span data-hero-line className="block translate-y-5 opacity-0">
          Our
        </span>
        <span data-hero-line className="block translate-y-5 opacity-0">
          Services
        </span>
      </h1>

      <span
        data-hero-rule
        aria-hidden="true"
        className="mt-8 h-px w-24 origin-left scale-x-0 bg-accent sm:w-32"
      />

      <p
        data-positioning-line
        className="mt-10 max-w-xl font-sans text-base leading-relaxed text-foreground-on-dark/75 opacity-0 sm:text-lg"
      >
        {siteConfig.description}
      </p>
    </section>
  );
}
