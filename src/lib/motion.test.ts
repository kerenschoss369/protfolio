import { afterEach, describe, expect, it, vi } from "vitest";

import {
  motionBudget,
  prefersFinePointer,
  prefersReducedMotion,
  runViewTransition,
  supportsViewTransitions,
} from "@/lib/motion";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("motion utilities", () => {
  it("includes Motion for React in the signature budget", () => {
    expect(motionBudget.motionForReact).toBe(true);
    expect(motionBudget.packageName).toBe("motion");
    expect(motionBudget.staggerMaxMs).toBeLessThanOrEqual(280);
    expect(motionBudget.heroParallaxPx).toBeLessThanOrEqual(8);
  });

  it("detects reduced motion from a media query snapshot", () => {
    expect(prefersReducedMotion({ matches: true })).toBe(true);
    expect(prefersReducedMotion({ matches: false })).toBe(false);
    expect(prefersReducedMotion(null)).toBe(false);
  });

  it("detects fine pointer from a media query snapshot", () => {
    expect(prefersFinePointer({ matches: true })).toBe(true);
    expect(prefersFinePointer({ matches: false })).toBe(false);
    expect(prefersFinePointer(null)).toBe(false);
  });

  it("feature-detects View Transitions without throwing", () => {
    expect(supportsViewTransitions(null)).toBe(false);
    expect(
      supportsViewTransitions({
        startViewTransition: () => ({ finished: Promise.resolve() }),
      } as never),
    ).toBe(true);
  });

  it("runs view transitions when supported and motion is allowed", () => {
    const update = vi.fn();
    const startViewTransition = vi.fn((callback: () => void) => {
      callback();
      return { finished: Promise.resolve() };
    });

    runViewTransition(update, {
      reducedMotion: false,
      doc: { startViewTransition },
    });

    expect(startViewTransition).toHaveBeenCalledTimes(1);
    expect(update).toHaveBeenCalledTimes(1);
  });

  it("falls back immediately under reduced motion", () => {
    const update = vi.fn();
    const startViewTransition = vi.fn();

    runViewTransition(update, {
      reducedMotion: true,
      doc: { startViewTransition },
    });

    expect(startViewTransition).not.toHaveBeenCalled();
    expect(update).toHaveBeenCalledTimes(1);
  });

  it("falls back when startViewTransition throws", () => {
    const update = vi.fn();
    const startViewTransition = vi.fn(() => {
      throw new Error("unsupported");
    });

    runViewTransition(update, {
      reducedMotion: false,
      doc: { startViewTransition },
    });

    expect(update).toHaveBeenCalledTimes(1);
  });
});
