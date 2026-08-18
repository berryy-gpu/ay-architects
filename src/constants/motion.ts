/**
 * LoadingScreen's total runtime is frozen (see project decisions). Hero's own
 * entrance is timed off these values so it begins right as the loader
 * dissolves, without the two components referencing each other directly.
 */
export const LOADING_SCREEN_DURATION = 2;
export const LOADING_SCREEN_DURATION_REDUCED_MOTION = 0.7;

/**
 * Shared word/line-stagger reveal spec for the two "cinematic hero" moments
 * on the site (homepage Hero, /services hero) — one spec, used by both, so
 * they read as the same site rather than two independently-tuned ones.
 */
export const HERO_WORD_STAGGER_SECONDS = 0.06;
export const HERO_WORD_DURATION_SECONDS = 0.4;
export const HERO_WORD_TRAVEL_PX = 20;
export const HERO_WORD_EASE = "power3.out";
