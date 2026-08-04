import { Text } from "@/components/ui/Text";
import type { ArchitectureEdge, ArchitectureNode } from "@/data/content-types";
import { cn } from "@/lib/cn";

type ArchitectureDetailsPanelProps = {
  node: ArchitectureNode | null;
  edges: readonly ArchitectureEdge[];
  nodes: readonly ArchitectureNode[];
  labelledBy: string;
  className?: string;
};

export function ArchitectureDetailsPanel({
  node,
  edges,
  nodes,
  labelledBy,
  className,
}: ArchitectureDetailsPanelProps) {
  if (!node) {
    return (
      <aside
        className={cn(
          "border-border-subtle rounded-[var(--radius-md)] border p-4",
          className,
        )}
        aria-labelledby={labelledBy}
      >
        <Text id={labelledBy} variant="meta" className="text-muted">
          Node details
        </Text>
        <Text variant="small" className="mt-2">
          Select a node to read its responsibility.
        </Text>
      </aside>
    );
  }

  const outgoing = edges.filter((edge) => edge.from === node.id);
  const incoming = edges.filter((edge) => edge.to === node.id);

  return (
    <aside
      className={cn(
        "border-border-subtle bg-background space-y-3 rounded-[var(--radius-md)] border p-4",
        className,
      )}
      aria-labelledby={labelledBy}
    >
      <Text id={labelledBy} variant="meta" className="text-steel">
        Selected node
      </Text>
      <p className="font-sans text-[length:var(--text-body-lg)] font-medium">
        {node.label}
      </p>
      <Text variant="small" className="text-pretty">
        {node.responsibility}
      </Text>

      {outgoing.length > 0 || incoming.length > 0 ? (
        <div className="border-border-subtle space-y-2 border-t pt-3">
          <Text variant="meta" className="text-muted">
            Relationships
          </Text>
          <ul className="space-y-1 text-[length:var(--text-sm)]">
            {incoming.map((edge) => {
              const from = nodes.find((n) => n.id === edge.from);
              return (
                <li key={edge.id}>
                  ← from {from?.label ?? edge.from}
                  {edge.label ? ` (${edge.label})` : null}
                </li>
              );
            })}
            {outgoing.map((edge) => {
              const to = nodes.find((n) => n.id === edge.to);
              return (
                <li key={edge.id}>
                  → to {to?.label ?? edge.to}
                  {edge.label ? ` (${edge.label})` : null}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </aside>
  );
}
