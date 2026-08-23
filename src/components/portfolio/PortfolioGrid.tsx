"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { gsap } from "@/animations/gsap/gsap.config";
import {
  CategoryFilter,
  type CategoryFilterOption,
  type PortfolioFilter,
} from "@/components/portfolio/CategoryFilter";
import { JustifiedGrid } from "@/components/portfolio/JustifiedGrid";
import { ALL_PROJECTS } from "@/data/portfolio";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { hasCoverImage, PORTFOLIO_FILTERS } from "@/lib/portfolio";

// Projects with no matching photography on disk (heroImage: "") are excluded
// from every grid/curation view — their detail page still exists, but
// there's no cover to show in a listing. See the Phase 0 audit report.
const VISIBLE_PROJECTS = ALL_PROJECTS.filter(hasCoverImage);

interface PortfolioGridProps {
  /** Filter to select on mount — e.g. a deep-linked category. */
  initialFilter?: PortfolioFilter;
  /** Small uppercase label rendered above the heading, inside the same reveal animation. */
  eyebrow?: string;
}

/** The full, unlimited archive — the homepage glimpse (exactly 3 covers) is a separate, simpler section; see Portfolio.tsx. */
export function PortfolioGrid({
  initialFilter = "all",
  eyebrow,
}: PortfolioGridProps) {
  const isFirstFilter = useRef(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const gridWrapperRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<PortfolioFilter>(initialFilter);
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );

  const filterOptions = useMemo<CategoryFilterOption[]>(
    () =>
      PORTFOLIO_FILTERS.map((option) => ({
        ...option,
        count:
          option.value === "all"
            ? VISIBLE_PROJECTS.length
            : VISIBLE_PROJECTS.filter(
                (project) =>
                  project.category === option.value ||
                  project.projectType === option.value
              ).length,
      })).filter((option) => option.value === "all" || option.count > 0),
    []
  );

  const activeOption = filterOptions.find((option) => option.value === filter);
  const headingLabel = filter === "all" ? "All Projects" : activeOption?.label;

  const filteredProjects = useMemo(
    () =>
      filter === "all"
        ? VISIBLE_PROJECTS
        : VISIBLE_PROJECTS.filter(
            (project) =>
              project.category === filter || project.projectType === filter
          ),
    [filter]
  );

  // Heading scroll-reveal — tile reveal is JustifiedGrid's own responsibility
  // (it needs to re-run per filter change anyway, since it owns the DOM).
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set("[data-portfolio-heading]", { opacity: 1, y: 0 });
        return;
      }

      gsap.to("[data-portfolio-heading]", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: root, start: "top 80%" },
      });
    }, root);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // A light cross-fade of the grid as a whole on filter change (rather than
  // choreographing every individual tile, which JustifiedGrid already
  // re-reveals on its own once the new tiles mount).
  useEffect(() => {
    if (isFirstFilter.current) {
      isFirstFilter.current = false;
      return;
    }
    const wrapper = gridWrapperRef.current;
    if (!wrapper || prefersReducedMotion) return;

    gsap.fromTo(
      wrapper,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  }, [filter, prefersReducedMotion]);

  function handleFilterChange(value: PortfolioFilter) {
    if (value === filter) return;
    setFilter(value);
  }

  return (
    <div ref={rootRef}>
      <div data-portfolio-heading className="translate-y-4 opacity-0">
        {eyebrow && (
          <p className="mb-3 font-sans text-xs uppercase tracking-[0.3em] text-foreground/70">
            {eyebrow}
          </p>
        )}
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <h1 className="font-display text-4xl text-foreground sm:text-5xl">
            {headingLabel}
          </h1>
          <span className="font-sans text-xs uppercase tracking-[0.2em] text-foreground/70">
            {filteredProjects.length} Projects
          </span>
        </div>
      </div>

      <div className="mt-10 md:mt-12">
        <CategoryFilter
          options={filterOptions}
          value={filter}
          onChange={handleFilterChange}
        />
      </div>

      <div ref={gridWrapperRef} className="mt-16 md:mt-20">
        <JustifiedGrid projects={filteredProjects} />
      </div>
    </div>
  );
}
