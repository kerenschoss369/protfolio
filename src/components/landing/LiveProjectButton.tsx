import Link from "next/link";

import { cn } from "@/lib/cn";

type LiveProjectButtonProps = {
  href: string;
  label?: string;
  className?: string;
  external?: boolean;
};

export function LiveProjectButton({
  href,
  label = "View Project ↗",
  className,
  external = false,
}: LiveProjectButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-sm font-medium tracking-widest text-[#D7E2EA] uppercase transition-colors duration-200 hover:bg-[#D7E2EA]/10 sm:px-10 sm:py-3.5 sm:text-base",
    className,
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {label}
    </Link>
  );
}
