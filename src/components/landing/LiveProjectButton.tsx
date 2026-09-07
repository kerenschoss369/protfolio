import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/cn";

type LiveProjectButtonProps = {
  href: string;
  label?: string;
  className?: string;
  external?: boolean;
};

export function LiveProjectButton({
  href,
  label = "View Project",
  className,
  external = false,
}: LiveProjectButtonProps) {
  const classes = cn(
    "inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border-2 border-foreground px-5 py-2 text-xs font-medium tracking-widest text-foreground uppercase transition-colors duration-200 hover:bg-foreground/10 focus-visible:bg-foreground/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] sm:px-10 sm:py-3.5 sm:text-base",
    className,
  );
  const content = (
    <>
      <span>{label}</span>
      <ArrowUpRight aria-hidden="true" className="ml-1.5 size-[1em]" />
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
