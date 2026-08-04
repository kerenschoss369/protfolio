import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type DemoDisclosureProps = {
  summary: string;
  children: ReactNode;
  className?: string;
  defaultOpen?: boolean;
};

/**
 * Progressive disclosure for secondary explanatory content.
 */
export function DemoDisclosure({
  summary,
  children,
  className,
  defaultOpen = false,
}: DemoDisclosureProps) {
  return (
    <details
      className={cn(
        "border-border-subtle rounded-[var(--radius-md)] border px-3 py-2",
        className,
      )}
      open={defaultOpen || undefined}
    >
      <summary className="marker:text-steel focus-visible:outline-focus-ring cursor-pointer font-mono text-[length:var(--text-meta)] tracking-[var(--tracking-meta)] uppercase focus-visible:outline focus-visible:outline-[length:var(--focus-ring-width)] focus-visible:outline-offset-[var(--focus-ring-offset)]">
        {summary}
      </summary>
      <div className="text-muted mt-2 space-y-2 text-[length:var(--text-sm)] text-pretty">
        {children}
      </div>
    </details>
  );
}
