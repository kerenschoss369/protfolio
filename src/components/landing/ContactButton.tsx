"use client";

import { Magnet } from "@/components/landing/Magnet";
import { cn } from "@/lib/cn";
import { scrollToElementId } from "@/lib/scroll-to-section";

type ContactButtonProps = {
  label?: string;
  className?: string;
  magnetic?: boolean;
};

export function ContactButton({
  label = "Contact Me",
  className,
  magnetic = true,
}: ContactButtonProps) {
  const button = (
    <button
      type="button"
      className={cn(
        "landing-cta text-foreground inline-flex min-h-11 cursor-pointer items-center justify-center rounded-full border-0 px-8 py-3 text-xs font-medium tracking-widest uppercase transition-[opacity,background,box-shadow] duration-200 hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base",
        className,
      )}
      onClick={() => scrollToElementId("contact")}
    >
      {label}
    </button>
  );

  if (!magnetic) return button;

  return (
    <Magnet padding={48} strength={12} maxOffset={4}>
      {button}
    </Magnet>
  );
}
