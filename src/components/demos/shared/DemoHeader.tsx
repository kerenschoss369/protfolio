import type { ReactNode } from "react";

import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/cn";

type DemoHeaderProps = {
  title: string;
  titleId: string;
  description?: string;
  descriptionId?: string;
  actions?: ReactNode;
  className?: string;
};

export function DemoHeader({
  title,
  titleId,
  description,
  descriptionId,
  actions,
  className,
}: DemoHeaderProps) {
  return (
    <header
      className={cn(
        "border-border-subtle flex flex-col gap-3 border-b px-4 py-4 sm:flex-row sm:items-start sm:justify-between sm:px-5",
        className,
      )}
    >
      <div className="min-w-0 space-y-1">
        <h3
          id={titleId}
          className="font-sans text-[length:var(--text-body-lg)] font-medium tracking-[var(--tracking-tight)]"
        >
          {title}
        </h3>
        {description ? (
          <Text
            id={descriptionId}
            variant="small"
            className="text-muted max-w-[40rem] text-pretty"
          >
            {description}
          </Text>
        ) : null}
      </div>
      {actions ? (
        <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>
      ) : null}
    </header>
  );
}
