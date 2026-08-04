"use client";

import { m } from "motion/react";

import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";
import { durations, easings, springs } from "@/lib/animation-config";

/**
 * Disconnected system path searching for a missing node, then reconnecting
 * toward Home / Work actions. Short, no expensive continuous loop.
 */
export function NotFoundReconnect() {
  const reducedMotion = useReducedMotionPreference();

  return (
    <svg
      viewBox="0 0 320 140"
      className="text-steel mb-6 max-w-md"
      role="img"
      aria-label="System diagram with a missing route node reconnecting toward recovery actions"
    >
      <m.path
        d="M40 70 C 90 30, 130 30, 160 70"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        initial={reducedMotion ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: durations.path, ease: easings.entrance }}
      />
      <m.path
        d="M160 70 C 190 110, 230 110, 280 70"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.5"
        initial={reducedMotion ? false : { pathLength: 0, opacity: 0.4 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          duration: durations.path,
          delay: 0.35,
          ease: easings.entrance,
        }}
      />
      {[
        { x: 40, y: 70, label: "I" },
        { x: 100, y: 42, label: "S" },
        { x: 220, y: 98, label: "A" },
        { x: 280, y: 70, label: "V" },
      ].map((node, index) => (
        <m.g
          key={node.label}
          initial={reducedMotion ? false : { opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...springs.spatial, delay: index * 0.08 }}
        >
          <circle
            cx={node.x}
            cy={node.y}
            r="8"
            className="fill-[var(--surface-1)] stroke-[var(--border-strong)]"
            strokeWidth="1.5"
          />
          <text
            x={node.x}
            y={node.y + 3}
            textAnchor="middle"
            className="fill-[var(--foreground)] font-mono text-[8px]"
          >
            {node.label}
          </text>
        </m.g>
      ))}
      <m.circle
        cx="160"
        cy="70"
        r="10"
        className="fill-none stroke-[var(--danger)]"
        strokeWidth="1.5"
        strokeDasharray="3 3"
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: [0.3, 0.9, 0.45] }}
        transition={{ duration: 1.6, times: [0, 0.5, 1] }}
      />
      <text
        x="160"
        y="74"
        textAnchor="middle"
        className="fill-[var(--danger)] font-mono text-[9px]"
      >
        ?
      </text>
    </svg>
  );
}
