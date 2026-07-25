"use client";

import Image from "next/image";
import { useRef } from "react";

import { gsap } from "@/animations/gsap/gsap.config";
import { CATEGORY_LABELS, resolvePresentation } from "@/lib/portfolio";
import type { Project } from "@/types/portfolio";

interface ProjectTileProps {
  project: Project;
}

export function ProjectTile({ project }: ProjectTileProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const { span, aspect } = resolvePresentation(project.presentation);

  function handleEnter() {
    gsap.to(frameRef.current, {
      scale: 1.018,
      filter: "brightness(1.03)",
      duration: 0.6,
      ease: "power2.out",
    });
    gsap.to(arrowRef.current, {
      opacity: 1,
      x: 0,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(metaRef.current, { opacity: 1, duration: 0.4, ease: "power2.out" });
  }

  function handleLeave() {
    gsap.to(frameRef.current, {
      scale: 1,
      filter: "brightness(1)",
      duration: 0.6,
      ease: "power2.out",
    });
    gsap.to(arrowRef.current, {
      opacity: 0,
      x: -3,
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(metaRef.current, { opacity: 0.8, duration: 0.4, ease: "power2.out" });
  }

  return (
    <article
      data-tile
      className={`translate-y-4 opacity-0 ${span}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl text-ink sm:text-2xl">
            {project.title}
          </h3>
          <div
            ref={metaRef}
            className="mt-2 flex flex-wrap gap-x-3 font-sans text-[11px] uppercase tracking-[0.2em] text-stone opacity-80"
          >
            <span>{CATEGORY_LABELS[project.category]}</span>
            {project.style && <span>{project.style}</span>}
          </div>
        </div>
        <span
          ref={arrowRef}
          className="mt-1 shrink-0 -translate-x-1 font-display text-xl text-ink opacity-0"
          aria-hidden="true"
        >
          →
        </span>
      </div>

      <div ref={frameRef} className={`relative w-full overflow-hidden ${aspect}`}>
        <Image
          src={project.heroImage}
          alt={project.title}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    </article>
  );
}
