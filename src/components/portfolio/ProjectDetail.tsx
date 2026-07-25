"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { gsap, ScrollTrigger } from "@/animations/gsap/gsap.config";
import { DetailSection } from "@/components/portfolio/DetailSection";
import { ProjectTile } from "@/components/portfolio/ProjectTile";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { CATEGORY_LABELS, PROJECT_TYPE_LABELS } from "@/lib/portfolio";
import type { Project } from "@/types/portfolio";

interface ProjectDetailProps {
  project: Project;
  relatedProjects: Project[];
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

  const specs = [
    { label: "Category", value: CATEGORY_LABELS[project.category] },
    { label: "Project Type", value: PROJECT_TYPE_LABELS[project.projectType] },
    { label: "Drawing Type", value: project.drawingType },
    { label: "Style", value: project.style },
  ].filter((spec) => spec.value);

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
        className="flex translate-y-4 flex-col gap-4 px-8 py-12 opacity-0 sm:px-12 md:px-16 md:py-16"
      >
        <h1 className="font-display text-4xl text-ink sm:text-5xl md:text-6xl">
          {project.title}
        </h1>

        {specs.length > 0 && (
          <dl className="flex flex-wrap gap-x-8 gap-y-2">
            {specs.map((spec) => (
              <div key={spec.label}>
                <dt className="sr-only">{spec.label}</dt>
                <dd className="font-sans text-xs uppercase tracking-[0.2em] text-stone">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      <div className="px-8 sm:px-12 md:px-16">
        <DetailSection label="Overview" text={project.overview} />
        <DetailSection label="Design Concept" text={project.designConcept} />
        <DetailSection label="Space Planning" text={project.spacePlanning} />
        <DetailSection label="Material Palette" items={project.materialPalette} />
        <DetailSection label="Color Palette" items={project.colorPalette} />
        <DetailSection label="Features" items={project.features} />
        <DetailSection label="Lighting Features" items={project.lightingFeatures} />
        <DetailSection
          label="Decorative Elements"
          items={project.decorativeElements}
        />
        <DetailSection label="Key Features" items={project.keyFeatures} />
        <DetailSection label="Visual Identity" text={project.visualIdentity} />
        <DetailSection label="Keywords" items={project.keywords} />
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
