"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type PointerEvent as ReactPointerEvent,
} from "react";

import { cn } from "@/lib/cn";
import {
  getFinePointerMediaQuery,
  getReducedMotionMediaQuery,
  motionBudget,
} from "@/lib/motion";

const nodes = [
  {
    id: "interface",
    label: "Interface",
    detail: "Responsive layouts, states, and precise UI structure.",
    x: 18,
    y: 28,
    paths: ["interface-systems", "interface-visual"],
  },
  {
    id: "systems",
    label: "Systems",
    detail: "Boundaries, contracts, and maintainable architecture.",
    x: 52,
    y: 18,
    paths: ["interface-systems", "systems-ai", "systems-visual"],
  },
  {
    id: "ai",
    label: "AI",
    detail: "Validated model output with human-review workflows.",
    x: 78,
    y: 36,
    paths: ["systems-ai", "ai-visual"],
  },
  {
    id: "visual",
    label: "Visual design",
    detail: "Composition, hierarchy, and photographic precision.",
    x: 40,
    y: 72,
    paths: ["interface-visual", "systems-visual", "ai-visual"],
  },
] as const;

type NodeId = (typeof nodes)[number]["id"];

function subscribeFinePointer(onStoreChange: () => void) {
  const media = window.matchMedia(getFinePointerMediaQuery());
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getFinePointerSnapshot() {
  return window.matchMedia(getFinePointerMediaQuery()).matches;
}

function getServerFinePointerSnapshot() {
  return false;
}

function subscribeReducedMotion(onStoreChange: () => void) {
  const media = window.matchMedia(getReducedMotionMediaQuery());
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(getReducedMotionMediaQuery()).matches;
}

function getServerReducedMotionSnapshot() {
  return false;
}

export function HeroVisual() {
  const [active, setActive] = useState<NodeId | null>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const finePointer = useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    getServerFinePointerSnapshot,
  );
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot,
  );
  const frameRef = useRef<number | null>(null);
  const descriptionId = useId();

  useEffect(() => {
    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!finePointer || reducedMotion) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    const next = {
      x: Math.max(-1, Math.min(1, nx)) * motionBudget.heroParallaxPx,
      y: Math.max(-1, Math.min(1, ny)) * motionBudget.heroParallaxPx,
    };

    if (frameRef.current) {
      window.cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = window.requestAnimationFrame(() => {
      setPointer(next);
    });
  }

  const activeNode = nodes.find((node) => node.id === active) ?? null;
  const activePaths = activeNode ? new Set(activeNode.paths) : null;

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[linear-gradient(160deg,var(--surface-1),var(--background)_45%,color-mix(in_srgb,var(--accent)_8%,var(--surface-2)))] shadow-[inset_0_1px_0_0_var(--steel-highlight)]",
        !reducedMotion && "hero-compose",
      )}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        setPointer({ x: 0, y: 0 });
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
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

      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color-mix(in_srgb,var(--accent)_18%,transparent)] blur-3xl transition-transform duration-[var(--duration-slow)] ease-[var(--ease-standard)] max-md:hidden"
        style={{
          transform: `translate(calc(-50% + ${pointer.x}px), calc(-50% + ${pointer.y}px))`,
          opacity: finePointer && !reducedMotion ? 1 : 0.45,
        }}
      />

      <svg
        viewBox="0 0 100 100"
        className="relative z-[1] aspect-[5/4] w-full max-md:aspect-[4/3]"
        role="img"
        aria-labelledby={descriptionId}
        style={{
          transform:
            finePointer && !reducedMotion
              ? `translate(${pointer.x * 0.35}px, ${pointer.y * 0.35}px)`
              : undefined,
          transition: "transform var(--duration-slow) var(--ease-standard)",
        }}
      >
        <title id={descriptionId}>
          Editorial system diagram connecting interface, systems, AI, and visual
          design
        </title>

        <g aria-hidden className="stroke-[var(--steel)]">
          {(
            [
              {
                id: "interface-systems",
                d: "M18 28 C 34 12, 42 12, 52 18",
              },
              {
                id: "systems-ai",
                d: "M52 18 C 64 24, 72 28, 78 36",
              },
              {
                id: "interface-visual",
                d: "M18 28 C 24 52, 30 66, 40 72",
              },
              {
                id: "ai-visual",
                d: "M78 36 C 68 54, 54 66, 40 72",
              },
              {
                id: "systems-visual",
                d: "M52 18 C 48 40, 44 56, 40 72",
                dashed: true,
              },
            ] as const
          ).map((path) => {
            const emphasized = activePaths?.has(path.id) ?? false;
            const dashed = "dashed" in path && path.dashed;
            return (
              <path
                key={path.id}
                d={path.d}
                fill="none"
                strokeWidth={emphasized ? 0.55 : dashed ? 0.3 : 0.35}
                strokeDasharray={dashed ? "1.2 1.4" : undefined}
                className={cn(
                  "transition-[stroke,opacity,stroke-width] duration-[var(--duration-base)] ease-[var(--ease-standard)]",
                  emphasized
                    ? "stroke-[var(--accent)] opacity-95"
                    : dashed
                      ? "opacity-50"
                      : "opacity-70",
                )}
              />
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
          <circle
            cx="28"
            cy="52"
            r="8"
            className="fill-none stroke-[var(--border-strong)] opacity-40 max-sm:hidden"
            strokeWidth="0.3"
            strokeDasharray="1 1.5"
          />
        </g>

        {nodes.map((node) => {
          const isActive = active === node.id;
          return (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r={isActive ? 3.4 : 2.8}
                className={cn(
                  "stroke-[var(--border-strong)] transition-[r,fill] duration-[var(--duration-fast)]",
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
            </g>
          );
        })}
      </svg>

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
                onFocus={() => setActive(node.id)}
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
