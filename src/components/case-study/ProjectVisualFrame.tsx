import type { ReactNode } from "react";

import { Surface } from "@/components/ui/Surface";
import { Tag } from "@/components/ui/Tag";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/cn";

type ProjectVisualFrameProps = {
  label: string;
  children: ReactNode;
  caption?: string;
  className?: string;
  /** When true, the visual is decorative; caption remains available text. */
  decorative?: boolean;
};

export function ProjectVisualFrame({
  label,
  children,
  caption,
  className,
  decorative = true,
}: ProjectVisualFrameProps) {
  return (
    <figure className={cn("space-y-3", className)}>
      <Surface
        variant="raised"
        border="steel"
        className="overflow-hidden"
        aria-hidden={decorative || undefined}
      >
        <div className="border-border-subtle flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3">
          <Text variant="meta" className="text-steel">
            {label}
          </Text>
          <Tag variant="steel">Conceptual preview</Tag>
        </div>
        <div className="p-4 sm:p-5">{children}</div>
      </Surface>
      {caption ? (
        <figcaption className="text-muted text-[length:var(--text-sm)] text-pretty">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
