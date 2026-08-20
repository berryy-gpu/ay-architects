"use client";

import { useEffect, useRef } from "react";

import { gsap } from "@/animations/gsap/gsap.config";
import { AutoplayVideo } from "@/components/ui/AutoplayVideo";
import { Card } from "@/components/ui/Card";
import { DESIGN_AREAS } from "@/config/about";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/** Only the Interior Design card gets a looping render clip — the pool-deck/
 * entertainment-lounge walkthrough matches its "entertainment spaces" copy.
 * See Phase 0 inventory report. */
const CARD_MEDIA: Record<string, { video: string; poster: string } | undefined> = {
  "Interior Design": {
    video: "/videos/renders/tvlounge-pool-terrace.mp4",
    poster: "/images/renders/tvlounge-pool-terrace-poster.jpg",
  },
};

export function AboutDesign() {
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
        duration: 0.65,
        ease: "power2.out",
        stagger: { amount: 0.35, from: "start" },
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
      <p
        data-reveal-item
        className="translate-y-3 font-sans text-xs uppercase tracking-[0.3em] text-foreground/70 opacity-0"
      >
        08 · What We Design
      </p>
      <h2
        data-reveal-item
        className="mt-4 max-w-2xl translate-y-3 font-display text-3xl text-foreground opacity-0 sm:text-4xl md:text-5xl"
      >
        spaces with a point of view.
      </h2>

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
        {DESIGN_AREAS.map((area) => {
          const media = CARD_MEDIA[area.name];

          return (
            <Card key={area.name} animated className="overflow-hidden">
              {media && (
                <div className="relative -mx-6 -mt-6 mb-6 aspect-[16/9] overflow-hidden">
                  <AutoplayVideo
                    src={media.video}
                    poster={media.poster}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background-dark/40 via-transparent to-transparent" />
                </div>
              )}

              <h3 className="font-display text-lg text-foreground">
                {area.name}
              </h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-foreground/80">
                {area.body}
              </p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
