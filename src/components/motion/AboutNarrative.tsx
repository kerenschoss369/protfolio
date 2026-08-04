"use client";

import { m } from "motion/react";
import { useState } from "react";

import { useElementInView } from "@/hooks/useElementInView";
import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";
import { durations, easings, springs } from "@/lib/animation-config";
import { cn } from "@/lib/cn";

const FRAMES = [
  { id: "f1", x: 8, y: 12, w: 28, h: 36 },
  { id: "f2", x: 40, y: 10, w: 24, h: 22 },
  { id: "f3", x: 68, y: 14, w: 22, h: 30 },
  { id: "f4", x: 18, y: 54, w: 30, h: 28 },
  { id: "f5", x: 52, y: 48, w: 34, h: 34 },
] as const;

/**
 * Photography crop marks → editorial grid → UI layout → system nodes.
 * Abstract geometry only — no stock photography.
 */
export function AboutNarrative() {
  const [ref, inView] = useElementInView<HTMLDivElement>({ threshold: 0.2 });
  const reducedMotion = useReducedMotionPreference();
  const [phase, setPhase] = useState(0);

  return (
    <div
      ref={ref}
      className="border-border-subtle bg-surface-1 relative overflow-hidden rounded-[var(--radius-lg)] border"
    >
      <div className="border-border-subtle flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3">
        <p className="text-steel font-mono text-[length:var(--text-meta)] tracking-[var(--tracking-meta)] uppercase">
          Composition → interface
        </p>
        <div className="flex flex-wrap gap-2">
          {["Frames", "Grid", "UI", "Systems"].map((label, index) => (
            <button
              key={label}
              type="button"
              className={cn(
                "pressable min-h-[var(--touch-target)] rounded-[var(--radius-sm)] border px-2 font-mono text-[length:var(--text-meta)] uppercase",
                phase === index
                  ? "border-accent bg-accent-muted text-accent"
                  : "border-border-subtle text-muted",
              )}
              aria-pressed={phase === index}
              onClick={() => setPhase(index)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <svg
        viewBox="0 0 100 100"
        className="aspect-[16/10] w-full"
        role="img"
        aria-label="Abstract narrative transforming photography crop marks into an interface grid and system nodes"
      >
        {FRAMES.map((frame, index) => {
          const aligned =
            phase >= 1
              ? {
                  x: 8 + (index % 3) * 30,
                  y: 12 + Math.floor(index / 3) * 42,
                  w: 26,
                  h: 34,
                }
              : frame;
          const ui =
            phase >= 2
              ? {
                  x: 10 + (index % 3) * 28,
                  y: 14 + Math.floor(index / 3) * 40,
                  w: 24,
                  h: phase >= 3 && index > 2 ? 18 : 32,
                }
              : aligned;

          return (
            <m.g
              key={frame.id}
              initial={false}
              animate={
                inView || reducedMotion ? { opacity: 1 } : { opacity: 0.4 }
              }
            >
              <m.rect
                initial={false}
                animate={{
                  x: ui.x,
                  y: ui.y,
                  width: ui.w,
                  height: ui.h,
                }}
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : { ...springs.layout, delay: index * 0.04 }
                }
                rx={phase >= 2 ? 1.2 : 0.4}
                className="fill-[color-mix(in_srgb,var(--background)_80%,transparent)] stroke-[var(--steel)]"
                strokeWidth="0.4"
              />
              {phase === 0 ? (
                <>
                  <path
                    d={`M${frame.x} ${frame.y + 4} V${frame.y} H${frame.x + 4}`}
                    fill="none"
                    className="stroke-[var(--accent)]"
                    strokeWidth="0.35"
                  />
                  <path
                    d={`M${frame.x + frame.w - 4} ${frame.y} H${frame.x + frame.w} V${frame.y + 4}`}
                    fill="none"
                    className="stroke-[var(--accent)]"
                    strokeWidth="0.35"
                  />
                </>
              ) : null}
              {phase >= 2 ? (
                <m.rect
                  x={ui.x + 2}
                  y={ui.y + 3}
                  width={ui.w * 0.45}
                  height="2"
                  className="fill-[var(--accent)]"
                  initial={false}
                  animate={{ opacity: 0.85 }}
                  transition={{
                    duration: durations.fast,
                    ease: easings.standard,
                  }}
                />
              ) : null}
            </m.g>
          );
        })}

        {phase >= 3
          ? [
              { x: 22, y: 30 },
              { x: 50, y: 28 },
              { x: 78, y: 32 },
            ].map((node, index) => (
              <m.circle
                key={`${node.x}-${node.y}`}
                cx={node.x}
                cy={node.y}
                r="2.2"
                className="fill-[var(--accent)]"
                initial={reducedMotion ? false : { scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ ...springs.spatial, delay: index * 0.08 }}
              />
            ))
          : null}
      </svg>

      <p className="text-muted border-border-subtle border-t px-4 py-3 text-[length:var(--text-sm)]">
        Crop marks become a responsive layout structure, then connect to system
        nodes — composition, hierarchy, and technical precision.
      </p>
    </div>
  );
}
