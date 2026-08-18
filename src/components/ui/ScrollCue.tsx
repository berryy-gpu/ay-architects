interface ScrollCueProps {
  prefersReducedMotion: boolean;
  /** Extra classes for positioning within the parent (e.g. dark vs light section defaults). */
  className?: string;
}

/**
 * Small looping "scroll down" affordance — a short vertical line that
 * gently travels and fades. Shared between the homepage Hero and the
 * /services hero rather than reimplemented per page. Reduced motion
 * renders the same mark statically, no animation.
 */
export function ScrollCue({ prefersReducedMotion, className = "" }: ScrollCueProps) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute bottom-8 left-1/2 hidden h-8 w-px -translate-x-1/2 bg-foreground-on-dark/50 sm:block ${className}`}
      style={
        prefersReducedMotion
          ? undefined
          : { animation: "scroll-cue 1.8s ease-in-out infinite" }
      }
    />
  );
}
