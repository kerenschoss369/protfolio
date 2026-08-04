/**
 * Motion foundations — signature animation phase.
 * CSS remains primary for simple transitions; Motion for React handles
 * springs, shared layout, and coordinated choreography in Client Components.
 */

import { motionBudget as signatureBudget } from "@/lib/animation-config";

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

/** Motion budget — CSS tokens + signature Motion for React limits. */
export const motionBudget = {
  revealOffsetRem: 0.75,
  staggerStepMs: 60,
  staggerMaxMs: 280,
  themeTransitionMs: signatureBudget.themeTransitionMs,
  routeEnterMs: signatureBudget.routeEnterMs,
  heroParallaxPx: signatureBudget.heroParallaxPx,
  pointerDepthMaxPx: signatureBudget.distances.pointerDepthMaxPx,
  continuousLoopsMax: signatureBudget.continuousLoopsMax,
  motionForReact: true,
  packageName: "motion",
} as const;

export function getReducedMotionMediaQuery(): string {
  return "(prefers-reduced-motion: reduce)";
}

export function prefersReducedMotion(
  media: Pick<MediaQueryList, "matches"> | null | undefined = getMotionMedia(),
): boolean {
  if (!media) {
    return false;
  }

  return media.matches;
}

function getMotionMedia(): MediaQueryList | null {
  if (typeof window === "undefined") {
    return null;
  }

  return window.matchMedia(getReducedMotionMediaQuery());
}

export function subscribeReducedMotion(onStoreChange: () => void): () => void {
  const media = getMotionMedia();
  if (!media) {
    return () => undefined;
  }

  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

export function getReducedMotionSnapshot(): boolean {
  return prefersReducedMotion();
}

export function getServerReducedMotionSnapshot(): boolean {
  return false;
}

export function supportsViewTransitions(
  doc:
    | Pick<Document, "startViewTransition">
    | null
    | undefined = typeof document === "undefined" ? null : document,
): boolean {
  return typeof doc?.startViewTransition === "function";
}

type ViewTransitionRunner = {
  startViewTransition: (callback: () => void | Promise<void>) => {
    finished: Promise<void>;
  };
};

/**
 * Runs an update inside the View Transitions API when supported and motion is allowed.
 * Falls back to an immediate callback otherwise. Never blocks navigation on failure.
 */
export function runViewTransition(
  update: () => void | Promise<void>,
  options?: {
    reducedMotion?: boolean;
    doc?: ViewTransitionRunner | null;
  },
): void {
  const reduced =
    options?.reducedMotion ?? prefersReducedMotion(getMotionMedia());
  const doc =
    options?.doc ??
    (typeof document === "undefined"
      ? null
      : (document as unknown as ViewTransitionRunner));

  if (reduced || !doc || typeof doc.startViewTransition !== "function") {
    void update();
    return;
  }

  try {
    doc.startViewTransition(() => update());
  } catch {
    void update();
  }
}

export function getFinePointerMediaQuery(): string {
  return "(pointer: fine)";
}

export function prefersFinePointer(
  media: Pick<MediaQueryList, "matches"> | null | undefined = typeof window ===
  "undefined"
    ? null
    : window.matchMedia(getFinePointerMediaQuery()),
): boolean {
  if (!media) {
    return false;
  }

  return media.matches;
}
