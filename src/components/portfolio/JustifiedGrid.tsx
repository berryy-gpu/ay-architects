"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import { gsap, ScrollTrigger } from "@/animations/gsap/gsap.config";
import { WatermarkedImage } from "@/components/ui/WatermarkedImage";
import { getImageRatio } from "@/data/portfolio/imageDimensions";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { computeJustifiedRows } from "@/lib/justifiedLayout";
import type { Project } from "@/types/portfolio";

interface JustifiedGridProps {
  projects: Project[];
  gutter?: number;
}

/** Row height scales down on narrow viewports so 2-3 images still fit per row. */
function targetRowHeightFor(containerWidth: number): number {
  if (containerWidth < 560) return 220;
  if (containerWidth < 900) return 260;
  return 340;
}

/**
 * A justified/masonry photo gallery: images pack into rows by their real
 * aspect ratio so each completed row fills the container edge-to-edge at
 * one consistent (per-row) height, instead of every tile being forced into
 * an identical crop box. See src/lib/justifiedLayout.ts for the packing
 * algorithm and src/data/portfolio/imageDimensions.ts for the measured
 * ratios driving it.
 */
export function JustifiedGrid({ projects, gutter = 20 }: JustifiedGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width;
      if (width) setContainerWidth(width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Own the tile reveal here (rather than leaving it to whichever page
  // renders this grid) so it's correct both on first scroll-into-view and
  // after a category filter swaps in a fresh set of tiles. Re-runs whenever
  // the visible project set changes, and only once tiles actually exist in
  // the DOM (containerWidth === 0 is the brief measuring pass).
  const projectsKey = projects.map((project) => project.slug).join(",");
  useEffect(() => {
    const el = containerRef.current;
    if (!el || containerWidth === 0) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set("[data-tile]", { opacity: 1, scale: 1, y: 0 });
        return;
      }

      ScrollTrigger.batch("[data-tile]", {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            stagger: { amount: 0.4, from: "start" },
          }),
      });
    }, el);

    return () => ctx.revert();
  }, [prefersReducedMotion, containerWidth, projectsKey]);

  const items = useMemo(
    () => projects.map((project) => ({ project, ratio: getImageRatio(project.heroImage) })),
    [projects]
  );

  const rows = useMemo(
    () =>
      computeJustifiedRows(items, {
        containerWidth,
        targetRowHeight: targetRowHeightFor(containerWidth || 1200),
        gutter,
      }),
    [items, containerWidth, gutter]
  );

  return (
    <div ref={containerRef} className="flex flex-col" style={{ gap: gutter }}>
      {containerWidth === 0 ? (
        // Measuring pass — reserves roughly the right amount of space so the
        // page doesn't jump once real rows appear a frame later.
        <div className="h-[340px] w-full" aria-hidden="true" />
      ) : (
        rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex" style={{ gap: gutter, height: row.height }}>
            {row.items.map(({ project, ratio }) => (
              <Link
                key={project.slug}
                href={`/portfolio/${project.slug}`}
                data-tile
                className="group relative block shrink-0 translate-y-4 scale-[0.97] overflow-hidden opacity-0 [@media(hover:hover)]:hover:brightness-[1.03]"
                style={{ width: ratio * row.height, height: row.height }}
              >
                <WatermarkedImage
                  src={project.heroImage}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover transition-transform duration-500 ease-out [@media(hover:hover)]:group-hover:scale-[1.02]"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-background-dark/70 to-transparent p-4 opacity-0 transition-opacity duration-300 ease-out [@media(hover:hover)]:group-hover:opacity-100">
                  <p className="font-sans text-xs uppercase tracking-[0.2em] text-foreground-on-dark">
                    {project.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ))
      )}
    </div>
  );
}
