/**
 * Silent rhythm timing model for TapTap portfolio simulation.
 * No audio, no copyrighted assets, deterministic note chart.
 */

export type HitJudgement = "Perfect" | "Good" | "Miss";

export type RhythmNote = {
  id: string;
  /** Beat time in ms from sequence start. */
  at: number;
  lane: 0 | 1;
};

export type RhythmPhase = "idle" | "running" | "paused" | "completed";

export type RhythmState = {
  phase: RhythmPhase;
  score: number;
  combo: number;
  maxCombo: number;
  judgements: Record<HitJudgement, number>;
  /** Indices already judged (hit or auto-missed). */
  resolved: ReadonlySet<string>;
  lastJudgement: HitJudgement | null;
  elapsedMs: number;
  reducedMotion: boolean;
  /** Step mode: current note index awaiting reaction. */
  stepIndex: number;
};

export type RhythmAction =
  | { type: "configure"; reducedMotion: boolean }
  | { type: "start" }
  | { type: "pause" }
  | { type: "resume" }
  | { type: "reset" }
  | { type: "tick"; elapsedMs: number }
  | { type: "hit"; atMs: number; lane?: 0 | 1 }
  | { type: "step-hit" };

/** Short deterministic chart (~8 notes, ~6 seconds). */
export const rhythmChart: readonly RhythmNote[] = [
  { id: "n1", at: 800, lane: 0 },
  { id: "n2", at: 1400, lane: 1 },
  { id: "n3", at: 2000, lane: 0 },
  { id: "n4", at: 2600, lane: 1 },
  { id: "n5", at: 3200, lane: 0 },
  { id: "n6", at: 3800, lane: 1 },
  { id: "n7", at: 4500, lane: 0 },
  { id: "n8", at: 5200, lane: 1 },
] as const;

export const PERFECT_WINDOW_MS = 90;
export const GOOD_WINDOW_MS = 180;
export const MISS_AFTER_MS = 220;
export const SEQUENCE_END_MS = 5800;

export const HIT_KEYS = {
  primary: " ",
  secondary: "Enter",
  letter: "f",
} as const;

export function createInitialRhythmState(reducedMotion = false): RhythmState {
  return {
    phase: "idle",
    score: 0,
    combo: 0,
    maxCombo: 0,
    judgements: { Perfect: 0, Good: 0, Miss: 0 },
    resolved: new Set(),
    lastJudgement: null,
    elapsedMs: 0,
    reducedMotion,
    stepIndex: 0,
  };
}

function withJudgement(
  state: RhythmState,
  noteId: string,
  judgement: HitJudgement,
): RhythmState {
  const resolved = new Set(state.resolved);
  resolved.add(noteId);

  const judgements = {
    ...state.judgements,
    [judgement]: state.judgements[judgement] + 1,
  };

  const combo = judgement === "Miss" ? 0 : state.combo + 1;
  const scoreDelta =
    judgement === "Perfect" ? 100 : judgement === "Good" ? 50 : 0;

  const next: RhythmState = {
    ...state,
    judgements,
    resolved,
    lastJudgement: judgement,
    combo,
    maxCombo: Math.max(state.maxCombo, combo),
    score:
      state.score +
      scoreDelta +
      (combo > 1 && judgement !== "Miss" ? combo * 2 : 0),
  };

  if (resolved.size >= rhythmChart.length) {
    return { ...next, phase: "completed" };
  }

  return next;
}

export function judgeTiming(deltaMs: number): HitJudgement {
  const abs = Math.abs(deltaMs);
  if (abs <= PERFECT_WINDOW_MS) return "Perfect";
  if (abs <= GOOD_WINDOW_MS) return "Good";
  return "Miss";
}

export function findNearestUnresolvedNote(
  elapsedMs: number,
  resolved: ReadonlySet<string>,
  lane?: 0 | 1,
): RhythmNote | null {
  let best: RhythmNote | null = null;
  let bestDelta = Number.POSITIVE_INFINITY;

  for (const note of rhythmChart) {
    if (resolved.has(note.id)) continue;
    if (lane !== undefined && note.lane !== lane) continue;
    const delta = Math.abs(note.at - elapsedMs);
    if (delta < bestDelta) {
      best = note;
      bestDelta = delta;
    }
  }

  if (!best || bestDelta > GOOD_WINDOW_MS + 40) {
    return null;
  }

  return best;
}

export function rhythmReducer(
  state: RhythmState,
  action: RhythmAction,
): RhythmState {
  switch (action.type) {
    case "configure":
      return { ...state, reducedMotion: action.reducedMotion };
    case "start":
      return {
        ...createInitialRhythmState(state.reducedMotion),
        phase: "running",
        reducedMotion: state.reducedMotion,
      };
    case "pause":
      if (state.phase !== "running") return state;
      return { ...state, phase: "paused" };
    case "resume":
      if (state.phase !== "paused") return state;
      return { ...state, phase: "running" };
    case "reset":
      return createInitialRhythmState(state.reducedMotion);
    case "tick": {
      if (state.phase !== "running" || state.reducedMotion) {
        return state;
      }

      let next = { ...state, elapsedMs: action.elapsedMs };

      for (const note of rhythmChart) {
        if (next.resolved.has(note.id)) continue;
        if (action.elapsedMs - note.at > MISS_AFTER_MS) {
          next = withJudgement(next, note.id, "Miss");
        }
      }

      if (
        next.phase === "running" &&
        action.elapsedMs >= SEQUENCE_END_MS &&
        next.resolved.size >= rhythmChart.length
      ) {
        return { ...next, phase: "completed" };
      }

      if (next.phase === "running" && action.elapsedMs >= SEQUENCE_END_MS) {
        // Auto-miss remaining
        for (const note of rhythmChart) {
          if (!next.resolved.has(note.id)) {
            next = withJudgement(next, note.id, "Miss");
          }
        }
      }

      return next;
    }
    case "hit": {
      if (state.phase !== "running" || state.reducedMotion) return state;
      const note = findNearestUnresolvedNote(
        action.atMs,
        state.resolved,
        action.lane,
      );
      if (!note) {
        return {
          ...state,
          lastJudgement: "Miss",
          combo: 0,
          judgements: {
            ...state.judgements,
            Miss: state.judgements.Miss + 1,
          },
        };
      }
      const judgement = judgeTiming(action.atMs - note.at);
      return withJudgement(state, note.id, judgement);
    }
    case "step-hit": {
      if (state.phase !== "running" || !state.reducedMotion) return state;
      const note = rhythmChart[state.stepIndex];
      if (!note) {
        return { ...state, phase: "completed" };
      }
      // Step mode: each intentional hit is Perfect for accessibility.
      const judged = withJudgement(state, note.id, "Perfect");
      return {
        ...judged,
        stepIndex: state.stepIndex + 1,
        elapsedMs: note.at,
      };
    }
    default:
      return state;
  }
}
