/**
 * Motion foundations for later phases.
 * Prefer CSS custom properties; keep JS helpers aligned with tokens.css.
 */

export const motionPreferences = {
  respectReducedMotion: true,
} as const;

export const motionDurations = {
  instant: "var(--duration-instant)",
  fast: "var(--duration-fast)",
  base: "var(--duration-base)",
  slow: "var(--duration-slow)",
} as const;

export const motionEasing = {
  standard: "var(--ease-standard)",
  emphasized: "var(--ease-emphasized)",
  entrance: "var(--ease-entrance)",
  exit: "var(--ease-exit)",
} as const;

export function getReducedMotionMediaQuery(): string {
  return "(prefers-reduced-motion: reduce)";
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia(getReducedMotionMediaQuery()).matches;
}
