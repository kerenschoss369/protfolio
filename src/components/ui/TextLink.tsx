import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

type TextLinkProps = ComponentPropsWithoutRef<"a"> & {
  href: string;
  external?: boolean;
  muted?: boolean;
};

export function TextLink({
  className,
  href,
  external = false,
  muted = false,
  children,
  ...props
}: TextLinkProps) {
  const classes = cn(
    "underline decoration-[color-mix(in_srgb,var(--accent)_45%,transparent)] decoration-1 underline-offset-[0.18em] transition-[color,text-decoration-color] duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
    "hover:decoration-accent focus-visible:decoration-accent",
    muted ? "text-muted hover:text-foreground" : "text-foreground",
    className,
  );

  if (external || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={classes}
        rel={
          external || href.startsWith("http")
            ? "noopener noreferrer"
            : undefined
        }
        target={external || href.startsWith("http") ? "_blank" : undefined}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
