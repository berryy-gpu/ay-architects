"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";

interface AutoplayVideoProps {
  src: string;
  poster: string;
  sizes?: string;
  className?: string;
}

/**
 * Muted, looping video that only actually plays while it's genuinely in
 * view and the tab is visible — an IntersectionObserver + the Page
 * Visibility API gate real playback rather than relying on the `autoplay`
 * attribute alone. `preload="none"` plus starting paused means nothing is
 * fetched until it first scrolls into view, so this never competes with LCP.
 * Under prefers-reduced-motion the video element isn't rendered at all —
 * the poster frame renders as a plain static image instead, matching the
 * site's "reduced motion -> instant final state" convention.
 */
export function AutoplayVideo({
  src,
  poster,
  sizes = "100vw",
  className = "",
}: AutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInViewRef = useRef(false);
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );

  useEffect(() => {
    if (prefersReducedMotion) return;

    const video = videoRef.current;
    if (!video) return;

    function syncPlayback() {
      if (isInViewRef.current && !document.hidden) {
        video!.play().catch(() => {});
      } else {
        video!.pause();
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
        syncPlayback();
      },
      { threshold: 0.25 }
    );
    observer.observe(video);
    document.addEventListener("visibilitychange", syncPlayback);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <Image
        src={poster}
        alt=""
        aria-hidden="true"
        fill
        sizes={sizes}
        className={`object-cover ${className}`}
      />
    );
  }

  return (
    <video
      ref={videoRef}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
    />
  );
}
