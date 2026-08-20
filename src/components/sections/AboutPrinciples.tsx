"use client";

import { useEffect, useRef } from "react";

import { gsap } from "@/animations/gsap/gsap.config";
import { PRINCIPLES } from "@/config/about";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function AboutPrinciples() {
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
        stagger: { amount: 0.4, from: "start" },
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
      <p
        data-reveal-item
        className="translate-y-3 font-sans text-xs uppercase tracking-[0.3em] text-foreground/70 opacity-0"
      >
        03 · What We Believe
      </p>
      <h2
        data-reveal-item
        className="mt-4 max-w-2xl translate-y-3 font-display text-3xl text-foreground opacity-0 sm:text-4xl md:text-5xl"
      >
        five principles behind our work.
      </h2>
      <p
        data-reveal-item
        className="mt-6 max-w-2xl translate-y-3 font-sans text-base leading-relaxed text-foreground/80 opacity-0"
      >
        Good architecture isn&rsquo;t only about how a project looks. It is
        about how successfully the design responds to the people, space,
        materials, light, and purpose behind it.
      </p>

      <div className="mt-14 max-w-3xl md:mt-16">
        {PRINCIPLES.map((principle, index) => (
          <div
            key={principle.title}
            data-reveal-item
            className="translate-y-3 border-t border-accent-secondary/20 py-8 opacity-0 first:border-t-0 first:pt-0 sm:flex sm:gap-8 sm:py-10"
          >
            <span className="block font-display text-2xl text-accent-secondary/70 sm:w-16 sm:shrink-0 sm:text-3xl">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="mt-3 sm:mt-0">
              <h3 className="font-display text-xl text-foreground sm:text-2xl">
                {principle.title}
              </h3>
              <p className="mt-3 max-w-xl font-sans text-base leading-relaxed text-foreground/80">
                {principle.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
