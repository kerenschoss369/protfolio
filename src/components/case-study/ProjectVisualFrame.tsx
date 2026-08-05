"use client";

import { createContext, useContext, type ReactNode } from "react";

import { Surface } from "@/components/ui/Surface";
import { Tag } from "@/components/ui/Tag";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/cn";

const EmbeddedVisualContext = createContext(false);

export function EmbeddedVisualProvider({ children }: { children: ReactNode }) {
  return (
    <EmbeddedVisualContext.Provider value={true}>
      {children}
    </EmbeddedVisualContext.Provider>
  );
}

type ProjectVisualFrameProps = {
  label: string;
  children: ReactNode;
  caption?: string;
  className?: string;
  /**
   * When true, the visual surface is hidden from assistive technology.
   * Default false — most project visuals include meaningful text.
   * Opt in only for purely decorative compositions with an adequate caption.
   */
  decorative?: boolean;
};

export function ProjectVisualFrame({
  label,
  children,
  caption,
  className,
  decorative = false,
}: ProjectVisualFrameProps) {
  const embedded = useContext(EmbeddedVisualContext);

  if (embedded) {
    return (
      <div
        className={cn("h-full overflow-auto p-4 sm:p-5", className)}
        aria-hidden={decorative || undefined}
      >
        <p className="sr-only">{label}</p>
        {children}
        {caption ? <p className="sr-only">{caption}</p> : null}
      </div>
    );
  }

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
