"use client";

import { useEffect, useRef } from "react";

import { gsap } from "@/animations/gsap/gsap.config";
import { ABOUT_PROCESS_STEPS } from "@/config/about";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function AboutProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set("[data-process-step], [data-process-line], [data-reveal-item]", {
          opacity: 1,
          y: 0,
          scaleX: 1,
        });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 75%", once: true },
      });

      tl.to("[data-reveal-item]", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      })
        .to(
          "[data-process-step]",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: { amount: 0.35, from: "start" },
          },
          "-=0.2"
        )
        .to(
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
      className="bg-background-dark px-8 py-24 sm:px-12 md:px-16 md:py-32"
    >
      <p
        data-reveal-item
        className="translate-y-3 font-sans text-xs uppercase tracking-[0.3em] text-foreground-on-dark/60 opacity-0"
      >
        07 · How We Work
      </p>
      <h2
        data-reveal-item
        className="mt-4 max-w-2xl translate-y-3 font-display text-3xl text-foreground-on-dark opacity-0 sm:text-4xl md:text-5xl"
      >
        one process. from concept to visualization.
      </h2>
      <p
        data-reveal-item
        className="mt-6 max-w-2xl translate-y-3 font-sans text-base leading-relaxed text-foreground-on-dark/75 opacity-0"
      >
        Every project starts with understanding. Before choosing materials,
        designing furniture, or producing the final render, we establish
        what the space needs to achieve.
      </p>

      {/* Desktop: horizontal stepper with a connecting line. */}
      <div className="relative mt-16 hidden md:block">
        <span
          data-process-line
          aria-hidden="true"
          className="absolute left-0 right-0 top-[9px] h-px origin-left scale-x-0 bg-foreground-on-dark/25"
        />
        <ol className="relative grid grid-cols-6 gap-6">
          {ABOUT_PROCESS_STEPS.map((step, index) => (
            <li
              key={step.name}
              data-process-step
              className="translate-y-4 opacity-0"
            >
              <span
                aria-hidden="true"
                className="relative z-10 block h-[18px] w-[18px] rounded-full border-2 border-accent bg-background-dark"
              />
              <span className="mt-4 block font-sans text-[11px] uppercase tracking-[0.2em] text-foreground-on-dark/60">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mt-1 block font-display text-lg text-foreground-on-dark">
                {step.name}
              </span>
              <p className="mt-2 font-sans text-sm leading-relaxed text-foreground-on-dark/65">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>

      {/* Mobile: simple vertical stack. */}
      <ol className="mt-12 flex flex-col gap-8 md:hidden">
        {ABOUT_PROCESS_STEPS.map((step, index) => (
          <li
            key={step.name}
            data-process-step
            className="flex translate-y-4 items-start gap-4 border-l border-accent-secondary/25 pl-4 opacity-0"
          >
            <div>
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-foreground-on-dark/60">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mt-1 block font-display text-lg text-foreground-on-dark">
                {step.name}
              </span>
              <p className="mt-2 font-sans text-sm leading-relaxed text-foreground-on-dark/65">
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
