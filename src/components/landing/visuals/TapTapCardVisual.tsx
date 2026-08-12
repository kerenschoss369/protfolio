"use client";

import {
  useEffect,
  useReducer,
  useRef,
  type KeyboardEvent,
} from "react";

import {
  createInitialRhythmState,
  HIT_KEYS,
  rhythmChart,
  rhythmReducer,
  SEQUENCE_END_MS,
} from "@/components/demos/taptap/taptap-engine";
import { cn } from "@/lib/cn";
import { getReducedMotionMediaQuery } from "@/lib/motion";

export function TapTapCardVisual() {
  const [state, dispatch] = useReducer(rhythmReducer, undefined, () =>
    createInitialRhythmState(false),
  );
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const playAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia(getReducedMotionMediaQuery());
    const sync = () =>
      dispatch({ type: "configure", reducedMotion: media.matches });
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (state.phase !== "running" || state.reducedMotion) {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }

    const tick = (now: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = now;
      }
      const elapsed = now - startTimeRef.current;
      dispatch({ type: "tick", elapsedMs: elapsed });
      if (elapsed < SEQUENCE_END_MS + 300) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [state.phase, state.reducedMotion]);

  function start() {
    startTimeRef.current = null;
    dispatch({ type: "start" });
    playAreaRef.current?.focus();
  }

  function reset() {
    startTimeRef.current = null;
    dispatch({ type: "reset" });
  }

  function hit(lane?: 0 | 1) {
    if (state.phase !== "running") return;
    if (state.reducedMotion) {
      dispatch({ type: "step-hit" });
      return;
    }
    dispatch({ type: "hit", atMs: state.elapsedMs, lane });
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const key = event.key.toLowerCase();
    if (
      event.key === HIT_KEYS.primary ||
      event.key === HIT_KEYS.secondary ||
      key === HIT_KEYS.letter
    ) {
      event.preventDefault();
      hit(key === HIT_KEYS.letter ? 1 : 0);
    }
  }

  return (
    <div className="flex h-full flex-col gap-3 rounded-[28px] border border-[#D7E2EA]/25 bg-[#121212] p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[10px] font-medium tracking-widest text-[#D7E2EA]/55 uppercase">
          Rhythm timing · silent preview
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={start}
            disabled={state.phase === "running"}
            className="rounded-full border border-[#D7E2EA]/30 px-3 py-1 text-[10px] tracking-widest uppercase disabled:opacity-40"
          >
            Start
          </button>
          <button
            type="button"
            onClick={reset}
            className="rounded-full border border-[#D7E2EA]/30 px-3 py-1 text-[10px] tracking-widest uppercase"
          >
            Reset
          </button>
        </div>
      </div>

      <div
        ref={playAreaRef}
        tabIndex={0}
        role="application"
        aria-label="Rhythm timing play area. Press space or click to hit notes."
        onKeyDown={onKeyDown}
        onPointerDown={() => hit(0)}
        className="relative min-h-[160px] flex-1 overflow-hidden rounded-2xl border border-[#D7E2EA]/15 bg-[#0C0C0C] outline-none focus-visible:ring-2 focus-visible:ring-[#D7E2EA]/50"
      >
        <div className="absolute inset-x-6 top-1/2 h-px -translate-y-1/2 bg-[#D7E2EA]/35" />
        <div className="absolute top-1/2 left-8 size-4 -translate-y-1/2 rounded-full border-2 border-[#D7E2EA]" />
        {!state.reducedMotion &&
          rhythmChart.map((note) => {
            if (state.resolved.has(note.id)) return null;
            const progress = Math.min(
              1,
              Math.max(0, (state.elapsedMs - (note.at - 1200)) / 1200),
            );
            if (progress <= 0 || progress > 1) return null;
            return (
              <span
                key={note.id}
                className="absolute size-3 -translate-y-1/2 rounded-full bg-[#D7E2EA]"
                style={{
                  left: `${8 + progress * 78}%`,
                  top: note.lane === 0 ? "42%" : "58%",
                }}
              />
            );
          })}
        {state.lastJudgement ? (
          <p
            className={cn(
              "absolute right-4 bottom-4 text-sm font-medium tracking-widest uppercase",
              state.lastJudgement === "Perfect" && "text-[#BBCCD7]",
              state.lastJudgement === "Good" && "text-[#D7E2EA]/80",
              state.lastJudgement === "Miss" && "text-[#D7E2EA]/45",
            )}
          >
            {state.lastJudgement}
          </p>
        ) : null}
      </div>

      <div className="flex items-center justify-between text-xs tracking-widest text-[#D7E2EA]/60 uppercase">
        <span>Score {state.score}</span>
        <span>Combo {state.combo}</span>
      </div>
    </div>
  );
}
