"use client";

import {
  useEffect,
  useId,
  useReducer,
  useRef,
  type KeyboardEvent,
} from "react";

import {
  DemoControls,
  DemoFrame,
  DemoHeader,
  DemoStatus,
  ReducedMotionFallback,
  SimulationNotice,
} from "@/components/demos/shared";
import {
  createInitialRhythmState,
  HIT_KEYS,
  rhythmChart,
  rhythmReducer,
  SEQUENCE_END_MS,
  type HitJudgement,
} from "@/components/demos/taptap/taptap-engine";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/cn";
import { getReducedMotionMediaQuery } from "@/lib/motion";

function judgementVariant(
  judgement: HitJudgement,
): "success" | "warning" | "danger" {
  if (judgement === "Perfect") return "success";
  if (judgement === "Good") return "warning";
  return "danger";
}

export function TapTapDemo() {
  const titleId = useId();
  const descriptionId = useId();
  const [state, dispatch] = useReducer(rhythmReducer, undefined, () =>
    createInitialRhythmState(false),
  );
  const startTimeRef = useRef<number | null>(null);
  const pausedAtRef = useRef<number>(0);
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
        startTimeRef.current = now - pausedAtRef.current;
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

  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden && state.phase === "running") {
        pausedAtRef.current = state.elapsedMs;
        startTimeRef.current = null;
        dispatch({ type: "pause" });
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [state.phase, state.elapsedMs]);

  function handleStart() {
    startTimeRef.current = null;
    pausedAtRef.current = 0;
    dispatch({ type: "start" });
    playAreaRef.current?.focus();
  }

  function handlePause() {
    if (state.phase === "running") {
      pausedAtRef.current = state.elapsedMs;
      startTimeRef.current = null;
      dispatch({ type: "pause" });
    } else if (state.phase === "paused") {
      dispatch({ type: "resume" });
    }
  }

  function handleReset() {
    startTimeRef.current = null;
    pausedAtRef.current = 0;
    dispatch({ type: "reset" });
  }

  function triggerHit(lane?: 0 | 1) {
    if (state.phase !== "running") return;
    if (state.reducedMotion) {
      dispatch({ type: "step-hit" });
      return;
    }
    dispatch({ type: "hit", atMs: state.elapsedMs, lane });
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const key = event.key.toLowerCase();
    if (
      event.key === HIT_KEYS.primary ||
      event.key === HIT_KEYS.secondary ||
      key === HIT_KEYS.letter
    ) {
      event.preventDefault();
      triggerHit(key === HIT_KEYS.letter ? 1 : 0);
    }
  }

  // Visual status may include timing detail; live region stays stable to avoid AT spam.
  const visualStatus =
    state.phase === "idle"
      ? "Ready — review controls, then start"
      : state.phase === "paused"
        ? "Paused"
        : state.phase === "completed"
          ? `Completed · score ${state.score} · max combo ${state.maxCombo}`
          : state.reducedMotion
            ? `Step ${state.stepIndex + 1} of ${rhythmChart.length}`
            : `Playing · ${Math.round(state.elapsedMs)} ms`;

  const announcedStatus =
    state.phase === "idle"
      ? "Ready — review controls, then start"
      : state.phase === "paused"
        ? "Paused"
        : state.phase === "completed"
          ? `Completed · score ${state.score} · max combo ${state.maxCombo}`
          : state.reducedMotion
            ? `Step ${state.stepIndex + 1} of ${rhythmChart.length}`
            : state.lastJudgement
              ? state.lastJudgement
              : "Playing";

  return (
    <DemoFrame
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      minHeightClassName="min-h-[34rem]"
      className="bg-[linear-gradient(200deg,var(--surface-2),color-mix(in_srgb,var(--accent)_8%,var(--background))_50%,var(--background))]"
    >
      <div className="space-y-4 p-4 sm:p-5">
        <SimulationNotice
          label="Silent portfolio rhythm exercise inspired by TapTap mechanics — not the original complete game."
          details={[
            "No copyrighted music",
            "No Marvel characters or artwork",
            "No autoplay audio",
            "No multiplayer",
          ]}
        />

        <DemoHeader
          title="TapTap timing simulation"
          titleId={titleId}
          description="A short deterministic visual rhythm sequence with keyboard and touch controls."
          descriptionId={descriptionId}
        />

        <div className="border-border-subtle space-y-2 rounded-[var(--radius-md)] border p-3">
          <Text variant="meta" className="text-muted">
            Controls before start
          </Text>
          <ul className="space-y-1 text-[length:var(--text-sm)]">
            <li>
              Keyboard: <kbd className="font-mono">Space</kbd>,{" "}
              <kbd className="font-mono">Enter</kbd>, or letter{" "}
              <kbd className="font-mono">F</kbd>
            </li>
            <li>Touch: tap the Hit control or a lane target</li>
            <li>Feedback: Perfect, Good, Miss — also shown as text tags</li>
          </ul>
        </div>

        {state.reducedMotion ? (
          <ReducedMotionFallback
            title="Reduced-motion mode"
            description="Notes do not travel rapidly. Advance the sequence one step at a time with Hit — each intentional response counts as Perfect so timing remains understandable without motion."
          />
        ) : null}

        <DemoControls label="Playback controls" className="gap-2">
          <Button
            type="button"
            onClick={handleStart}
            disabled={state.phase === "running"}
          >
            Start
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={handlePause}
            disabled={state.phase !== "running" && state.phase !== "paused"}
          >
            {state.phase === "paused" ? "Resume" : "Pause"}
          </Button>
          <Button type="button" variant="ghost" onClick={handleReset}>
            Reset
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => triggerHit()}
            disabled={state.phase !== "running"}
          >
            Hit
          </Button>
        </DemoControls>

        <div
          className="flex flex-wrap items-center gap-3"
          aria-label="Score and combo"
        >
          <Tag variant="default">Score {state.score}</Tag>
          <Tag variant="accent">Combo {state.combo}</Tag>
          <Tag variant="steel">Max {state.maxCombo}</Tag>
          {state.lastJudgement ? (
            <Tag variant={judgementVariant(state.lastJudgement)}>
              {state.lastJudgement}
            </Tag>
          ) : null}
        </div>

        <div
          ref={playAreaRef}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className={cn(
            "border-border-strong bg-background relative min-h-[14rem] overflow-hidden rounded-[var(--radius-md)] border p-4 outline-none",
            "focus-visible:outline-focus-ring focus-visible:outline focus-visible:outline-[length:var(--focus-ring-width)] focus-visible:outline-offset-[var(--focus-ring-offset)]",
          )}
          aria-label="Rhythm play area. Focus here for keyboard hits."
          role="application"
        >
          <div
            aria-hidden
            className="border-accent/50 absolute inset-x-4 top-1/2 border-t-2 border-dashed"
          />

          <div className="relative grid h-48 grid-cols-2 gap-4 sm:gap-8">
            {([0, 1] as const).map((lane) => (
              <button
                key={lane}
                type="button"
                disabled={state.phase !== "running"}
                onClick={() => triggerHit(lane)}
                className={cn(
                  "relative flex min-h-[var(--touch-target)] flex-col items-center justify-end rounded-[var(--radius-md)] border border-transparent pb-2",
                  "focus-visible:outline-focus-ring focus-visible:outline focus-visible:outline-[length:var(--focus-ring-width)] focus-visible:outline-offset-[var(--focus-ring-offset)]",
                  "hover:bg-surface-1/60 disabled:cursor-not-allowed",
                )}
                aria-label={`Lane ${lane + 1} hit`}
              >
                {rhythmChart
                  .filter((note) => note.lane === lane)
                  .map((note) => {
                    if (state.resolved.has(note.id)) return null;

                    if (state.reducedMotion) {
                      const current = rhythmChart[state.stepIndex];
                      if (current?.id !== note.id) return null;
                      return (
                        <span
                          key={note.id}
                          className="border-accent bg-accent-muted absolute top-1/2 size-10 -translate-y-1/2 rounded-full border-2 sm:size-12"
                        />
                      );
                    }

                    const travel = 180;
                    const progress = (note.at - state.elapsedMs) / 1200;
                    const y = 20 + progress * travel;
                    if (y < -40 || y > 220) return null;

                    return (
                      <span
                        key={note.id}
                        className="border-border-strong absolute size-9 rounded-full border-2 bg-[color-mix(in_srgb,var(--accent)_20%,var(--background))] sm:size-11"
                        style={{
                          top: `${y}px`,
                          transform: "translateY(-50%)",
                        }}
                      />
                    );
                  })}
                <span className="text-steel font-mono text-[length:var(--text-meta)] tracking-[var(--tracking-meta)] uppercase">
                  Lane {lane + 1}
                </span>
              </button>
            ))}
          </div>
        </div>

        <dl className="grid grid-cols-3 gap-2 text-center">
          {(["Perfect", "Good", "Miss"] as const).map((label) => (
            <div
              key={label}
              className="border-border-subtle rounded-[var(--radius-md)] border px-2 py-3"
            >
              <dt>
                <Tag variant={judgementVariant(label)}>{label}</Tag>
              </dt>
              <dd className="mt-2 font-mono text-[length:var(--text-body-lg)]">
                {state.judgements[label]}
              </dd>
            </div>
          ))}
        </dl>

        <p className="text-muted font-mono text-[length:var(--text-meta)] tracking-[var(--tracking-meta)] uppercase">
          {visualStatus}
        </p>
        <DemoStatus message={announcedStatus} visuallyHidden />
      </div>
    </DemoFrame>
  );
}
