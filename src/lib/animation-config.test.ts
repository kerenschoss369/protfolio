import { afterEach, describe, expect, it, vi } from "vitest";

import { motionBudget } from "@/lib/animation-config";
import {
  projectCategoryTransitionName,
  projectTitleTransitionName,
  projectVisualTransitionName,
  viewTransitionNames,
} from "@/lib/view-transitions";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("animation-config", () => {
  it("keeps pointer depth and magnetic travel within budget", () => {
    expect(motionBudget.distances.pointerDepthMaxPx).toBeLessThanOrEqual(8);
    expect(motionBudget.distances.magneticPx).toBeLessThanOrEqual(4);
    expect(motionBudget.stagger.max).toBeLessThanOrEqual(0.28);
    expect(motionBudget.motionForReact).toBe(true);
  });
});

describe("view-transition names", () => {
  it("keeps project transition names unique per slug", () => {
    const a = projectTitleTransitionName("clinical-follow-up-detector");
    const b = projectTitleTransitionName("academease");
    expect(a).not.toBe(b);
    expect(a).toContain("clinical-follow-up-detector");
    expect(projectCategoryTransitionName("academease")).toContain("academease");
    expect(projectVisualTransitionName("taptap-avengers")).toContain(
      "taptap-avengers",
    );
    expect(viewTransitionNames.themeReveal()).toBe("ks-theme-reveal");
  });
});
