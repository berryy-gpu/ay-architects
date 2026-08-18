/**
 * Shared CTA button treatment — used by CtaSection, ContactForm's submit
 * button, and anywhere else a primary action button appears. One definition
 * so the hover polish (scale + brightness, desktop-only) stays consistent
 * everywhere instead of drifting per usage.
 */
export const CTA_BUTTON_CLASSES =
  "inline-flex items-center rounded-full bg-accent px-8 py-3 font-sans text-xs uppercase tracking-[0.25em] text-foreground transition-[transform,filter] duration-[220ms] ease-out [@media(hover:hover)]:hover:scale-[1.04] [@media(hover:hover)]:hover:brightness-110";
