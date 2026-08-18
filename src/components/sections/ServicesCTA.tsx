"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import { gsap } from "@/animations/gsap/gsap.config";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function ServicesCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set("[data-cta-content]", { opacity: 1, y: 0 });
        return;
      }

      gsap.to("[data-cta-content]", {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: section, start: "top 80%" },
      });
    }, section);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center gap-8 bg-background-dark px-8 py-28 text-center sm:px-12 md:px-16 md:py-36"
    >
      <div data-cta-content className="translate-y-4 opacity-0">
        <h2 className="font-display text-3xl text-foreground-on-dark sm:text-4xl md:text-5xl">
          Let&rsquo;s Discuss Your Project
        </h2>

        <Link
          href="/#contact"
          className="mt-10 inline-flex items-center rounded-full bg-accent px-8 py-3 font-sans text-xs uppercase tracking-[0.25em] text-foreground transition-[filter] duration-300 ease-out hover:brightness-110"
        >
          Get in Touch
        </Link>
      </div>
    </section>
  );
}
