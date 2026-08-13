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
    <details className="landing-case-panel group px-5 py-4 open:pb-6 sm:px-6">
      <summary className="text-foreground cursor-pointer list-none py-1 text-base font-medium tracking-wide marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] [&::-webkit-details-marker]:hidden">
        <span className="inline-flex min-h-11 items-center gap-2">
          <span
            aria-hidden
            className="text-muted font-mono text-xs transition-transform group-open:rotate-90"
          >
            →
          </span>
          {title}
        </span>
      </summary>
      <div className="border-border-subtle mt-5 space-y-8 border-t pt-5">
        {children}
      </div>
    </details>
  );
}
