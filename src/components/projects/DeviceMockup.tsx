import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type DeviceVariant = "browser" | "laptop" | "terminal" | "monitor" | "phone";

type DeviceMockupProps = {
  variant?: DeviceVariant;
  children: ReactNode;
  caption?: string;
  className?: string;
  /** Accent class for project-specific frame color */
  accentClassName?: string;
};

/**
 * Polished device chrome around project visuals.
 * Decorative frame elements are aria-hidden; provide caption when needed.
 */
export function DeviceMockup({
  variant = "browser",
  children,
  caption,
  className,
  accentClassName,
}: DeviceMockupProps) {
  if (variant === "phone") {
    return (
      <figure className={cn("mx-auto w-full max-w-[16rem]", className)}>
        <div
          className={cn(
            "border-border-strong bg-surface-2 relative overflow-hidden rounded-[1.75rem] border-[3px] shadow-[var(--shadow-md)]",
            accentClassName,
          )}
        >
          <div
            aria-hidden
            className="bg-foreground/80 absolute top-2 left-1/2 z-10 h-1.5 w-16 -translate-x-1/2 rounded-full"
          />
          <div className="bg-background aspect-[9/16] overflow-hidden pt-5">
            {children}
          </div>
        </div>
        {caption ? (
          <figcaption className="text-muted mt-3 text-center text-[length:var(--text-sm)]">
            {caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  if (variant === "laptop") {
    return (
      <figure className={cn("w-full", className)}>
        <div className="mx-auto max-w-4xl">
          <div
            className={cn(
              "border-border-strong bg-surface-2 overflow-hidden rounded-t-[var(--radius-lg)] border border-b-0 shadow-[var(--shadow-md)]",
              accentClassName,
            )}
          >
            <div
              aria-hidden
              className="border-border-subtle flex items-center gap-1.5 border-b px-3 py-2"
            >
              <span className="bg-border-strong size-2 rounded-full" />
              <span className="bg-border-strong size-2 rounded-full" />
              <span className="bg-border-strong size-2 rounded-full" />
              <span className="bg-surface-1 text-muted ms-3 flex-1 truncate rounded-[var(--radius-sm)] px-2 py-0.5 font-mono text-[length:var(--text-meta)]">
                localhost
              </span>
            </div>
            <div className="bg-background aspect-[16/10] overflow-hidden">
              {children}
            </div>
          </div>
          <div
            aria-hidden
            className="border-border-subtle bg-surface-2 mx-auto h-3 w-[102%] max-w-none -translate-x-[1%] rounded-b-[0.75rem] border border-t-0"
          />
          <div
            aria-hidden
            className="bg-steel/40 mx-auto mt-0.5 h-1.5 w-1/3 rounded-b-full"
          />
        </div>
        {caption ? (
          <figcaption className="text-muted mt-4 text-center text-[length:var(--text-sm)]">
            {caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  if (variant === "terminal") {
    return (
      <figure className={cn("w-full", className)}>
        <div
          className={cn(
            "border-border-strong overflow-hidden rounded-[var(--radius-lg)] border shadow-[var(--shadow-md)]",
            "bg-[color-mix(in_srgb,var(--foreground)_92%,var(--background))]",
            accentClassName,
          )}
        >
          <div
            aria-hidden
            className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2"
          >
            <span className="size-2 rounded-full bg-[#ff5f57]" />
            <span className="size-2 rounded-full bg-[#febc2e]" />
            <span className="size-2 rounded-full bg-[#28c840]" />
            <span className="ms-3 font-mono text-[length:var(--text-meta)] tracking-wide text-white/50 uppercase">
              terminal
            </span>
          </div>
          <div className="aspect-[16/10] overflow-hidden text-[color-mix(in_srgb,var(--background)_90%,white)]">
            {children}
          </div>
        </div>
        {caption ? (
          <figcaption className="text-muted mt-4 text-center text-[length:var(--text-sm)]">
            {caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  if (variant === "monitor") {
    return (
      <figure className={cn("w-full", className)}>
        <div className="mx-auto max-w-5xl">
          <div
            className={cn(
              "border-border-strong bg-surface-2 overflow-hidden rounded-[var(--radius-md)] border shadow-[var(--shadow-md)]",
              accentClassName,
            )}
          >
            <div className="bg-background aspect-[21/10] overflow-hidden">
              {children}
            </div>
          </div>
          <div
            aria-hidden
            className="bg-steel/50 mx-auto h-8 w-4 rounded-b-[var(--radius-sm)]"
          />
          <div
            aria-hidden
            className="bg-steel/30 mx-auto h-1.5 w-28 rounded-full"
          />
        </div>
        {caption ? (
          <figcaption className="text-muted mt-4 text-center text-[length:var(--text-sm)]">
            {caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  // browser default
  return (
    <figure className={cn("w-full", className)}>
      <div
        className={cn(
          "border-border-strong bg-surface-2 overflow-hidden rounded-[var(--radius-lg)] border shadow-[var(--shadow-md)]",
          accentClassName,
        )}
      >
        <div
          aria-hidden
          className="border-border-subtle flex items-center gap-1.5 border-b px-3 py-2"
        >
          <span className="bg-border-strong size-2 rounded-full" />
          <span className="bg-border-strong size-2 rounded-full" />
          <span className="bg-border-strong size-2 rounded-full" />
          <span className="bg-surface-1 text-muted ms-3 flex-1 truncate rounded-[var(--radius-sm)] px-2 py-0.5 font-mono text-[length:var(--text-meta)]">
            app preview
          </span>
        </div>
        <div className="bg-background aspect-[16/10] overflow-hidden">
          {children}
        </div>
      </div>
      {caption ? (
        <figcaption className="text-muted mt-4 text-center text-[length:var(--text-sm)]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function deviceVariantForSlug(slug: string): DeviceVariant {
  switch (slug) {
    case "clinical-follow-up-detector":
      return "laptop";
    case "academease":
      return "browser";
    case "realtime-gpt-cli":
    case "overthewire-bandit":
      return "terminal";
    case "taptap-avengers":
      return "monitor";
    default:
      return "browser";
  }
}
