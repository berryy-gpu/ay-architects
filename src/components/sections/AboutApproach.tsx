"use client";

import { useEffect, useRef } from "react";

import { gsap } from "@/animations/gsap/gsap.config";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const PARAGRAPHS = [
  "We aren't interested in adding more simply to make a space feel expensive.",
  "A strong project can be quiet.",
  "A restrained material palette can be more powerful than a complicated one. A carefully positioned light can have more impact than dozens of decorative fixtures. A well-planned room can feel more luxurious than a room filled with furniture.",
  "Our work is guided by clarity, proportion, materiality, light, and function.",
];

export function AboutApproach() {
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
      <div className="mx-auto max-w-2xl">
        <p
          data-reveal-item
          className="translate-y-3 font-sans text-xs uppercase tracking-[0.3em] text-foreground/70 opacity-0"
        >
          09 · Our Approach
        </p>
        <h2
          data-reveal-item
          className="mt-4 translate-y-3 font-display text-3xl text-foreground opacity-0 sm:text-4xl md:text-5xl"
        >
          less noise. more intention.
        </h2>

        <div className="mt-10 flex flex-col gap-5">
          {PARAGRAPHS.map((paragraph) => (
            <p
              key={paragraph}
              data-reveal-item
              className="translate-y-3 font-sans text-base leading-relaxed text-foreground/80 opacity-0"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <p
          data-reveal-item
          className="mt-12 translate-y-3 border-t border-accent-secondary/25 pt-8 font-display text-2xl leading-snug text-foreground opacity-0 sm:text-3xl"
        >
          The objective is simple: Create spaces that feel considered rather
          than decorated.
        </p>
      </div>
    </section>
  );
}
