import type { ReactNode } from "react";

type TechnicalDetailsProps = {
  title?: string;
  children: ReactNode;
};

/**
 * Level-3 case-study detail behind intentional disclosure.
 * Native details/summary for keyboard and no-JS access.
 */
export function TechnicalDetails({
  title = "Technical details",
  children,
}: TechnicalDetailsProps) {
  return (
    <details className="border-border-subtle group rounded-[var(--radius-md)] border px-5 py-4 open:pb-5">
      <summary className="text-foreground hover:text-accent focus-visible:outline-focus-ring cursor-pointer list-none py-1 text-[length:var(--text-body)] font-medium marker:content-none focus-visible:outline focus-visible:outline-[length:var(--focus-ring-width)] focus-visible:outline-offset-[var(--focus-ring-offset)] [&::-webkit-details-marker]:hidden">
        <span className="inline-flex min-h-[var(--touch-target)] items-center gap-2">
          <span
            aria-hidden
            className="text-steel font-mono text-[length:var(--text-meta)] transition-transform group-open:rotate-90"
          >
            →
          </span>
          {title}
        </span>
      </summary>
      <div className="mt-5 space-y-8 border-t border-[var(--border-subtle)] pt-5">
        {children}
      </div>
    </details>
  );
}
