"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { gsap } from "@/animations/gsap/gsap.config";
import { CTA_BUTTON_CLASSES } from "@/components/ui/ctaButtonClasses";
import {
  LOADING_SCREEN_DURATION,
  LOADING_SCREEN_DURATION_REDUCED_MOTION,
} from "@/constants/motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const SECONDARY_BUTTON_CLASSES =
  "inline-flex items-center rounded-full border border-foreground-on-dark/40 px-8 py-3 font-sans text-xs uppercase tracking-[0.25em] text-foreground-on-dark transition-colors duration-300 [@media(hover:hover)]:hover:border-foreground-on-dark [@media(hover:hover)]:hover:bg-foreground-on-dark/10";

export function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );

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
        tl.set(
          "[data-about-hero-item], [data-about-hero-image]",
          { opacity: 1, y: 0 }
        );
        return;
      }

      tl.to("[data-about-hero-item]", {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
      }).to(
        "[data-about-hero-image]",
        { opacity: 1, duration: 1, ease: "power1.out" },
        "-=0.5"
      );
    }, section);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-[92vh] flex-col overflow-hidden bg-background-dark md:flex-row"
    >
      <div className="flex flex-1 flex-col justify-center px-8 py-28 sm:px-12 md:w-1/2 md:px-16 md:py-32">
        <p
          data-about-hero-item
          className="translate-y-4 font-sans text-[11px] uppercase tracking-[0.3em] text-foreground-on-dark/60 opacity-0 sm:text-xs"
        >
          Architecture · Interiors · 3D Visualization · Lahore · Pakistan
        </p>

        <h1
          data-about-hero-item
          className="mt-6 translate-y-4 font-display text-5xl leading-[1.05] text-foreground-on-dark opacity-0 sm:text-6xl md:text-6xl lg:text-7xl"
        >
          a design practice.
          <br />
          in Lahore.
        </h1>

        <p
          data-about-hero-item
          className="mt-8 max-w-md translate-y-4 font-sans text-base leading-relaxed text-foreground-on-dark/85 opacity-0 sm:text-lg"
        >
          Architecture, interiors, and visualization shaped around the way
          people actually live and work.
        </p>

        <div
          data-about-hero-item
          className="mt-6 flex max-w-md translate-y-4 flex-col gap-4 opacity-0"
        >
          <p className="font-sans text-sm leading-relaxed text-foreground-on-dark/70">
            AY Architects is an architecture and interior design practice led
            by Araiz Ahmed Khan, working across residential and commercial
            projects with a focus on thoughtful planning, refined interiors,
            contemporary architecture, and high-quality visual
            representation.
          </p>
          <p className="font-sans text-sm leading-relaxed text-foreground-on-dark/70">
            From a home&rsquo;s first concept to its interior atmosphere, we
            bring architecture, design, and visualization together to create
            spaces that feel considered from every angle.
          </p>
        </div>

        <div
          data-about-hero-item
          className="mt-10 flex translate-y-4 flex-wrap items-center gap-4 opacity-0"
        >
          <Link href="/contact" className={CTA_BUTTON_CLASSES}>
            Start a Project
          </Link>
          <Link href="/portfolio" className={SECONDARY_BUTTON_CLASSES}>
            See Our Work
          </Link>
        </div>
      </div>

      <div className="relative min-h-[45vh] flex-1 md:min-h-0 md:w-1/2">
        <Image
          data-about-hero-image
          src="/images/elevations/elevation-07.jpeg"
          alt="A contemporary AY Architects villa elevation"
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          priority
          className="object-cover opacity-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark/40 via-transparent to-transparent md:bg-gradient-to-l" />
      </div>
    </section>
  );
}
