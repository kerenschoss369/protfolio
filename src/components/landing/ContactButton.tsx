"use client";

import { Magnet } from "@/components/landing/Magnet";
import { cn } from "@/lib/cn";

type ContactButtonProps = {
  href?: string;
  label?: string;
  className?: string;
  magnetic?: boolean;
};

export function ContactButton({
  href = "#contact",
  label = "Contact Me",
  className,
  magnetic = true,
}: ContactButtonProps) {
  const button = (
    <a
      href={href}
      className={cn(
        "landing-cta text-foreground inline-flex min-h-11 items-center justify-center rounded-full px-8 py-3 text-xs font-medium tracking-widest uppercase transition-[opacity,background,box-shadow] duration-200 hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base",
        className,
      )}
    >
      {label}
    </a>
  );

  if (!magnetic) return button;

  return (
    <Magnet padding={48} strength={12} maxOffset={4}>
      {button}
    </Magnet>
  );
}
