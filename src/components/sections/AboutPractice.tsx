"use client";

import { useEffect, useRef } from "react";

import { gsap } from "@/animations/gsap/gsap.config";
import { AutoplayVideo } from "@/components/ui/AutoplayVideo";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const PARAGRAPHS = [
  "AY Architects is a Lahore-based architecture and interior design practice focused on creating spaces that are functional, visually refined, and built around the people who use them.",
  "Our work spans residential architecture, luxury homes, interior design, commercial spaces, office environments, architectural elevations, planning, and 3D visualization.",
  "We believe good design begins long before a finished image. It starts with understanding the space, the brief, the way people move through it, and the atmosphere the project needs to create.",
  "From the overall architectural composition to the smallest interior detail, every decision should have a reason.",
  "Our approach combines clean architectural forms, practical space planning, carefully selected materials, natural textures, layered lighting, and contemporary detailing to create spaces that feel modern without becoming disposable.",
  "The result is architecture and interiors that are designed to look good today — and still feel right years from now.",
];

export function AboutPractice() {
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
        duration: 0.7,
        ease: "power2.out",
        stagger: { amount: 0.35, from: "start" },
        scrollTrigger: { trigger: section, start: "top 75%", once: true },
      });
    }, section);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="bg-background px-8 py-24 sm:px-12 md:px-16 md:py-32"
    >
      <div className="grid grid-cols-1 gap-16 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:gap-20">
        <div>
          <p
            data-reveal-item
            className="translate-y-3 font-sans text-xs uppercase tracking-[0.3em] text-foreground/70 opacity-0"
          >
            01 · The Practice
          </p>
          <h2
            data-reveal-item
            className="mt-4 max-w-xl translate-y-3 font-display text-3xl text-foreground opacity-0 sm:text-4xl md:text-5xl"
          >
            architecture, interiors, and ideas under one roof.
          </h2>

          <div className="mt-10 flex max-w-xl flex-col gap-5">
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
        </div>

        <div
          data-reveal-item
          className="translate-y-3 opacity-0 md:mt-4 md:self-center"
        >
          {/* The clip is natively landscape (~16:9) — framed at its own
              ratio rather than the previous 9:16 phone-mockup treatment,
              so nothing is cropped. Ambient supporting footage only, no
              caption on top of or under it. */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-accent-secondary/25 bg-surface shadow-[0_20px_50px_-25px_rgba(19,43,35,0.4)]">
            <AutoplayVideo
              src="/videos/about/about video.mp4"
              poster="/images/elevations/Casa Aurelia-02.jpeg"
              sizes="(min-width: 768px) 40vw, 90vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
