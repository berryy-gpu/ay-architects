"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

import { gsap } from "@/animations/gsap/gsap.config";
import { ScrollCue } from "@/components/ui/ScrollCue";
import {
  HERO_WORD_DURATION_SECONDS,
  HERO_WORD_EASE,
  HERO_WORD_STAGGER_SECONDS,
  LOADING_SCREEN_DURATION,
  LOADING_SCREEN_DURATION_REDUCED_MOTION,
} from "@/constants/motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const PARALLAX_RANGE = 5;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20, mass: 1 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20, mass: 1 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: prefersReducedMotion
          ? LOADING_SCREEN_DURATION_REDUCED_MOTION
          : LOADING_SCREEN_DURATION,
      });

      if (prefersReducedMotion) {
        tl.set("[data-hero-video]", { opacity: 1 })
          .set("[data-hero-line-primary]", { y: 0, letterSpacing: "0.2em" })
          .set("[data-hero-line-secondary]", { y: 0, letterSpacing: "0.4em" })
          .set("[data-hero-statement]", { y: 0 })
          .to(
            "[data-hero-line-primary], [data-hero-line-secondary], [data-hero-statement]",
            { opacity: 1, duration: 0.4 }
          );
      } else {
        // Same word-stagger spec as the /services hero (constants/motion.ts)
        // — "AY" / "ARCHITECTS" reveal as that shared cadence, so the two
        // hero moments read as one site rather than two independently
        // tuned ones.
        tl.to("[data-hero-video]", {
          opacity: 1,
          duration: 1.2,
          ease: "power1.out",
        })
          .to(
            "[data-hero-line-primary]",
            {
              opacity: 1,
              y: 0,
              letterSpacing: "0.2em",
              duration: HERO_WORD_DURATION_SECONDS,
              ease: HERO_WORD_EASE,
            },
            "<"
          )
          .to(
            "[data-hero-line-secondary]",
            {
              opacity: 1,
              y: 0,
              letterSpacing: "0.4em",
              duration: HERO_WORD_DURATION_SECONDS,
              ease: HERO_WORD_EASE,
            },
            `<+=${HERO_WORD_STAGGER_SECONDS}`
          )
          .to(
            "[data-hero-statement]",
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
            "-=0.4"
          );
      }
    }, section);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    function handlePointerMove(event: PointerEvent) {
      const relativeX = event.clientX / window.innerWidth - 0.5;
      const relativeY = event.clientY / window.innerHeight - 0.5;

      mouseX.set(relativeX * PARALLAX_RANGE * 2);
      mouseY.set(relativeY * PARALLAX_RANGE * 2);
    }

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [prefersReducedMotion, mouseX, mouseY]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-dvh w-full overflow-hidden bg-background-dark"
    >
      <video
        data-hero-video
        className="absolute inset-0 h-full w-full object-cover opacity-[0.92]"
        src="/videos/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      {/* Bottom-up: legibility for the headline block. */}
      <div className="absolute inset-0 bg-gradient-to-t from-background-dark/55 via-background-dark/10 to-transparent" />
      {/* Top-down: legibility for the nav sitting over the photo — the nav
       * itself is unchanged on solid-color sections further down the page,
       * this only darkens the hero's own top band. */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background-dark/50 to-transparent sm:h-48" />

      <div className="pointer-events-none absolute inset-6 border border-foreground-on-dark/20 sm:inset-10" />

      <motion.div
        style={{ x: springX, y: springY }}
        className="absolute inset-x-0 bottom-16 flex flex-col items-start gap-6 px-8 sm:bottom-20 sm:px-12 md:bottom-24 md:px-16"
      >
        <div className="flex flex-col leading-[0.9]">
          <span
            data-hero-line-primary
            className="translate-y-4 font-display text-6xl tracking-[0.5em] text-foreground-on-dark opacity-0 sm:text-7xl md:text-8xl lg:text-9xl"
          >
            AY
          </span>
          <span
            data-hero-line-secondary
            className="mt-2 translate-y-4 font-display text-xl uppercase tracking-[0.5em] text-foreground-on-dark/90 opacity-0 sm:text-2xl md:text-3xl lg:text-4xl"
          >
            Architects
          </span>
        </div>

        <p
          data-hero-statement
          className="max-w-sm translate-y-3 font-sans text-sm leading-relaxed text-foreground-on-dark/75 opacity-0 sm:max-w-md sm:text-base"
        >
          Designing architecture that transcends time.
        </p>
      </motion.div>

      <ScrollCue prefersReducedMotion={prefersReducedMotion} />
    </section>
  );
}
