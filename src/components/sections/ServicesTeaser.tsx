"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { gsap } from "@/animations/gsap/gsap.config";
import { TEASER_SERVICES } from "@/config/services";
import { getProjectBySlug } from "@/data/portfolio";
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
        gsap.set("[data-teaser-heading], [data-teaser-tile], [data-teaser-cta]", {
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
        scrollTrigger: { trigger: section, start: "top 75%", once: true },
      });

      gsap.to("[data-teaser-tile]", {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: { amount: 0.3, from: "start" },
        scrollTrigger: { trigger: section, start: "top 65%", once: true },
      });

      gsap.to("[data-teaser-cta]", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: "[data-teaser-cta]", start: "top 90%", once: true },
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

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3 md:mt-20">
        {TEASER_SERVICES.map((service) => {
          const project = getProjectBySlug(service.caseStudySlug);
          if (!project) return null;

          return (
            <Link
              key={service.slug}
              href="/services"
              data-teaser-tile
              className="group relative block aspect-[4/5] translate-y-4 overflow-hidden opacity-0"
            >
              <Image
                src={project.heroImage}
                alt={project.title}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover transition-transform duration-[600ms] ease-out [@media(hover:hover)]:group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-background-dark/10 to-transparent" />
              <span className="absolute bottom-5 left-5 right-5 font-display text-lg text-foreground-on-dark sm:text-xl">
                {service.name}
              </span>
            </Link>
          );
        })}
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
