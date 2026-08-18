"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { gsap } from "@/animations/gsap/gsap.config";
import {
  LOADING_SCREEN_DURATION,
  LOADING_SCREEN_DURATION_REDUCED_MOTION,
} from "@/constants/motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const PARALLAX_RANGE = 5;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isSoundOn, setIsSoundOn] = useState(false);
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
          .set("[data-hero-statement], [data-hero-sound]", { y: 0 })
          .to(
            "[data-hero-line-primary], [data-hero-line-secondary], [data-hero-statement], [data-hero-sound]",
            { opacity: 1, duration: 0.4 }
          );
      } else {
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
              duration: 0.9,
              ease: "power3.out",
            },
            "<"
          )
          .to(
            "[data-hero-line-secondary]",
            {
              opacity: 1,
              y: 0,
              letterSpacing: "0.4em",
              duration: 0.9,
              ease: "power3.out",
            },
            "<+=0.12"
          )
          .to(
            "[data-hero-statement]",
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
            "-=0.4"
          )
          .to(
            "[data-hero-sound]",
            { opacity: 1, duration: 0.6, ease: "power2.out" },
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

  function toggleSound() {
    const audio = audioRef.current;
    if (!audio) return;

    if (isSoundOn) {
      audio.pause();
      setIsSoundOn(false);
    } else {
      audio.play();
      setIsSoundOn(true);
    }
  }

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

      <div className="absolute inset-0 bg-gradient-to-t from-background-dark/55 via-background-dark/10 to-transparent" />

      <div className="pointer-events-none absolute inset-6 border border-foreground-on-dark/20 sm:inset-10" />

      <audio ref={audioRef} src="/audio/hero-music.mp3" loop aria-hidden="true" />

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

      <button
        type="button"
        onClick={toggleSound}
        data-hero-sound
        aria-pressed={isSoundOn}
        aria-label={
          isSoundOn ? "Mute background sound" : "Play background sound"
        }
        className="absolute bottom-16 right-8 flex flex-col items-end gap-1 font-sans opacity-0 sm:bottom-20 sm:right-12 md:bottom-24 md:right-16"
      >
        <span className="text-[10px] uppercase tracking-[0.35em] text-foreground-on-dark/60">
          Sound
        </span>
        <span className="text-xs uppercase tracking-[0.3em] text-foreground-on-dark">
          {isSoundOn ? "On" : "Off"}
        </span>
      </button>
    </section>
  );
}
