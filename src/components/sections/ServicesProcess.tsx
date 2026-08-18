"use client";

import { useEffect, useRef } from "react";

import { gsap } from "@/animations/gsap/gsap.config";
import { PROCESS_STEPS } from "@/config/services";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function ServicesProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set("[data-process-step], [data-process-line]", {
          opacity: 1,
          y: 0,
          scaleX: 1,
        });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 75%", once: true },
      });

      tl.to("[data-process-step]", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: { amount: 0.3, from: "start" },
      }).to(
        "[data-process-line]",
        { scaleX: 1, duration: 0.8, ease: "power2.inOut" },
        "-=0.3"
      );
    }, section);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="bg-background px-8 py-24 sm:px-12 md:px-16 md:py-32"
    >
      <p className="font-sans text-xs uppercase tracking-[0.3em] text-foreground/70">
        Process
      </p>

      {/* Desktop: horizontal stepper with a connecting line. */}
      <div className="relative mt-16 hidden md:block">
        <span
          data-process-line
          aria-hidden="true"
          className="absolute left-0 right-0 top-[9px] h-px origin-left scale-x-0 bg-accent-secondary/40"
        />
        <ol className="relative grid grid-cols-5 gap-6">
          {PROCESS_STEPS.map((step, index) => (
            <li
              key={step.name}
              data-process-step
              className="translate-y-4 opacity-0"
            >
              <span
                aria-hidden="true"
                className="relative z-10 block h-[18px] w-[18px] rounded-full border-2 border-accent bg-background"
              />
              <span className="mt-4 block font-sans text-[11px] uppercase tracking-[0.2em] text-foreground/70">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mt-1 block font-display text-lg text-foreground">
                {step.name}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* Mobile: simple vertical stack. */}
      <ol className="mt-12 flex flex-col gap-8 md:hidden">
        {PROCESS_STEPS.map((step, index) => (
          <li
            key={step.name}
            data-process-step
            className="flex translate-y-4 items-start gap-4 border-l border-accent-secondary/25 pl-4 opacity-0"
          >
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-foreground/70">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="font-display text-lg text-foreground">
              {step.name}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
