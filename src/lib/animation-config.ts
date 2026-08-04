/**
 * Central motion configuration for the signature animation system.
 * Prefer these values over ad-hoc durations and springs.
 */

export const springs = {
  /** Spatial objects, nodes, indicators */
  spatial: { type: "spring" as const, stiffness: 380, damping: 32, mass: 0.8 },
  /** Soft layout reorganization */
  layout: { type: "spring" as const, stiffness: 320, damping: 34, mass: 0.9 },
  /** Combo / micro feedback */
  snappy: { type: "spring" as const, stiffness: 520, damping: 28, mass: 0.6 },
  /** Calm settle after pointer leave */
  settle: { type: "spring" as const, stiffness: 220, damping: 28, mass: 1 },
} as const;

export const durations = {
  instant: 0,
  micro: 0.12,
  fast: 0.2,
  base: 0.28,
  slow: 0.42,
  path: 0.9,
  sequence: 1.6,
} as const;

export const easings = {
  standard: [0.2, 0, 0, 1] as const,
  emphasized: [0.3, 0, 0, 1] as const,
  entrance: [0, 0, 0.2, 1] as const,
  exit: [0.4, 0, 1, 1] as const,
};

export const distances = {
  /** Editorial text mask reveal */
  textRevealRem: 1.1,
  /** Section / route settle */
  settleRem: 0.5,
  /** Microinteraction travel */
  microPx: 4,
  /** Pointer depth layers (fine pointer only) */
  pointerDepthMinPx: 4,
  pointerDepthMaxPx: 8,
  /** Magnetic CTA attraction cap */
  magneticPx: 4,
} as const;

export const stagger = {
  step: 0.06,
  max: 0.28,
  listMax: 0.18,
} as const;

export const scroll = {
  /** Sticky storytelling allowed only above this width */
  stickyMinWidthPx: 1024,
  progressThicknessPx: 2,
} as const;

export const motionBudget = {
  springs,
  durations,
  easings,
  distances,
  stagger,
  scroll,
  /** Documented dependency decision */
  motionForReact: true,
  packageName: "motion",
  /** Hero depth depth (CSS px) */
  heroParallaxPx: 6,
  themeTransitionMs: 420,
  routeEnterMs: 280,
  continuousLoopsMax: 3,
} as const;

export type MotionBudget = typeof motionBudget;
