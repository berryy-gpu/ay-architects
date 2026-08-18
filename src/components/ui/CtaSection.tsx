"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import { gsap } from "@/animations/gsap/gsap.config";
import { CTA_BUTTON_CLASSES } from "@/components/ui/ctaButtonClasses";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface CtaSectionProps {
  heading: string;
  copy: string;
  buttonLabel: string;
  buttonHref: string;
  buttonExternal?: boolean;
  /** Shorter variant for placements after other content (e.g. /contact) rather than a page's sole closing statement. */
  compact?: boolean;
  className?: string;
}

const GLOW_DAMPING = 0.08;

/**
 * The one shared closing-CTA background across the site (homepage, /services,
 * /contact) — a full-bleed dark base with two slow-drifting gradient blobs
 * (CSS keyframes, transform-only) plus, on hover-capable devices only, a
 * third glow layer that damped-follows the cursor via rAF-driven CSS custom
 * properties (never a snap, and never re-rendering React state per move).
 * Under prefers-reduced-motion the blobs skip their drift class entirely
 * (rendering the settled 0% frame) and the cursor-follow effect/listener is
 * never attached — the reduced-motion render is the final, static look.
 */
export function CtaSection({
  heading,
  copy,
  buttonLabel,
  buttonHref,
  buttonExternal = false,
  compact = false,
  className = "",
}: CtaSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: 50, y: 50 });
  const currentRef = useRef({ x: 50, y: 50 });
  const rafRef = useRef<number | null>(null);
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set("[data-cta-content]", { opacity: 1, y: 0 });
        return;
      }

      gsap.to("[data-cta-content]", {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: section, start: "top 80%", once: true },
      });
    }, section);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  useEffect(() => {
    const section = sectionRef.current;
    const glow = glowRef.current;
    if (!section || !glow) return;
    if (prefersReducedMotion) return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    function step() {
      const current = currentRef.current;
      const target = targetRef.current;
      current.x += (target.x - current.x) * GLOW_DAMPING;
      current.y += (target.y - current.y) * GLOW_DAMPING;
      glow!.style.setProperty("--glow-x", `${current.x}%`);
      glow!.style.setProperty("--glow-y", `${current.y}%`);
      rafRef.current = requestAnimationFrame(step);
    }

    function handleMove(event: PointerEvent) {
      const rect = section!.getBoundingClientRect();
      targetRef.current = {
        x: Math.min(100, Math.max(0, ((event.clientX - rect.left) / rect.width) * 100)),
        y: Math.min(100, Math.max(0, ((event.clientY - rect.top) / rect.height) * 100)),
      };
    }

    function handleLeave() {
      targetRef.current = { x: 50, y: 50 };
    }

    section.addEventListener("pointermove", handleMove);
    section.addEventListener("pointerleave", handleLeave);
    rafRef.current = requestAnimationFrame(step);

    return () => {
      section.removeEventListener("pointermove", handleMove);
      section.removeEventListener("pointerleave", handleLeave);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden bg-background-dark px-8 text-center sm:px-12 md:px-16 ${
        compact ? "py-20 md:py-24" : "py-28 md:py-36"
      } ${className}`}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className={`absolute -top-1/4 -left-1/4 h-[70%] w-[70%] rounded-full bg-accent/25 blur-[110px] ${
            prefersReducedMotion ? "" : "[animation:cta-drift-a_18s_ease-in-out_infinite]"
          }`}
        />
        <div
          className={`absolute -bottom-1/4 -right-1/4 h-[70%] w-[70%] rounded-full bg-accent-secondary/25 blur-[110px] ${
            prefersReducedMotion ? "" : "[animation:cta-drift-b_20s_ease-in-out_infinite]"
          }`}
        />
        {!prefersReducedMotion && (
          <div
            ref={glowRef}
            className="absolute inset-0 opacity-0 [@media(hover:hover)]:opacity-100"
            style={{
              background:
                "radial-gradient(circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(186,155,95,0.18), transparent 55%)",
            }}
          />
        )}
      </div>

      <div
        data-cta-content
        className="relative z-10 mx-auto flex max-w-2xl translate-y-4 flex-col items-center gap-6 opacity-0"
      >
        <h2 className="font-display text-3xl text-foreground-on-dark sm:text-4xl md:text-5xl">
          {heading}
        </h2>
        <p className="font-sans text-sm text-foreground-on-dark/75 sm:text-base">
          {copy}
        </p>
        {buttonExternal ? (
          <a
            href={buttonHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-2 ${CTA_BUTTON_CLASSES}`}
          >
            {buttonLabel}
          </a>
        ) : (
          <Link href={buttonHref} className={`mt-2 ${CTA_BUTTON_CLASSES}`}>
            {buttonLabel}
          </Link>
        )}
      </div>
    </section>
  );
}
