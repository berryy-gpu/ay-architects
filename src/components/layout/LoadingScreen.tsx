"use client";

import { useEffect, useRef, useState } from "react";

import { gsap } from "@/animations/gsap/gsap.config";
import { siteConfig } from "@/config/site";
import { useLenis } from "@/hooks/useLenis";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const lenis = useLenis();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: () => setIsComplete(true) });
      const exitTargets = "[data-loading-content]";

      if (prefersReducedMotion) {
        tl.set("[data-loading-wordmark]", {
          opacity: 1,
          y: 0,
          letterSpacing: "0.2em",
        })
          .set("[data-loading-line]", { scaleX: 1 })
          .set("[data-loading-tick]", { opacity: 1 })
          .to(exitTargets, { opacity: 0, duration: 0.3, delay: 0.4 })
          .to(container, { opacity: 0, duration: 0.3 }, "<");
      } else {
        tl.to("[data-loading-wordmark]", {
          opacity: 1,
          y: 0,
          letterSpacing: "0.2em",
          duration: 0.55,
          ease: "power3.out",
        })
          .to(
            "[data-loading-line]",
            { scaleX: 1, duration: 0.4, ease: "power2.inOut" },
            "-=0.3"
          )
          .to(
            "[data-loading-tick]",
            { opacity: 1, duration: 0.2, ease: "power1.out" },
            "-=0.05"
          )
          .to(exitTargets, {
            opacity: 0,
            y: -8,
            duration: 0.35,
            ease: "power2.in",
            delay: 0.6,
          })
          .to(
            container,
            { opacity: 0, duration: 0.45, ease: "power2.inOut" },
            "-=0.2"
          );
      }
    }, container);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (isComplete) {
      document.documentElement.style.overflow = "";
      lenis?.start();
      return;
    }

    document.documentElement.style.overflow = "hidden";
    lenis?.stop();

    return () => {
      document.documentElement.style.overflow = "";
      lenis?.start();
    };
  }, [isComplete, lenis]);

  if (isComplete) return null;

  return (
    <div
      ref={containerRef}
      role="status"
      aria-label={`Loading ${siteConfig.name}`}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-background-dark"
    >
      <div
        data-loading-content
        className="flex select-none flex-col items-center px-6 text-center"
      >
        <p
          data-loading-wordmark
          className="translate-y-2 font-display text-4xl tracking-[0.5em] text-foreground-on-dark opacity-0 sm:text-5xl md:text-6xl"
        >
          AY ARCHITECTS
        </p>
        <span
          data-loading-line
          aria-hidden="true"
          className="relative mt-6 h-px w-24 origin-center scale-x-0 bg-accent-secondary"
        >
          <span
            data-loading-tick
            className="absolute left-0 top-1/2 h-2 w-px -translate-y-1/2 bg-accent-secondary opacity-0"
          />
          <span
            data-loading-tick
            className="absolute right-0 top-1/2 h-2 w-px -translate-y-1/2 bg-accent-secondary opacity-0"
          />
        </span>
      </div>
    </div>
  );
}
