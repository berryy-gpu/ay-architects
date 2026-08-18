"use client";

import { useEffect, useRef, useState } from "react";

import { gsap } from "@/animations/gsap/gsap.config";
import { FAQ_ITEMS } from "@/config/services";
import { useMediaQuery } from "@/hooks/useMediaQuery";

// FAQ_ITEMS' answers are drafted placeholders pending the outstanding
// studio content brief — see src/config/services.ts. Do not replace them
// with invented specifics.

interface FaqRowProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FaqRow({ question, answer, isOpen, onToggle }: FaqRowProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    if (prefersReducedMotion) {
      gsap.set(panel, { height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 });
      return;
    }

    if (isOpen) {
      gsap.set(panel, { height: "auto" });
      const fullHeight = panel.offsetHeight;
      gsap.fromTo(
        panel,
        { height: 0, opacity: 0 },
        { height: fullHeight, opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    } else {
      gsap.to(panel, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [isOpen, prefersReducedMotion]);

  return (
    <div className="border-t border-accent-secondary/20 py-6 first:border-t-0 first:pt-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-6 text-left font-display text-lg text-foreground sm:text-xl"
      >
        {question}
        <span
          aria-hidden="true"
          className={`shrink-0 font-sans text-xl text-foreground transition-transform duration-300 ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      <div ref={panelRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
        <p className="max-w-2xl pt-4 font-sans text-sm leading-relaxed text-foreground/80">
          {answer}
        </p>
      </div>
    </div>
  );
}

export function ServicesFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-background px-8 py-24 sm:px-12 md:px-16 md:py-32">
      <p className="font-sans text-xs uppercase tracking-[0.3em] text-foreground/70">
        FAQ
      </p>

      <div className="mt-10 max-w-3xl">
        {FAQ_ITEMS.map((item, index) => (
          <FaqRow
            key={item.question}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === index}
            onToggle={() =>
              setOpenIndex((current) => (current === index ? null : index))
            }
          />
        ))}
      </div>
    </section>
  );
}
