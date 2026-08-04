"use client";

import { useId, useState } from "react";

import { ArchitectureDetailsPanel } from "@/components/demos/shared/ArchitectureDetailsPanel";
import { ArchitectureNodeButton } from "@/components/demos/shared/ArchitectureNode";
import { Text } from "@/components/ui/Text";
import type { ArchitectureDiagram } from "@/data/content-types";
import { cn } from "@/lib/cn";

type InteractiveArchitectureDiagramProps = {
  diagram: ArchitectureDiagram;
  className?: string;
};

/**
 * Accessible architecture diagram: visual map + semantic list + details panel.
 * Relationships remain understandable without the decorative path layout.
 */
export function InteractiveArchitectureDiagram({
  diagram,
  className,
}: InteractiveArchitectureDiagramProps) {
  const baseId = useId();
  const [selectedId, setSelectedId] = useState<string | null>(
    diagram.nodes[0]?.id ?? null,
  );
  const selected =
    diagram.nodes.find((node) => node.id === selectedId) ??
    diagram.nodes[0] ??
    null;

  return (
    <div className={cn("space-y-4", className)}>
      <Text variant="meta" className="text-muted">
        {diagram.title}
      </Text>

      {/* Decorative horizontal flow — details remain in list + panel */}
      <div
        className="border-border-subtle hidden flex-wrap items-stretch gap-2 rounded-[var(--radius-md)] border p-3 lg:flex"
        aria-hidden
      >
        {diagram.nodes.map((node, index) => {
          const isSelected = node.id === selected?.id;
          return (
            <div
              key={node.id}
              className="flex min-w-0 flex-1 items-center gap-2"
            >
              <div
                className={cn(
                  "min-w-0 flex-1 rounded-[var(--radius-md)] border px-3 py-3 text-center transition-[border-color,background-color] duration-[var(--duration-fast)]",
                  isSelected
                    ? "border-accent bg-accent-muted"
                    : "border-border-strong bg-background",
                )}
              >
                <p className="font-mono text-[length:var(--text-meta)] tracking-[var(--tracking-meta)] uppercase">
                  {node.label}
                </p>
              </div>
              {index < diagram.nodes.length - 1 ? (
                <span className="text-steel shrink-0 font-mono text-[length:var(--text-meta)]">
                  →
                </span>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,18rem)]">
        <ol className="border-border-subtle divide-border-subtle divide-y rounded-[var(--radius-md)] border">
          {diagram.nodes.map((node, index) => {
            const outgoing = diagram.edges.filter(
              (edge) => edge.from === node.id,
            );
            const isSelected = node.id === selected?.id;
            const buttonId = `${baseId}-node-${node.id}`;

            return (
              <li key={node.id} className="p-2 sm:p-3">
                <ArchitectureNodeButton
                  id={buttonId}
                  label={`${index + 1}. ${node.label}`}
                  selected={isSelected}
                  onSelect={() => setSelectedId(node.id)}
                  relationships={outgoing.map((edge) => {
                    const target = diagram.nodes.find((n) => n.id === edge.to);
                    return {
                      id: edge.id,
                      text: `→ ${target?.label ?? edge.to}${edge.label ? ` · ${edge.label}` : ""}`,
                    };
                  })}
                />
              </li>
            );
          })}
        </ol>

        <ArchitectureDetailsPanel
          node={selected}
          edges={diagram.edges}
          nodes={diagram.nodes}
          labelledBy={`${baseId}-details`}
        />
      </div>
    </div>
  );
}
