import { Surface } from "@/components/ui/Surface";
import { Text } from "@/components/ui/Text";
import type { ArchitectureDiagram } from "@/data/content-types";
import { cn } from "@/lib/cn";

type ArchitectureOverviewProps = {
  architecture?: ArchitectureDiagram;
  highlights: readonly string[];
};

export function ArchitectureOverview({
  architecture,
  highlights,
}: ArchitectureOverviewProps) {
  const hasHighlights = highlights.length > 0;
  const hasDiagram = Boolean(architecture && architecture.nodes.length > 0);

  if (!hasHighlights && !hasDiagram) {
    return null;
  }

  return (
    <div className="space-y-6">
      {hasHighlights ? (
        <ul className="grid gap-3 sm:grid-cols-2">
          {highlights.map((item) => (
            <li
              key={item}
              className="border-border-subtle rounded-[var(--radius-md)] border p-4 text-[length:var(--text-sm)] text-pretty"
            >
              {item}
            </li>
          ))}
        </ul>
      ) : null}

      {architecture && hasDiagram ? (
        <Surface
          variant="inset"
          border="steel"
          className="overflow-hidden"
          aria-label={architecture.title}
        >
          <div className="border-border-subtle border-b px-4 py-3">
            <Text variant="meta" className="text-steel">
              {architecture.title}
            </Text>
          </div>

          {/* Decorative flow — details stay in the list below */}
          <div
            className="border-border-subtle hidden items-stretch gap-2 overflow-x-auto border-b p-4 lg:flex"
            aria-hidden
          >
            {architecture.nodes.map((node, index) => (
              <div
                key={node.id}
                className="flex min-w-0 flex-1 items-center gap-2"
              >
                <div className="border-border-strong bg-background min-w-0 flex-1 rounded-[var(--radius-md)] border px-3 py-3 text-center">
                  <p className="font-mono text-[length:var(--text-meta)] tracking-[var(--tracking-meta)] uppercase">
                    {node.label}
                  </p>
                </div>
                {index < architecture.nodes.length - 1 ? (
                  <span className="text-steel shrink-0 font-mono text-[length:var(--text-meta)]">
                    →
                  </span>
                ) : null}
              </div>
            ))}
          </div>

          <ol className="divide-border-subtle divide-y">
            {architecture.nodes.map((node, index) => {
              const outgoing = architecture.edges.filter(
                (edge) => edge.from === node.id,
              );

              return (
                <li
                  key={node.id}
                  className={cn(
                    "grid gap-2 p-4 sm:grid-cols-[minmax(0,8rem)_1fr]",
                  )}
                >
                  <div className="space-y-1">
                    <p className="font-mono text-[length:var(--text-meta)] tracking-[var(--tracking-meta)] uppercase">
                      {index + 1}. {node.label}
                    </p>
                    {outgoing.map((edge) => {
                      const target = architecture.nodes.find(
                        (candidate) => candidate.id === edge.to,
                      );
                      return (
                        <p
                          key={edge.id}
                          className="text-steel text-[length:var(--text-meta)]"
                        >
                          → {target?.label ?? edge.to}
                          {edge.label ? ` · ${edge.label}` : null}
                        </p>
                      );
                    })}
                  </div>
                  <p className="text-[length:var(--text-sm)] text-pretty">
                    {node.responsibility}
                  </p>
                </li>
              );
            })}
          </ol>
        </Surface>
      ) : null}
    </div>
  );
}
