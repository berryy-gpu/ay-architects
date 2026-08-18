"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";

import { gsap } from "@/animations/gsap/gsap.config";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { CATEGORY_LABELS, resolvePresentation } from "@/lib/portfolio";
import type { Project } from "@/types/portfolio";

interface ProjectTileProps {
  project: Project;
  span?: string;
  aspect?: string;
}

export function ProjectTile({ project, span, aspect }: ProjectTileProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );

  const resolved = resolvePresentation(project.presentation);
  const spanClass = span ?? resolved.span;
  const aspectClass = aspect ?? resolved.aspect;
  const href = `/portfolio/${project.slug}`;

  function handleEnter() {
    gsap.to(frameRef.current, {
      scale: 1.02,
      filter: "brightness(1.03)",
      duration: 0.6,
      ease: "power2.out",
    });
    gsap.to(arrowRef.current, {
      opacity: 1,
      x: 0,
      duration: 0.5,
      ease: "power2.out",
    });
    gsap.to(metaRef.current, { opacity: 1, duration: 0.5, ease: "power2.out" });
  }

  function handleLeave() {
    gsap.to(frameRef.current, {
      scale: 1,
      filter: "brightness(1)",
      duration: 0.7,
      ease: "power2.out",
    });
    gsap.to(arrowRef.current, {
      opacity: 0,
      x: -3,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(metaRef.current, { opacity: 0.8, duration: 0.5, ease: "power2.out" });
  }

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) {
      return;
    }

    event.preventDefault();

    if (prefersReducedMotion) {
      router.push(href);
      return;
    }

    gsap.to(frameRef.current, {
      scale: 1.05,
      filter: "brightness(1.08)",
      duration: 0.5,
      ease: "power2.inOut",
    });
    gsap.to(linkRef.current, {
      opacity: 0,
      duration: 0.35,
      delay: 0.2,
      ease: "power2.in",
      onComplete: () => router.push(href),
    });
  }

  return (
    <Link
      ref={linkRef}
      href={href}
      onClick={handleClick}
      data-tile
      className={`block translate-y-4 scale-[0.97] opacity-0 ${spanClass}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl text-foreground sm:text-2xl">
            {project.title}
          </h3>
          <div
            ref={metaRef}
            className="mt-2 font-sans text-[11px] uppercase tracking-[0.2em] text-foreground/70 opacity-80"
          >
            {CATEGORY_LABELS[project.category]}
          </div>
        </div>
        <span
          ref={arrowRef}
          className="mt-1 shrink-0 -translate-x-1 font-display text-xl text-foreground opacity-0"
          aria-hidden="true"
        >
          →
        </span>
      </div>

      <div
        ref={frameRef}
        className={`relative w-full overflow-hidden ${aspectClass}`}
      >
        <Image
          src={project.heroImage}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    </Link>
  );
}
