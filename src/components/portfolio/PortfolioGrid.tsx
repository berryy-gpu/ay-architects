"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { gsap, ScrollTrigger } from "@/animations/gsap/gsap.config";
import {
  CategoryFilter,
  type CategoryFilterOption,
  type PortfolioFilter,
} from "@/components/portfolio/CategoryFilter";
import { ProjectTile } from "@/components/portfolio/ProjectTile";
import { ALL_PROJECTS } from "@/data/portfolio";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { composeProjects, PORTFOLIO_FILTERS } from "@/lib/portfolio";
import type { ProjectImportance } from "@/types/portfolio";

const IMPORTANCE_WEIGHT: Record<ProjectImportance, number> = {
  primary: 2,
  secondary: 1,
  standard: 0,
};

interface PortfolioGridProps {
  /** Caps the visible set per filter selection. Omit for the full archive. */
  limit?: number;
  /** Filter to select on mount — e.g. the homepage "featured" curation vs. a deep-linked category. */
  initialFilter?: PortfolioFilter;
  /** When set (homepage use), a truncated view links out to the full archive at this base path. */
  archiveHref?: string;
  onFilterChange?: (filter: PortfolioFilter) => void;
  /** Small uppercase label rendered above the heading, inside the same reveal animation. */
  eyebrow?: string;
}

/**
 * A curated cross-category selection for the "All" filter — one project per
 * category (highest-importance first) so a capped view still represents the
 * studio's range, rather than happening to be whichever category sorts first.
 */
function curateAcrossCategories(limit: number) {
  const candidates = [...ALL_PROJECTS]
    .filter((project) => project.presentation.importance !== "standard")
    .sort(
      (a, b) =>
        IMPORTANCE_WEIGHT[b.presentation.importance] -
        IMPORTANCE_WEIGHT[a.presentation.importance]
    );

  const seenCategories = new Set<string>();
  const picked = [];

  for (const project of candidates) {
    if (seenCategories.has(project.category)) continue;
    seenCategories.add(project.category);
    picked.push(project);
    if (picked.length === limit) return picked;
  }

  for (const project of candidates) {
    if (picked.length === limit) break;
    if (!picked.includes(project)) picked.push(project);
  }

  return picked;
}

export function PortfolioGrid({
  limit,
  initialFilter = "all",
  archiveHref,
  onFilterChange,
  eyebrow,
}: PortfolioGridProps) {
  const isFirstFilter = useRef(true);
  const isTransitioning = useRef(false);
  const gridRef = useRef<HTMLDivElement>(null);
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
            ? ALL_PROJECTS.length
            : ALL_PROJECTS.filter(
                (project) =>
                  project.category === option.value ||
                  project.projectType === option.value
              ).length,
      })).filter((option) => option.value === "all" || option.count > 0),
    []
  );

  const activeOption = filterOptions.find((option) => option.value === filter);
  const headingLabel = filter === "all" ? "All Projects" : activeOption?.label;

  const allMatches = useMemo(
    () =>
      filter === "all"
        ? ALL_PROJECTS
        : ALL_PROJECTS.filter(
            (project) =>
              project.category === filter || project.projectType === filter
          ),
    [filter]
  );

  const sortedMatches = useMemo(
    () =>
      [...allMatches].sort(
        (a, b) =>
          (a.presentation.priority ?? 100) - (b.presentation.priority ?? 100)
      ),
    [allMatches]
  );

  const filteredProjects = useMemo(() => {
    if (!limit) return sortedMatches;
    if (filter === "all") return curateAcrossCategories(limit);
    return sortedMatches.slice(0, limit);
  }, [filter, limit, sortedMatches]);

  const isTruncated = Boolean(limit) && allMatches.length > filteredProjects.length;
  const fullArchiveHref =
    filter === "all" ? archiveHref : `${archiveHref}?category=${filter}`;

  const composedSlots = useMemo(
    () => composeProjects(filteredProjects),
    [filteredProjects]
  );

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

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
        scrollTrigger: { trigger: grid, start: "top 80%" },
      });

      ScrollTrigger.batch("[data-tile]", {
        start: "top 90%",
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.12,
          }),
      });
    }, grid);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // The "enter" half of a category change — new tiles have already been
  // swapped in by React (pre-hidden via their own initial classes) by the
  // time this runs. The short delay is the deliberate chapter-change pause.
  useEffect(() => {
    if (isFirstFilter.current) {
      isFirstFilter.current = false;
      return;
    }

    if (prefersReducedMotion) {
      gsap.set("[data-portfolio-heading], [data-tile]", {
        opacity: 1,
        y: 0,
        scale: 1,
      });
      isTransitioning.current = false;
      return;
    }

    const tl = gsap.timeline({
      delay: 0.2,
      onComplete: () => {
        isTransitioning.current = false;
      },
    });

    tl.to("[data-portfolio-heading]", {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
    }).to(
      "[data-tile]",
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.65,
        ease: "power2.out",
        stagger: 0.12,
      },
      "-=0.25"
    );
  }, [filter, prefersReducedMotion]);

  function handleFilterChange(value: PortfolioFilter) {
    if (value === filter || isTransitioning.current) return;

    onFilterChange?.(value);

    if (prefersReducedMotion) {
      setFilter(value);
      return;
    }

    isTransitioning.current = true;

    const tl = gsap.timeline({ onComplete: () => setFilter(value) });

    tl.to("[data-portfolio-heading]", {
      opacity: 0,
      y: -8,
      duration: 0.3,
      ease: "power2.in",
    }).to(
      "[data-tile]",
      {
        opacity: 0,
        scale: 0.97,
        y: 10,
        duration: 0.35,
        ease: "power2.in",
        stagger: 0.025,
      },
      "<0.05"
    );
  }

  return (
    <div ref={gridRef}>
      <div data-portfolio-heading className="translate-y-4 opacity-0">
        {eyebrow && (
          <p className="mb-3 font-sans text-xs uppercase tracking-[0.3em] text-stone">
            {eyebrow}
          </p>
        )}
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <h2 className="font-display text-4xl text-ink sm:text-5xl">
            {headingLabel}
          </h2>
          <span className="font-sans text-xs uppercase tracking-[0.2em] text-stone">
            {filteredProjects.length}
            {isTruncated ? ` of ${allMatches.length}` : ""} Projects
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

      <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-16 md:mt-20 md:gap-y-24">
        {composedSlots.map(({ project, span, aspect }) => (
          <ProjectTile
            key={project.slug}
            project={project}
            span={span}
            aspect={aspect}
          />
        ))}
      </div>

      {isTruncated && fullArchiveHref && (
        <div className="mt-16 flex justify-center md:mt-20">
          <Link
            href={fullArchiveHref}
            className="group relative font-sans text-xs uppercase tracking-[0.3em] text-ink"
          >
            View Full Archive
            <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </Link>
        </div>
      )}
    </div>
  );
}
