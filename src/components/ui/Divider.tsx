import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

type DividerProps = ComponentPropsWithoutRef<"hr"> & {
  tone?: "subtle" | "strong" | "steel";
};

export function Divider({
  className,
  tone = "subtle",
  ...props
}: DividerProps) {
  return (
    <hr
      className={cn(
        "m-0 h-px w-full border-0",
        tone === "subtle" && "bg-border-subtle",
        tone === "strong" && "bg-border-strong",
        tone === "steel" &&
          "bg-[linear-gradient(90deg,transparent,var(--steel)_12%,var(--border-subtle)_50%,var(--steel)_88%,transparent)]",
        className,
      )}
      {...props}
    />
  );
}
