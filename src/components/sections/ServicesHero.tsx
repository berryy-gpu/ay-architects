"use client";

import { useEffect, useRef } from "react";

import { gsap, ScrollTrigger } from "@/animations/gsap/gsap.config";
import { ScrollCue } from "@/components/ui/ScrollCue";
import { siteConfig } from "@/config/site";
import {
  HERO_WORD_DURATION_SECONDS,
  HERO_WORD_STAGGER_SECONDS,
  LOADING_SCREEN_DURATION,
  LOADING_SCREEN_DURATION_REDUCED_MOTION,
} from "@/constants/motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const HEADLINE_LINES = ["Architecture.", "Interiors.", "Visualisation."];

export function ServicesHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Synced to LoadingScreen's own duration, same as the homepage
      // Hero — LoadingScreen is global (mounted in layout.tsx) and stays
      // fully opaque for ~2s on every route, then cross-fades out. Without
      // this delay, this hero's content is already fully visible well
      // before that cross-fade, so it shows through the loading screen's
      // fading wordmark instead of appearing cleanly after it.
      const tl = gsap.timeline({
        delay: prefersReducedMotion
          ? LOADING_SCREEN_DURATION_REDUCED_MOTION
          : LOADING_SCREEN_DURATION,
      });

      if (prefersReducedMotion) {
        tl.set("[data-hero-line], [data-hero-rule]", {
          opacity: 1,
          y: 0,
          scaleX: 1,
        }).set("[data-positioning-line]", { opacity: 1 });
        return;
      }

      // Same shared word-stagger spec as the homepage hero
      // (constants/motion.ts): 60ms between lines, 400ms per line.
      tl.to("[data-hero-line]", {
        opacity: 1,
        y: 0,
        duration: HERO_WORD_DURATION_SECONDS,
        ease: "power3.out",
        stagger: HERO_WORD_STAGGER_SECONDS,
      }).to(
        "[data-hero-rule]",
        { scaleX: 1, duration: 0.4, ease: "power2.inOut" },
        "-=0.15"
      );

      gsap.to("[data-positioning-line]", {
        opacity: 1,
        duration: 0.8,
        ease: "power1.out",
        scrollTrigger: { trigger: "[data-positioning-line]", start: "top 90%" },
      });
    }, section);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === "[data-positioning-line]") trigger.kill();
      });
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[90vh] flex-col items-start justify-center overflow-hidden bg-background-dark px-8 py-28 sm:px-12 md:px-16"
    >
      <h1 className="font-display text-6xl leading-[0.95] text-foreground-on-dark sm:text-8xl md:text-9xl">
        {HEADLINE_LINES.map((line) => (
          <span
            key={line}
            data-hero-line
            className="block translate-y-5 opacity-0"
          >
            {line}
          </span>
        ))}
      </h1>

      <span
        data-hero-rule
        aria-hidden="true"
        className="mt-8 h-px w-24 origin-left scale-x-0 bg-accent sm:w-32"
      />

      <p
        data-positioning-line
        className="mt-10 max-w-xl font-sans text-base leading-relaxed text-foreground-on-dark/75 opacity-0 sm:text-lg"
      >
        {siteConfig.description}
      </p>

      <ScrollCue prefersReducedMotion={prefersReducedMotion} />
    </section>
  );
}
