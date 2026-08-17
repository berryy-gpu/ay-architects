"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { gsap, ScrollTrigger } from "@/animations/gsap/gsap.config";
import { ColorSwatches } from "@/components/portfolio/ColorSwatches";
import { KeyFeatures } from "@/components/portfolio/KeyFeatures";
import { ProjectTile } from "@/components/portfolio/ProjectTile";
import { SpecGrid, type SpecEntry } from "@/components/portfolio/SpecGrid";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { Project } from "@/types/portfolio";

interface ProjectDetailProps {
  project: Project;
  relatedProjects: Project[];
}

// A single ordered list covering every schema's spec fields. Interiors,
// site plans, and elevations each only ever populate their own subset (see
// the three schemas in src/types/portfolio.ts), so one fixed order is safe
// for all three — SpecGrid drops whatever's empty, and the relative order
// of any one project's populated fields always matches its schema's
// intended order.
function buildSpecEntries(project: Project): SpecEntry[] {
  return [
    { label: "Space Planning", items: project.spacePlanning },
    { label: "Spatial Organization", items: project.spatialOrganization },
    { label: "Facade Composition", items: project.facadeComposition },
    { label: "Material Palette", items: project.materialPalette },
    { label: "Interior Features", items: project.features },
    { label: "Architectural Features", items: project.architecturalFeatures },
    { label: "Lighting Features", items: project.lightingFeatures },
    { label: "Decorative Elements", items: project.decorativeElements },
    { label: "Landscape Features", items: project.landscapeFeatures },
    { label: "Architectural Highlights", items: project.architecturalHighlights },
    { label: "Planning Features", items: project.planningFeatures },
  ];
}

export function ProjectDetail({ project, relatedProjects }: ProjectDetailProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          "[data-detail-hero], [data-detail-title], [data-detail-section], [data-tile]",
          { opacity: 1, y: 0, scale: 1 }
        );
        return;
      }

      const intro = gsap.timeline();
      intro
        .to("[data-detail-hero]", {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
        })
        .to(
          "[data-detail-title]",
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
          "-=0.6"
        );

      ScrollTrigger.batch("[data-detail-section]", {
        start: "top 88%",
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.06,
          }),
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
    }, root);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const metaLine = [project.classification, project.subtype, project.drawingType, project.style]
    .filter((value): value is string => Boolean(value))
    .join(" · ");

  const hasConcept = Boolean(
    project.designConcept || project.planningConcept || project.designIntent
  );

  const specEntries = buildSpecEntries(project);

  return (
    <div ref={rootRef} className="bg-paper">
      <div className="px-8 pt-28 sm:px-12 md:px-16">
        <Link
          href="/#projects"
          className="group inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.25em] text-stone transition-colors duration-300 hover:text-ink"
        >
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:-translate-x-1"
          >
            ←
          </span>
          Portfolio
        </Link>
      </div>

      <div
        data-detail-hero
        className="relative mt-8 h-[70vh] w-full scale-[1.04] overflow-hidden opacity-0 sm:h-[80vh]"
      >
        <Image
          src={project.heroImage}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div
        data-detail-title
        className="flex translate-y-4 flex-col gap-3 px-8 py-12 opacity-0 sm:px-12 md:px-16 md:py-16"
      >
        <h1 className="font-display text-4xl text-ink sm:text-5xl md:text-6xl">
          {project.title}
        </h1>
        {metaLine && (
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-stone">
            {metaLine}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-16 px-8 sm:px-12 md:gap-20 md:px-16">
        {project.overview && (
          <p className="max-w-2xl font-sans text-lg leading-relaxed text-ink/85 sm:text-xl">
            {project.overview}
          </p>
        )}

        {hasConcept && (
          <div
            data-detail-section
            className="max-w-2xl translate-y-3 border-l border-ink/15 pl-6 opacity-0 sm:pl-8"
          >
            {project.designConcept && (
              <p className="font-display text-xl italic leading-relaxed text-ink/85 sm:text-2xl">
                {project.designConcept}
              </p>
            )}
            {(project.planningConcept || project.designIntent) && (
              <div className="flex flex-col gap-6">
                {project.planningConcept && (
                  <div>
                    <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-stone">
                      Planning Concept
                    </p>
                    <p className="mt-2 font-display text-xl italic leading-relaxed text-ink/85 sm:text-2xl">
                      {project.planningConcept}
                    </p>
                  </div>
                )}
                {project.designIntent && (
                  <div>
                    <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-stone">
                      Design Intent
                    </p>
                    <p className="mt-2 font-display text-xl italic leading-relaxed text-ink/85 sm:text-2xl">
                      {project.designIntent}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <ColorSwatches colors={project.colorPalette} />

        <SpecGrid entries={specEntries} />

        <KeyFeatures items={project.keyFeatures} />

        {project.circulationStrategy && (
          <div data-detail-section className="max-w-2xl translate-y-3 opacity-0">
            <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-stone">
              Circulation Strategy
            </p>
            <p className="mt-3 font-sans text-base leading-relaxed text-ink/80">
              {project.circulationStrategy}
            </p>
          </div>
        )}

        {project.visualIdentity && (
          <p
            data-detail-section
            className="translate-y-3 text-center font-display text-2xl font-light text-ink/70 opacity-0 sm:text-3xl"
          >
            {project.visualIdentity}
          </p>
        )}

        {project.keywords.length > 0 && (
          <div
            data-detail-section
            className="flex translate-y-3 flex-wrap justify-center gap-x-4 gap-y-2 opacity-0"
          >
            {project.keywords.map((keyword) => (
              <span
                key={keyword}
                className="font-sans text-[11px] uppercase tracking-[0.15em] text-stone/70"
              >
                {keyword}
              </span>
            ))}
          </div>
        )}
      </div>

      {project.galleryImages && project.galleryImages.length > 0 && (
        <div className="mt-16 flex flex-col gap-6 px-8 sm:px-12 md:px-16">
          {project.galleryImages.map((image) => (
            <div
              key={image}
              data-detail-section
              className="relative h-[60vh] w-full overflow-hidden opacity-0"
            >
              <Image
                src={image}
                alt={project.title}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {relatedProjects.length > 0 && (
        <div className="px-8 py-20 sm:px-12 md:px-16 md:py-28">
          <h2 className="font-display text-2xl text-ink sm:text-3xl">
            Related Projects
          </h2>
          <div className="mt-10 grid grid-cols-12 gap-x-6 gap-y-16">
            {relatedProjects.map((related) => (
              <ProjectTile key={related.slug} project={related} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
