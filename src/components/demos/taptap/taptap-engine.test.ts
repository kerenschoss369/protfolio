import { describe, expect, it } from "vitest";

import {
  createInitialRhythmState,
  judgeTiming,
  rhythmChart,
  rhythmReducer,
} from "@/components/demos/taptap/taptap-engine";

describe("taptap rhythm engine", () => {
  it("judges timing windows", () => {
    expect(judgeTiming(0)).toBe("Perfect");
    expect(judgeTiming(80)).toBe("Perfect");
    expect(judgeTiming(120)).toBe("Good");
    expect(judgeTiming(250)).toBe("Miss");
  });

  it("starts, scores hits, tracks combo, and completes", () => {
    let state = rhythmReducer(createInitialRhythmState(false), {
      type: "start",
    });
    expect(state.phase).toBe("running");

    const first = rhythmChart[0];
    expect(first).toBeDefined();
    state = rhythmReducer(state, { type: "hit", atMs: first!.at, lane: 0 });
    expect(state.lastJudgement).toBe("Perfect");
    expect(state.score).toBeGreaterThan(0);
    expect(state.combo).toBe(1);

    state = rhythmReducer(state, { type: "pause" });
    expect(state.phase).toBe("paused");
    state = rhythmReducer(state, { type: "resume" });
    expect(state.phase).toBe("running");

    // Miss far from any note
    state = rhythmReducer(state, { type: "hit", atMs: 99999 });
    expect(state.lastJudgement).toBe("Miss");
    expect(state.combo).toBe(0);
    expect(state.judgements.Miss).toBeGreaterThan(0);
  });

  it("resets and supports reduced-motion step mode", () => {
    let state = rhythmReducer(createInitialRhythmState(true), {
      type: "start",
    });
    expect(state.reducedMotion).toBe(true);
    state = rhythmReducer(state, { type: "step-hit" });
    expect(state.lastJudgement).toBe("Perfect");
    expect(state.stepIndex).toBe(1);

    state = rhythmReducer(state, { type: "reset" });
    expect(state.phase).toBe("idle");
    expect(state.score).toBe(0);
    expect(state.resolved.size).toBe(0);
  });

  it("auto-misses overdue notes on tick and completes the chart", () => {
    let state = rhythmReducer(createInitialRhythmState(false), {
      type: "start",
    });
    state = rhythmReducer(state, { type: "tick", elapsedMs: 9000 });
    expect(state.phase).toBe("completed");
    expect(state.resolved.size).toBe(rhythmChart.length);
    expect(state.judgements.Miss).toBe(rhythmChart.length);
  });
});
