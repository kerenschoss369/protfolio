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
        "inline-flex items-center justify-center rounded-full px-8 py-3 text-xs font-medium tracking-widest text-[#D7E2EA] uppercase transition-[opacity,background,box-shadow] duration-200 hover:opacity-95 sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base",
        className,
      )}
      style={{
        background:
          "linear-gradient(135deg, #141618 0%, #1e2329 42%, #2c333c 78%, #3a434e 100%)",
        boxShadow:
          "0 4px 14px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(215, 226, 234, 0.12), inset 0 -1px 0 rgba(0, 0, 0, 0.4)",
        outline: "2px solid #D7E2EA",
        outlineOffset: "-3px",
      }}
    >
      {label}
    </a>
  );

  if (!magnetic) return button;

  return (
    <Magnet padding={80} strength={8}>
      {button}
    </Magnet>
  );
}
