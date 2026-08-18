"use client";

import { useEffect, useRef } from "react";

import { gsap } from "@/animations/gsap/gsap.config";
import { CAPABILITIES } from "@/config/services";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function ServicesCapabilityList() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set("[data-capability-group]", { opacity: 1, y: 0 });
        return;
      }

      gsap.to("[data-capability-group]", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: { amount: 0.3, from: "start" },
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
      <p className="font-sans text-xs uppercase tracking-[0.3em] text-foreground/70">
        Capabilities
      </p>

      <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {CAPABILITIES.map((capability) => (
          <div
            key={capability.group}
            data-capability-group
            className="translate-y-4 opacity-0"
          >
            <h3 className="font-display text-lg text-foreground">
              {capability.group}
            </h3>
            <ul className="mt-3 flex flex-col gap-1.5">
              {capability.items.map((item) => (
                <li
                  key={item}
                  className="font-sans text-sm text-foreground/80"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
