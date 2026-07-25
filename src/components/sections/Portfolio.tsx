"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { gsap, ScrollTrigger } from "@/animations/gsap/gsap.config";
import {
  CategoryFilter,
  type PortfolioFilter,
} from "@/components/portfolio/CategoryFilter";
import { ProjectTile } from "@/components/portfolio/ProjectTile";
import { ALL_PROJECTS } from "@/data/portfolio";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { PORTFOLIO_FILTERS } from "@/lib/portfolio";

export function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isFirstFilter = useRef(true);
  const [filter, setFilter] = useState<PortfolioFilter>("all");
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );

  const filteredProjects = useMemo(() => {
    const matches =
      filter === "all"
        ? ALL_PROJECTS
        : ALL_PROJECTS.filter(
            (project) =>
              project.category === filter || project.projectType === filter
          );

    return [...matches].sort(
      (a, b) =>
        (a.presentation.priority ?? 100) - (b.presentation.priority ?? 100)
    );
  }, [filter]);

  // Heading + initial tile reveal as the section scrolls into view.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set("[data-portfolio-heading], [data-tile]", {
          opacity: 1,
          y: 0,
        });
        return;
      }

      gsap.to("[data-portfolio-heading]", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: section, start: "top 75%" },
      });

      ScrollTrigger.batch("[data-tile]", {
        start: "top 90%",
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.08,
          }),
      });
    }, section);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Re-reveal the (freshly filtered) tile set after a category change.
  useEffect(() => {
    if (isFirstFilter.current) {
      isFirstFilter.current = false;
      return;
    }

    gsap.set(gridRef.current, { opacity: 1 });

    if (prefersReducedMotion) {
      gsap.set("[data-tile]", { opacity: 1, y: 0 });
      return;
    }

    gsap.fromTo(
      "[data-tile]",
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.04,
      }
    );
  }, [filter, prefersReducedMotion]);

  function handleFilterChange(value: PortfolioFilter) {
    if (value === filter) return;

    if (prefersReducedMotion) {
      setFilter(value);
      return;
    }

    gsap.to(gridRef.current, {
      opacity: 0,
      duration: 0.2,
      onComplete: () => setFilter(value),
    });
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative bg-paper px-8 py-24 sm:px-12 md:px-16 md:py-32"
    >
      <div
        data-portfolio-heading
        className="mb-16 flex translate-y-4 flex-col gap-8 opacity-0 md:mb-20 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <h2 className="font-display text-4xl text-ink sm:text-5xl">
            Portfolio
          </h2>
          <p className="mt-3 font-sans text-xs uppercase tracking-[0.3em] text-stone">
            The complete archive of our work
          </p>
        </div>

        <CategoryFilter
          options={PORTFOLIO_FILTERS}
          value={filter}
          onChange={handleFilterChange}
        />
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-12 gap-x-6 gap-y-16 md:gap-y-20"
      >
        {filteredProjects.map((project) => (
          <ProjectTile key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
