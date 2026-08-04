import { cn } from "@/lib/cn";

type DemoStatusProps = {
  message: string;
  /** Politeness for screen-reader announcements. Prefer "polite". */
  politeness?: "polite" | "assertive" | "off";
  className?: string;
  visuallyHidden?: boolean;
};

/**
 * Live region for useful status changes only — avoid noisy repeats.
 */
export function DemoStatus({
  message,
  politeness = "polite",
  className,
  visuallyHidden = false,
}: DemoStatusProps) {
  return (
    <p
      role="status"
      aria-live={politeness === "off" ? "off" : politeness}
      aria-atomic="true"
      className={cn(
        visuallyHidden
          ? "sr-only"
          : "text-muted font-mono text-[length:var(--text-meta)] tracking-[var(--tracking-meta)] uppercase",
        className,
      )}
    >
      {message}
    </p>
  );
}
