"use client";

import { m } from "motion/react";
import { useId, useMemo, useState } from "react";

import { useElementInView } from "@/hooks/useElementInView";
import { usePointerPosition } from "@/hooks/usePointerPosition";
import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";
import { distances, durations, springs } from "@/lib/animation-config";
import { cn } from "@/lib/cn";

const nodes = [
  {
    id: "interface",
    label: "Interface",
    detail:
      "User-facing experience — responsive layouts, states, and precise UI structure.",
    x: 18,
    y: 28,
    paths: ["interface-systems", "interface-visual"],
  },
  {
    id: "systems",
    label: "Systems",
    detail:
      "Architecture and reliable boundaries — contracts, validation, and maintainable structure.",
    x: 52,
    y: 18,
    paths: ["interface-systems", "systems-ai", "systems-visual"],
  },
  {
    id: "ai",
    label: "AI",
    detail:
      "Model integration and validation — structured output with human-review workflows.",
    x: 78,
    y: 36,
    paths: ["systems-ai", "ai-visual"],
  },
  {
    id: "visual",
    label: "Visual",
    detail:
      "Composition and interaction quality — hierarchy, rhythm, and photographic precision.",
    x: 40,
    y: 72,
    paths: ["interface-visual", "systems-visual", "ai-visual"],
  },
] as const;

type NodeId = (typeof nodes)[number]["id"];

const PATHS = [
  { id: "interface-systems", d: "M18 28 C 34 12, 42 12, 52 18", length: 42 },
  { id: "systems-ai", d: "M52 18 C 64 24, 72 28, 78 36", length: 36 },
  { id: "interface-visual", d: "M18 28 C 24 52, 30 66, 40 72", length: 52 },
  { id: "ai-visual", d: "M78 36 C 68 54, 54 66, 40 72", length: 48 },
  {
    id: "systems-visual",
    d: "M52 18 C 48 40, 44 56, 40 72",
    length: 54,
    dashed: true,
  },
] as const;

