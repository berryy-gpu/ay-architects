"use client";

import { useEffect, useRef } from "react";

import { gsap } from "@/animations/gsap/gsap.config";
import { SERVICES } from "@/config/services";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function ServicesList() {
  const listRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set("[data-service-entry]", { opacity: 1, y: 0 });
        return;
      }

      const entries = gsap.utils.toArray<HTMLElement>("[data-service-entry]");
      entries.forEach((entry) => {
        gsap.to(entry, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: entry, start: "top 85%" },
        });
      });
    }, list);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div
      ref={listRef}
      className="bg-background px-8 py-24 sm:px-12 md:px-16 md:py-32"
    >
      {SERVICES.map((service, index) => (
        <div
          key={service.slug}
          data-service-entry
          className="group grid translate-y-6 grid-cols-1 gap-x-8 gap-y-4 border-t border-accent-secondary/20 py-10 opacity-0 first:border-t-0 first:pt-0 sm:grid-cols-[auto_1fr] sm:items-start md:py-12"
        >
          <span
            aria-hidden="true"
            className="font-display text-5xl leading-none text-accent sm:w-32 sm:text-6xl md:text-7xl"
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="max-w-2xl">
            <h3 className="relative inline-block font-display text-2xl text-foreground sm:text-3xl">
              {service.name}
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 hidden h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out sm:block sm:group-hover:scale-x-100"
              />
            </h3>

            <p className="mt-4 font-sans text-base leading-relaxed text-foreground/80">
              {service.description}
            </p>

            <p className="mt-5 font-sans text-[11px] uppercase tracking-[0.2em] text-foreground/70">
              {service.deliverables.join(" · ")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
