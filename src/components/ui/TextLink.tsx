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
    "underline decoration-[color-mix(in_srgb,var(--accent)_45%,transparent)] decoration-1 underline-offset-[0.18em] transition-[color,text-decoration-color,text-underline-offset] duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
    "hover:decoration-accent hover:underline-offset-[0.24em] focus-visible:decoration-accent focus-visible:underline-offset-[0.24em]",
    muted ? "text-muted hover:text-foreground" : "text-foreground",
    className,
  );

  if (external || href.startsWith("http") || href.startsWith("mailto:")) {
    const opensInNewTab = external || href.startsWith("http");

    return (
      <a
        href={href}
        className={classes}
        rel={opensInNewTab ? "noopener noreferrer" : undefined}
        target={opensInNewTab ? "_blank" : undefined}
        {...props}
      >
        {children}
        {opensInNewTab ? (
          <span className="sr-only"> (opens in a new tab)</span>
        ) : null}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