export function HeroVisual() {
  const [active, setActive] = useState<NodeId | null>(null);
  const [containerRef, inView] = useElementInView<HTMLDivElement>({
    once: true,
    threshold: 0.15,
  });
  const reducedMotion = useReducedMotionPreference();
  const {
    enabled: depthEnabled,
    depth,
    handlers,
  } = usePointerPosition(distances.pointerDepthMaxPx);
  const descriptionId = useId();

  const activeNode = useMemo(
    () => nodes.find((node) => node.id === active) ?? null,
    [active],
  );
  const activePaths = activeNode ? new Set(activeNode.paths) : null;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative isolate overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[linear-gradient(160deg,var(--surface-1),var(--background)_45%,color-mix(in_srgb,var(--accent)_8%,var(--surface-2)))] shadow-[inset_0_1px_0_0_var(--steel-highlight)]",
      )}
      {...handlers}
    >
      <HeroStructuralBackground active={active} />

      <m.div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color-mix(in_srgb,var(--accent)_18%,transparent)] blur-3xl max-md:hidden"
        animate={
          depthEnabled
            ? { x: depth.x * 0.6, y: depth.y * 0.6, opacity: 1 }
            : { x: 0, y: 0, opacity: 0.45 }
        }
        transition={springs.settle}
        style={{ marginLeft: "-5rem", marginTop: "-5rem" }}
      />

      <m.svg
        viewBox="0 0 100 100"
        className="relative z-[1] aspect-[5/4] w-full max-md:aspect-[4/3]"
        role="img"
        aria-labelledby={descriptionId}
        animate={
          depthEnabled
            ? { x: depth.x * 0.35, y: depth.y * 0.35 }
            : { x: 0, y: 0 }
        }
        transition={springs.settle}
      >
        <title id={descriptionId}>
          Editorial system diagram connecting interface, systems, AI, and visual
          design
        </title>

        <g aria-hidden className="stroke-[var(--steel)]">
          {PATHS.map((path, index) => {
            const emphasized = activePaths?.has(path.id) ?? false;
            const dashed = "dashed" in path && path.dashed;
            return (
              <g key={path.id}>
                <m.path
                  d={path.d}
                  fill="none"
                  strokeWidth={emphasized ? 0.55 : dashed ? 0.3 : 0.35}
                  strokeDasharray={
                    reducedMotion
                      ? dashed
                        ? "1.2 1.4"
                        : undefined
                      : `${path.length}`
                  }
                  initial={
                    reducedMotion
                      ? false
                      : { strokeDashoffset: path.length, opacity: 0.35 }
                  }
                  animate={
                    inView || reducedMotion
                      ? {
                          strokeDashoffset: 0,
                          opacity: emphasized ? 0.95 : dashed ? 0.5 : 0.7,
                        }
                      : undefined
                  }
                  transition={{
                    duration: durations.path,
                    delay: reducedMotion ? 0 : 0.12 + index * 0.1,
                    ease: [0.2, 0, 0, 1],
                  }}
                  className={emphasized ? "stroke-[var(--accent)]" : undefined}
                />
                {!reducedMotion && inView && (emphasized || !active) ? (
                  <m.circle
                    key={`${path.id}-pulse`}
                    r="0.85"
                    className="fill-[var(--accent)]"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 0.85, 0],
                      offsetDistance: ["0%", "100%"],
                    }}
                    style={{ offsetPath: `path('${path.d}')` }}
                    transition={{
                      duration: 2.4,
                      delay: 0.8 + index * 0.35,
                      repeat: Infinity,
                      repeatDelay: 2.2,
                      ease: "easeInOut",
                    }}
                  />
                ) : null}
              </g>
            );
          })}
        </g>

        <g aria-hidden>
          <rect
            x="58"
            y="58"
            width="28"
            height="22"
            rx="1.5"
            className="fill-[color-mix(in_srgb,var(--surface-2)_85%,transparent)] stroke-[var(--border-subtle)]"
            strokeWidth="0.35"
          />
          <rect
            x="61"
            y="62"
            width="10"
            height="2"
            className="fill-[var(--accent)] opacity-80"
          />
          <rect
            x="61"
            y="67"
            width="18"
            height="1.2"
            className="fill-[var(--steel)] opacity-50"
          />
          <rect
            x="61"
            y="71"
            width="14"
            height="1.2"
            className="fill-[var(--steel)] opacity-40"
          />
        </g>

        {nodes.map((node, index) => {
          const isActive = active === node.id;
          return (
            <m.g
              key={node.id}
              initial={reducedMotion ? false : { opacity: 0, scale: 0.7 }}
              animate={
                inView || reducedMotion
                  ? { opacity: 1, scale: isActive ? 1.12 : 1 }
                  : undefined
              }
              transition={{
                ...springs.spatial,
                delay: reducedMotion ? 0 : 0.35 + index * 0.08,
              }}
            >
              <circle
                cx={node.x}
                cy={node.y}
                r={isActive ? 3.4 : 2.8}
                className={cn(
                  "stroke-[var(--border-strong)]",
                  isActive ? "fill-[var(--accent)]" : "fill-[var(--surface-1)]",
                )}
                strokeWidth="0.4"
              />
              <circle
                cx={node.x}
                cy={node.y}
                r="1.1"
                className={
                  isActive
                    ? "fill-[var(--accent-contrast)]"
                    : "fill-[var(--steel)]"
                }
              />
              <text
                x={node.x}
                y={node.y - 5}
                textAnchor="middle"
                className="fill-[var(--foreground)] font-mono text-[3.2px] tracking-[0.08em] uppercase max-sm:text-[2.8px]"
              >
                {node.label}
              </text>
            </m.g>
          );
        })}
      </m.svg>

      <ul className="relative z-[1] grid grid-cols-2 gap-2 border-t border-[var(--border-subtle)] p-3 sm:grid-cols-4 sm:p-4">
        {nodes.map((node) => {
          const isActive = active === node.id;
          return (
            <li key={node.id}>
              <button
                type="button"
                className={cn(
                  "pressable border-border-subtle flex min-h-[var(--touch-target)] w-full flex-col items-start justify-center rounded-[var(--radius-md)] border px-3 py-2 text-left transition-[background-color,border-color] duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
                  isActive
                    ? "border-accent bg-accent-muted"
                    : "bg-background/70 hover:bg-surface-1",
                )}
                aria-pressed={isActive}
                aria-describedby={
                  isActive ? `hero-node-${node.id}-detail` : undefined
                }
                onClick={() =>
                  setActive((current) => (current === node.id ? null : node.id))
                }
              >
                <span className="font-mono text-[length:var(--text-meta)] tracking-[var(--tracking-meta)] uppercase">
                  {node.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <p
        className="text-muted relative z-[1] min-h-12 border-t border-[var(--border-subtle)] px-4 py-3 text-[length:var(--text-sm)]"
        aria-live="polite"
      >
        {activeNode ? (
          <span id={`hero-node-${activeNode.id}-detail`}>
            {activeNode.detail}
          </span>
        ) : (
          <span>Select a node to inspect the system composition.</span>
        )}
      </p>
    </div>
  );
}

function HeroStructuralBackground({ active }: { active: NodeId | null }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: `
            linear-gradient(to right, color-mix(in srgb, var(--border-subtle) 70%, transparent) 1px, transparent 1px),
            linear-gradient(to bottom, color-mix(in srgb, var(--border-subtle) 70%, transparent) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(circle at 50% 40%, black 20%, transparent 78%)",
        }}
      />
      <CropMarks emphasis={Boolean(active)} />
      <div
        className={cn(
          "absolute inset-x-6 top-4 h-px bg-[color-mix(in_srgb,var(--steel)_35%,transparent)] transition-opacity duration-[var(--duration-base)]",
          active ? "opacity-80" : "opacity-40",
        )}
      />
      <div
        className={cn(
          "absolute inset-y-6 left-4 w-px bg-[color-mix(in_srgb,var(--steel)_35%,transparent)] transition-opacity duration-[var(--duration-base)]",
          active ? "opacity-80" : "opacity-40",
        )}
      />
    </div>
  );
}

function CropMarks({ emphasis }: { emphasis: boolean }) {
  const mark = cn(
    "absolute size-3 border-[var(--steel)] transition-opacity duration-[var(--duration-base)]",
    emphasis ? "opacity-70" : "opacity-35",
  );
  return (
    <>
      <span className={cn(mark, "top-3 left-3 border-t border-l")} />
      <span className={cn(mark, "top-3 right-3 border-t border-r")} />
      <span className={cn(mark, "bottom-3 left-3 border-b border-l")} />
      <span className={cn(mark, "right-3 bottom-3 border-r border-b")} />
    </>
  );
}
