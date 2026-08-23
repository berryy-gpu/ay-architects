"use client";

import { useEffect, useState } from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";

interface RotatingWordLineProps {
  prefix: string;
  /** Exactly 5 words — the shared word-scroll keyframe (globals.css) is sized for a 5-row loop. */
  words: string[];
  /** Smaller, quieter static line rendered below (e.g. a subhead). */
  suffix?: string;
  /** Controls both the section background and which accent color is safe for the rotating word — see the contrast note below. */
  tone: "dark" | "light";
  className?: string;
}

const CROSSFADE_INTERVAL_MS = 2500;

// Word-slot viewport: 3 row-heights tall so the active word centers with a
// sliver of its neighbors peeking in above/below, masked to fade toward
// transparent at the top/bottom edges — the "words scrolling past, fading
// with distance from center" effect. Track height/animation assumes
// exactly 5 words (see word-scroll in globals.css).
const ROW_HEIGHT_EM = 1.15;
const VISIBLE_ROWS = 3;
const SLOT_MASK =
  "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)";

// Gold (accent) only clears WCAG AA on a dark background (5.68:1); on the
// light background it drops to 2.02:1 and fails even the large-text 3:1
// minimum. Sage (accent-secondary) is the one palette color that clears
// 3:1 against the light background (3.75:1) at this component's heading-
// scale text, so it stands in for "the accented color" there instead —
// verified via the project's own contrast math, not assumed.
const TONE_STYLES = {
  dark: {
    section: "bg-background-dark",
    prefix: "text-foreground-on-dark",
    word: "text-accent",
  },
  light: {
    section: "bg-background",
    prefix: "text-foreground",
    word: "text-accent-secondary",
  },
} as const;

export function RotatingWordLine({
  prefix,
  words,
  suffix,
  tone,
  className = "",
}: RotatingWordLineProps) {
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [activeIndex, setActiveIndex] = useState(0);
  const styles = TONE_STYLES[tone];

  useEffect(() => {
    if (!prefersReducedMotion) return;
    const id = setInterval(
      () => setActiveIndex((current) => (current + 1) % words.length),
      CROSSFADE_INTERVAL_MS
    );
    return () => clearInterval(id);
  }, [prefersReducedMotion, words.length]);

  const longestWord = words.reduce((a, b) => (b.length > a.length ? b : a), "");
  const duplicatedWords = [...words, ...words];

  return (
    <section className={`${styles.section} px-8 py-20 text-center sm:px-12 md:px-16 md:py-24 ${className}`}>
      <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-display text-2xl sm:text-3xl md:text-4xl">
        <span className={styles.prefix}>{prefix}</span>

        {prefersReducedMotion ? (
          <span className="relative inline-block text-left align-middle">
            <span aria-hidden="true" className="invisible font-bold uppercase">
              {longestWord}
            </span>
            {words.map((word, i) => (
              <span
                key={word}
                aria-hidden="true"
                className={`absolute inset-0 font-bold uppercase transition-opacity duration-700 ease-out ${styles.word} ${
                  i === activeIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                {word}
              </span>
            ))}
          </span>
        ) : (
          <span
            aria-hidden="true"
            className="relative inline-block overflow-hidden align-middle"
            style={{
              height: `${ROW_HEIGHT_EM * VISIBLE_ROWS}em`,
              maskImage: SLOT_MASK,
              WebkitMaskImage: SLOT_MASK,
            }}
          >
            <span className="invisible block font-bold uppercase">{longestWord}</span>
            <span
              className="absolute inset-x-0 top-0 flex flex-col"
              style={{ animation: "word-scroll 14s linear infinite" }}
            >
              {duplicatedWords.map((word, i) => (
                <span
                  key={`${word}-${i}`}
                  className={`flex items-center justify-center font-bold uppercase ${styles.word}`}
                  style={{ height: `${ROW_HEIGHT_EM}em` }}
                >
                  {word}
                </span>
              ))}
            </span>
          </span>
        )}

        <span className="sr-only">
          {prefix} {words[0]}.
        </span>
      </p>

      {suffix && (
        <p className={`mt-4 font-sans text-xs uppercase tracking-[0.25em] sm:text-sm ${styles.prefix} opacity-70`}>
          {suffix}
        </p>
      )}
    </section>
  );
}
