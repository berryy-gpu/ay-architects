"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import { gsap } from "@/animations/gsap/gsap.config";
import { TEASER_SERVICES } from "@/config/services";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function ServicesTeaser() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set("[data-teaser-heading], [data-teaser-card], [data-teaser-cta]", {
          opacity: 1,
          y: 0,
        });
        return;
      }

      gsap.to("[data-teaser-heading]", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: section, start: "top 75%" },
      });

      gsap.to("[data-teaser-card]", {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: { amount: 0.35, from: "start" },
        scrollTrigger: { trigger: section, start: "top 65%" },
      });

      gsap.to("[data-teaser-cta]", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: "[data-teaser-cta]", start: "top 90%" },
      });
    }, section);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-background-dark px-8 py-24 sm:px-12 md:px-16 md:py-32"
    >
      <div data-teaser-heading className="translate-y-4 opacity-0">
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-accent">
          Services
        </p>
        <h2 className="mt-3 font-display text-4xl text-foreground-on-dark sm:text-5xl">
          What We Do
        </h2>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:mt-20">
        {TEASER_SERVICES.map((service) => (
          <div
            key={service.slug}
            data-teaser-card
            className="translate-y-4 border-t border-accent-secondary/25 pt-6 opacity-0"
          >
            <h3 className="font-display text-xl text-foreground-on-dark sm:text-2xl">
              {service.name}
            </h3>
            <p className="mt-3 font-sans text-sm leading-relaxed text-foreground-on-dark/75">
              {service.description}
            </p>
          </div>
        ))}
      </div>

      <div data-teaser-cta className="mt-16 translate-y-4 opacity-0 md:mt-20">
        <Link
          href="/services"
          className="group relative inline-block font-sans text-xs uppercase tracking-[0.3em] text-foreground-on-dark"
        >
          View All Services
          <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />
        </Link>
      </div>
    </section>
  );
}
