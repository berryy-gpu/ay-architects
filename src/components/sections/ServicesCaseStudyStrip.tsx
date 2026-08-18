"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { gsap } from "@/animations/gsap/gsap.config";
import { SERVICES } from "@/config/services";
import { getProjectBySlug } from "@/data/portfolio";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { CATEGORY_LABELS } from "@/lib/portfolio";

export function ServicesCaseStudyStrip() {
  const stripRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set("[data-case-study]", { opacity: 1, y: 0 });
        return;
      }

      const entries = gsap.utils.toArray<HTMLElement>("[data-case-study]");
      entries.forEach((entry) => {
        gsap.to(entry, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: entry, start: "top 80%", once: true },
        });
      });
    }, strip);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div ref={stripRef}>
      {SERVICES.map((service) => {
        const project = getProjectBySlug(service.caseStudySlug);
        if (!project) return null;

        return (
          <div
            key={service.slug}
            data-case-study
            className="group relative min-h-[90vh] translate-y-8 overflow-hidden opacity-0"
          >
            <div className="absolute inset-0">
              <Image
                src={project.heroImage}
                alt={project.title}
                fill
                sizes="100vw"
                className="object-cover transition-transform duration-[600ms] ease-out [@media(hover:hover)]:group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-background-dark/20 to-background-dark/10" />
            </div>

            <div className="relative flex min-h-[90vh] flex-col justify-end px-8 py-16 sm:px-12 md:px-16 md:py-20">
              <p className="font-sans text-xs uppercase tracking-[0.3em] text-foreground-on-dark/80">
                {CATEGORY_LABELS[service.portfolioCategory]}
              </p>
              <h2 className="mt-3 max-w-2xl font-display text-3xl text-foreground-on-dark sm:text-4xl md:text-5xl">
                {service.name}
              </h2>
              <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-foreground-on-dark/80">
                {service.description}
              </p>
              <p className="mt-4 font-sans text-[11px] uppercase tracking-[0.2em] text-foreground-on-dark/60">
                {service.deliverables.join(" · ")}
              </p>

              <Link
                href={`/portfolio?category=${service.portfolioCategory}`}
                className="group/link relative mt-8 inline-flex w-fit items-center font-sans text-xs uppercase tracking-[0.25em] text-foreground-on-dark"
              >
                View {CATEGORY_LABELS[service.portfolioCategory]} Projects
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover/link:scale-x-100" />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
