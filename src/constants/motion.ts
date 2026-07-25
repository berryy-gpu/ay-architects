/**
 * LoadingScreen's total runtime is frozen (see project decisions). Hero's own
 * entrance is timed off these values so it begins right as the loader
 * dissolves, without the two components referencing each other directly.
 */
export const LOADING_SCREEN_DURATION = 2;
export const LOADING_SCREEN_DURATION_REDUCED_MOTION = 0.7;
