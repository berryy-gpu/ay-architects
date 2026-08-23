"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { gsap } from "@/animations/gsap/gsap.config";
import { AutoplayVideo } from "@/components/ui/AutoplayVideo";
import { Card } from "@/components/ui/Card";
import { WORK_AREAS } from "@/config/about";
import { useMediaQuery } from "@/hooks/useMediaQuery";

// Each card's confirmed render clip. Only Architecture has a real extracted
// poster frame (elevation-screen-facade-villa-poster.jpg); there's no
// ffmpeg/ffprobe available in this environment to extract first frames for
// the other three, so each falls back to a real, thematically-matched
// project photo already in the portfolio — not a generated frame. Swap
// these for real extracted posters if that tooling becomes available.
const CARD_MEDIA: Record<string, { video: string; poster: string }> = {
  Architecture: {
    video: "/videos/renders/elevation-screen-facade-villa.mp4",
    poster: "/images/renders/elevation-screen-facade-villa-poster.jpg",
  },
  "Interior Design": {
    video: "/videos/renders/interior designigvid.mp4",
    poster: "/images/interiors/kitchen/Luxury Marble Island Kitchen-01.jpeg",
  },
  "3D Visualization": {
    video: "/videos/renders/3dvisualizationvid.mp4",
    poster: "/images/elevations/The Monolith.jpeg",
  },
  "Architectural Planning": {
    video: "/videos/renders/Architecturalplanningvid.mp4",
    poster: "/images/architectural-plans/architecturalplan-01.jpeg",
  },
};

function filterHref(filter: string) {
  return filter === "all" ? "/portfolio" : `/portfolio?category=${filter}`;
}

export function AboutWork() {
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
        04 · The Work
      </p>
      <h2
        data-reveal-item
        className="mt-4 max-w-2xl translate-y-3 font-display text-3xl text-foreground opacity-0 sm:text-4xl md:text-5xl"
      >
        from the first line to the final visual.
      </h2>
      <p
        data-reveal-item
        className="mt-6 max-w-2xl translate-y-3 font-sans text-base leading-relaxed text-foreground/80 opacity-0"
      >
        Our portfolio brings together different scales and types of design
        work.
      </p>

      <div
        data-reveal-item
        className="relative mt-14 aspect-[21/9] w-full translate-y-3 overflow-hidden rounded-2xl opacity-0 md:mt-16"
      >
        <Image
          src="/images/about/site-detail-interior-fitout.jpg"
          alt="The AY Architects crew completing interior millwork and fitout on site"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark/60 via-transparent to-transparent" />
        <p className="absolute bottom-6 left-6 font-sans text-xs uppercase tracking-[0.25em] text-foreground-on-dark/90 sm:left-8">
          On site — from drawing to detail
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-16">
        {WORK_AREAS.map((area) => {
          const media = CARD_MEDIA[area.name];

          return (
            <Card
              key={area.name}
              href={filterHref(area.filter)}
              animated
              className="overflow-hidden"
            >
              {media && (
                <div className="relative -mx-6 -mt-6 mb-6 aspect-[16/9] overflow-hidden">
                  <AutoplayVideo
                    src={media.video}
                    poster={media.poster}
                    sizes="(min-width: 640px) 50vw, 100vw"
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
              <span className="mt-5 inline-block font-sans text-xs uppercase tracking-[0.2em] text-accent-secondary">
                {area.ctaLabel}
              </span>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
