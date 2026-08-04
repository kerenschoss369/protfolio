"use client";

import { m } from "motion/react";

import { useElementInView } from "@/hooks/useElementInView";
import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";
import { durations, easings, springs } from "@/lib/animation-config";
import type { ArchitectureDiagram } from "@/data/content-types";

type CaseStudyPathMotionProps = {
  architecture: ArchitectureDiagram;
};

/**
 * Draws architecture relationships when the section enters view.
 * Textual relationships remain in the sibling semantic list.
 */
export function CaseStudyPathMotion({
  architecture,
}: CaseStudyPathMotionProps) {
  const [ref, inView] = useElementInView<HTMLDivElement>({ threshold: 0.2 });
  const reducedMotion = useReducedMotionPreference();
  const nodes = architecture.nodes.slice(0, 6);
  const width = Math.max(320, nodes.length * 88);

  return (
    <div ref={ref} className="overflow-x-auto" aria-hidden>
      <svg
        viewBox={`0 0 ${width} 72`}
        className="h-20 w-full min-w-[20rem]"
        role="presentation"
      >
        {nodes.map((node, index) => {
          if (index >= nodes.length - 1) {
            return null;
          }
          const x1 = 44 + index * 88;
          const x2 = 44 + (index + 1) * 88;
          return (
            <m.line
              key={`${node.id}-edge`}
              x1={x1}
              y1={36}
              x2={x2}
              y2={36}
              stroke="var(--steel)"
              strokeWidth="1.5"
              initial={reducedMotion ? false : { opacity: 0 }}
              animate={
                inView || reducedMotion ? { opacity: 1 } : { opacity: 0.25 }
              }
              transition={{
                duration: durations.base,
                delay: reducedMotion ? 0 : index * 0.1,
                ease: easings.entrance,
              }}
            />
          );
        })}
        {nodes.map((node, index) => {
          const x = 44 + index * 88;
          return (
            <m.g
              key={node.id}
              initial={reducedMotion ? false : { opacity: 0, y: 8 }}
              animate={
                inView || reducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0.4, y: 8 }
              }
              transition={{
                ...springs.spatial,
                delay: reducedMotion ? 0 : 0.12 + index * 0.08,
              }}
            >
              <circle
                cx={x}
                cy={36}
                r="10"
                className="fill-[var(--surface-1)] stroke-[var(--border-strong)]"
                strokeWidth="1.5"
              />
              <text
                x={x}
                y={60}
                textAnchor="middle"
                className="fill-[var(--muted)] font-mono text-[9px] uppercase"
              >
                {node.label.length > 10
                  ? `${node.label.slice(0, 9)}…`
                  : node.label}
              </text>
            </m.g>
          );
        })}
      </svg>
    </div>
  );
}
