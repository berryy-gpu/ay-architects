"use client";

import { useEffect, useState } from "react";

import { WatermarkedImage } from "@/components/ui/WatermarkedImage";
import { getImageDimensions } from "@/data/portfolio/imageDimensions";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface ProjectImageSliderProps {
  images: string[];
  title: string;
  className?: string;
}

/**
 * The project-detail hero image. Renders each photo at its own real aspect
 * ratio (never a forced crop box), capped by a max-height so a tall photo
 * never overflows the viewport. Prev/next are large, mostly-invisible click
 * zones reserved in the padding flanking the image — not small buttons
 * glued to its edge — matching the measured reference. A single-image
 * project renders with no controls and no reserved padding at all.
 */
export function ProjectImageSlider({
  images,
  title,
  className = "",
}: ProjectImageSliderProps) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const hasMultiple = images.length > 1;
  const dims = getImageDimensions(images[index]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    setVisible(false);
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    return () => cancelAnimationFrame(id);
  }, [index, prefersReducedMotion]);

  function goTo(next: number) {
    const total = images.length;
    setIndex(((next % total) + total) % total);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (!hasMultiple) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(index - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(index + 1);
    }
  }

  return (
    <div
      data-detail-hero
      className={`relative w-full ${className}`}
      tabIndex={hasMultiple ? 0 : undefined}
      role={hasMultiple ? "group" : undefined}
      aria-roledescription={hasMultiple ? "carousel" : undefined}
      aria-label={hasMultiple ? `${title} photos` : undefined}
      onKeyDown={handleKeyDown}
    >
      <div className="flex items-center justify-center">
        <div
          className={
            prefersReducedMotion
              ? "relative"
              : `relative transition-[opacity,transform] duration-500 ease-out ${
                  visible ? "scale-100 opacity-100" : "scale-[1.02] opacity-0"
                }`
          }
        >
          <WatermarkedImage
            src={images[index]}
            alt={`${title} — photo ${index + 1} of ${images.length}`}
            width={dims.width}
            height={dims.height}
            priority={index === 0}
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="h-auto max-h-[70vh] w-auto max-w-full object-contain sm:max-h-[78vh]"
          />
        </div>
      </div>

      {hasMultiple && (
        <>
          {/* Desktop: large, mostly-invisible click zones just outside the
              image's edges, not overlapping it (matches the measured
              ~78x94px reference zones). Mobile/tablet, where there's no
              room outside the image: small buttons at its own corners. */}
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Previous photo"
            className="group/nav absolute left-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/70 backdrop-blur-sm lg:-left-[94px] lg:h-[94px] lg:w-[78px] lg:rounded-none lg:bg-transparent lg:backdrop-blur-none"
          >
            <span
              aria-hidden="true"
              className="font-display text-xl text-foreground transition-opacity duration-300 lg:text-2xl lg:opacity-0 lg:[@media(hover:hover)]:group-hover/nav:opacity-60"
            >
              ←
            </span>
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Next photo"
            className="group/nav absolute right-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/70 backdrop-blur-sm lg:-right-[94px] lg:h-[94px] lg:w-[78px] lg:rounded-none lg:bg-transparent lg:backdrop-blur-none"
          >
            <span
              aria-hidden="true"
              className="font-display text-xl text-foreground transition-opacity duration-300 lg:text-2xl lg:opacity-0 lg:[@media(hover:hover)]:group-hover/nav:opacity-60"
            >
              →
            </span>
          </button>

          <div className="mt-4 text-center font-sans text-[11px] uppercase tracking-[0.2em] text-foreground/50">
            {index + 1} / {images.length}
          </div>
          <div aria-live="polite" className="sr-only">
            Image {index + 1} of {images.length}
          </div>
        </>
      )}
    </div>
  );
}
