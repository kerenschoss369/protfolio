import type { ReactNode } from "react";

import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/cn";

type ReducedMotionFallbackProps = {
  title: string;
  description: string;
  children?: ReactNode;
  className?: string;
};

/**
 * Explicit alternative mode copy when reduced motion is active.
 */
export function ReducedMotionFallback({
  title,
  description,
  children,
  className,
}: ReducedMotionFallbackProps) {
  return (
    <div
      className={cn(
        "border-border-subtle space-y-3 rounded-[var(--radius-md)] border border-dashed p-4",
        className,
      )}
      role="note"
    >
      <Text variant="meta" className="text-steel">
        {title}
      </Text>
      <Text variant="small" className="text-pretty">
        {description}
      </Text>
      {children}
    </div>
  );
}
