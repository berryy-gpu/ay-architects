"use client";

import { useEffect, useRef } from "react";

import { gsap } from "@/animations/gsap/gsap.config";
import { STUDIO_FACTS } from "@/config/about";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const CLOSING_LINES = [
  "The location may change.",
  "The approach doesn't.",
  "Clear planning. Considered materials. Strong architectural identity.",
];

export function AboutLocation() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set("[data-reveal-item]", { opacity: 1, y: 0 });
        return;
      }

      gsap.to("[data-reveal-item]", {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: "power2.out",
        stagger: { amount: 0.35, from: "start" },
        scrollTrigger: { trigger: section, start: "top 80%", once: true },
      });
    }, section);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="bg-background px-8 py-24 sm:px-12 md:px-16 md:py-32"
    >
      <div className="grid grid-cols-1 gap-16 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-20">
        <div>
          <p
            data-reveal-item
            className="translate-y-3 font-sans text-xs uppercase tracking-[0.3em] text-foreground/70 opacity-0"
          >
            06 · Where We Work
          </p>
          <h2
            data-reveal-item
            className="mt-4 max-w-xl translate-y-3 font-display text-3xl text-foreground opacity-0 sm:text-4xl md:text-5xl"
          >
            based in Lahore. designing beyond one address.
          </h2>

          <div className="mt-8 flex max-w-xl flex-col gap-5">
            <p
              data-reveal-item
              className="translate-y-3 font-sans text-base leading-relaxed text-foreground/80 opacity-0"
            >
              AY Architects is based in Lahore, Pakistan, working across
              residential and commercial design with a growing portfolio of
              architectural and interior projects.
            </p>
            <p
              data-reveal-item
              className="translate-y-3 font-sans text-base leading-relaxed text-foreground/80 opacity-0"
            >
              Our work ranges from private homes and luxury interiors to
              offices, commercial buildings, architectural elevations, and
              detailed visualization.
            </p>
          </div>

          <div
            data-reveal-item
            className="mt-10 translate-y-3 opacity-0"
          >
            {CLOSING_LINES.map((line) => (
              <p
                key={line}
                className="font-display text-xl text-foreground sm:text-2xl"
              >
                {line}
              </p>
            ))}
          </div>
        </div>

        <div
          data-reveal-item
          className="translate-y-3 self-start rounded-2xl border border-accent-secondary/25 bg-surface opacity-0"
        >
          {STUDIO_FACTS.map((fact) => (
            <div
              key={fact.label}
              className="border-b border-accent-secondary/20 px-6 py-5 last:border-b-0"
            >
              <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-foreground/60">
                {fact.label}
              </p>
              <p className="mt-1.5 font-sans text-base text-foreground">
                {fact.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
