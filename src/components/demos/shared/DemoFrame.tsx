import type { ReactNode } from "react";

import { Surface } from "@/components/ui/Surface";
import { cn } from "@/lib/cn";

type DemoFrameProps = {
  children: ReactNode;
  className?: string;
  /** Approximate reserved height to limit layout shift while loading. */
  minHeightClassName?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
};

/**
 * Shared demo shell. Visual language inside remains project-specific.
 */
export function DemoFrame({
  children,
  className,
  minHeightClassName = "min-h-[28rem]",
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
}: DemoFrameProps) {
  return (
    <Surface
      as="section"
      variant="inset"
      border="steel"
      className={cn("overflow-hidden", minHeightClassName, className)}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
    >
      {children}
    </Surface>
  );
}
