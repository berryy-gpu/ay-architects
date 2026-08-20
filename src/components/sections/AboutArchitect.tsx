"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { gsap } from "@/animations/gsap/gsap.config";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const QUESTIONS = [
  "How should it function?",
  "How should it feel?",
  "How should light move through it?",
  "Which materials belong together?",
  "And how can the final design communicate its character before construction even begins?",
];

export function AboutArchitect() {
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
      className="bg-background-dark px-8 py-24 sm:px-12 md:px-16 md:py-32"
    >
      <div className="grid grid-cols-1 gap-16 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-20">
        <div
          data-reveal-item
          className="translate-y-3 opacity-0"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-foreground-on-dark/15">
            <Image
              src="/images/about/site-detail-structure.jpg"
              alt="Araiz Ahmed Khan reviewing drawings on an AY Architects site"
              fill
              sizes="(min-width: 768px) 42vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <p
            data-reveal-item
            className="translate-y-3 font-sans text-xs uppercase tracking-[0.3em] text-foreground-on-dark/60 opacity-0"
          >
            02 · The Architect
          </p>
          <h2
            data-reveal-item
            className="mt-4 translate-y-3 font-display text-3xl text-foreground-on-dark opacity-0 sm:text-4xl md:text-5xl"
          >
            Araiz Ahmed Khan.
          </h2>
          <p
            data-reveal-item
            className="mt-3 translate-y-3 font-sans text-xs uppercase tracking-[0.2em] text-foreground-on-dark/60 opacity-0"
          >
            Architectural &amp; Interior Designer · 3D Visualization
            Specialist
          </p>

          <div className="mt-8 flex max-w-xl flex-col gap-5">
            <p
              data-reveal-item
              className="translate-y-3 font-sans text-base leading-relaxed text-foreground-on-dark/80 opacity-0"
            >
              Araiz Ahmed Khan leads AY Architects with a multidisciplinary
              approach to architecture, interiors, and visual design.
            </p>
            <p
              data-reveal-item
              className="translate-y-3 font-sans text-base leading-relaxed text-foreground-on-dark/80 opacity-0"
            >
              With 3+ years of experience, his work brings together
              architectural thinking, interior detailing, spatial planning,
              and 3D visualization.
            </p>
            <p
              data-reveal-item
              className="translate-y-3 font-sans text-base leading-relaxed text-foreground-on-dark/80 opacity-0"
            >
              The process begins with the space itself.
            </p>

            <ul
              data-reveal-item
              className="translate-y-3 flex flex-col gap-2 border-l border-accent-secondary/30 pl-5 opacity-0"
            >
              {QUESTIONS.map((question) => (
                <li
                  key={question}
                  className="font-sans text-sm font-light italic leading-relaxed text-foreground-on-dark/60"
                >
                  {question}
                </li>
              ))}
            </ul>

            <p
              data-reveal-item
              className="translate-y-3 font-sans text-base leading-relaxed text-foreground-on-dark/80 opacity-0"
            >
              This way of working allows architectural design and
              visualization to support each other rather than exist as
              separate stages.
            </p>
            <p
              data-reveal-item
              className="translate-y-3 font-sans text-base leading-relaxed text-foreground-on-dark/80 opacity-0"
            >
              Whether developing a residential interior, a contemporary
              villa, a commercial elevation, or a detailed 3D visualization,
              the goal remains the same:
            </p>

            <blockquote
              data-reveal-item
              className="translate-y-3 border-l-2 border-accent pl-5 opacity-0"
            >
              <p className="font-display text-xl leading-snug text-foreground-on-dark sm:text-2xl">
                &ldquo;Design spaces with clarity. Visualize them with
                intention.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
