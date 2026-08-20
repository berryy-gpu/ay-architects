"use client";

import { useEffect, useRef } from "react";

import { gsap } from "@/animations/gsap/gsap.config";
import { ALL_PROJECTS } from "@/data/portfolio";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const STATS = [
  {
    value: "03+",
    label: "Years Experience",
    body: "Architecture, interiors, and visualization developed through hands-on project work.",
  },
  {
    value: "04",
    label: "Core Areas",
    body: "Architecture · Interior Design · Visualization · Planning",
  },
  {
    // Real current archive count — not a placeholder. Keep in sync with
    // src/data/portfolio automatically by reading ALL_PROJECTS.length below
    // rather than hardcoding a number that will drift as entries are added.
    value: String(ALL_PROJECTS.length),
    label: "Design Studies",
    body: "A growing body of residential, commercial, interior, elevation, and architectural work.",
  },
  {
    value: "01",
    label: "Design Philosophy",
    body: "Function first. Detail always.",
  },
];

export function AboutStats() {
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
      className="bg-surface px-8 py-24 sm:px-12 md:px-16 md:py-32"
    >
      <p
        data-reveal-item
        className="translate-y-3 font-sans text-xs uppercase tracking-[0.3em] text-foreground/70 opacity-0"
      >
        05 · The Studio in Numbers
      </p>
      <h2
        data-reveal-item
        className="mt-4 max-w-2xl translate-y-3 font-display text-3xl text-foreground opacity-0 sm:text-4xl md:text-5xl"
      >
        design shaped by experience.
      </h2>

      <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 md:mt-16 lg:grid-cols-4 lg:gap-8">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            data-reveal-item
            className="translate-y-3 border-t border-accent-secondary/25 pt-6 opacity-0"
          >
            <span className="block font-display text-5xl text-foreground sm:text-6xl">
              {stat.value}
            </span>
            <p className="mt-3 font-sans text-xs uppercase tracking-[0.25em] text-foreground/70">
              {stat.label}
            </p>
            <p className="mt-3 font-sans text-sm leading-relaxed text-foreground/70">
              {stat.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
