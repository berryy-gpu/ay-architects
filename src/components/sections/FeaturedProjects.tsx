"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { gsap, ScrollTrigger } from "@/animations/gsap/gsap.config";
import { FEATURED_PROJECTS } from "@/data/portfolio/featured";
import { useLenis } from "@/hooks/useLenis";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const TOTAL = FEATURED_PROJECTS.length.toString().padStart(2, "0");

export function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const stopRefs = useRef<Array<HTMLDivElement | null>>([]);
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );
  const lenis = useLenis();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const stops = stopRefs.current.filter(
      (el): el is HTMLDivElement => Boolean(el)
    );
    if (stops.length === 0) return;

    const ctx = gsap.context(() => {
      stops.forEach((wrapper, i) => {
        const frame = wrapper.querySelector<HTMLElement>("[data-stop-frame]");
        if (!frame) return;

        const isFirst = i === 0;
        const isLast = i === stops.length - 1;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        if (isFirst) {
          tl.fromTo(
            frame,
            { opacity: 0, scale: 1.04 },
            { opacity: 1, scale: 1, duration: 0.15 }
          );
        } else {
          tl.fromTo(frame, { scale: 1.04 }, { scale: 1, duration: 0.15 });
        }

        tl.to(frame, { scale: 1, duration: isLast ? 0.85 : 0.55 });

        if (!isLast) {
          tl.to(frame, {
            opacity: 0,
            scale: 0.96,
            duration: 0.3,
            ease: "power1.in",
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  function goToPortfolio(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    lenis?.scrollTo("#projects");
  }

  return (
    <section id="featured" ref={sectionRef} className="relative bg-ink">
      <div
        ref={(el) => {
          stopRefs.current[0] = el;
        }}
        className="relative h-[120vh]"
        style={{ zIndex: 1 }}
      >
        <div
          data-stop-frame
          className="sticky top-0 flex h-dvh flex-col items-center justify-center bg-ink px-8 text-center"
        >
          <h2 className="font-display text-4xl text-paper sm:text-5xl md:text-6xl">
            Featured Projects
          </h2>
          <p className="mt-4 font-sans text-xs uppercase tracking-[0.35em] text-stone">
            A curated selection
          </p>
        </div>
      </div>

      {FEATURED_PROJECTS.map((project, i) => (
        <div
          key={project.slug}
          ref={(el) => {
            stopRefs.current[i + 1] = el;
          }}
          className="relative h-[170vh]"
          style={{ zIndex: i + 2 }}
        >
          <div
            data-stop-frame
            className="sticky top-0 h-dvh w-full overflow-hidden bg-ink"
          >
            <Image
              src={project.heroImage}
              alt={project.title}
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
            <p className="absolute bottom-10 left-8 font-sans text-xs uppercase tracking-[0.25em] text-paper/90 sm:left-12 md:left-16">
              {String(i + 1).padStart(2, "0")} — {project.title}
            </p>
          </div>
        </div>
      ))}

      <div
        ref={(el) => {
          stopRefs.current[FEATURED_PROJECTS.length + 1] = el;
        }}
        className="relative h-[130vh]"
        style={{ zIndex: FEATURED_PROJECTS.length + 2 }}
      >
        <div
          data-stop-frame
          className="sticky top-0 flex h-dvh flex-col items-center justify-center gap-4 bg-ink px-8 text-center"
        >
          <span className="font-sans text-xs uppercase tracking-[0.3em] text-stone">
            {TOTAL} / {TOTAL}
          </span>
          <a
            href="#projects"
            onClick={goToPortfolio}
            className="group relative font-display text-2xl text-paper sm:text-3xl"
          >
            Explore the full portfolio
            <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-paper transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100" />
          </a>
        </div>
      </div>
    </section>
  );
}
