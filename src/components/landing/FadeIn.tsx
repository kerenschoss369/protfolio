"use client";

import { m, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  as?: "div" | "nav" | "header" | "section" | "p" | "ul";
  "aria-label"?: string;
};

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  as = "div",
  className,
  "aria-label": ariaLabel,
}: FadeInProps) {
  const reducedMotion = useReducedMotion();
  const a11y = ariaLabel ? { "aria-label": ariaLabel } : {};

  if (reducedMotion) {
    switch (as) {
      case "nav":
        return (
          <nav className={className} {...a11y}>
            {children}
          </nav>
        );
      case "header":
        return <header className={className}>{children}</header>;
      case "section":
        return <section className={className}>{children}</section>;
      case "p":
        return <p className={className}>{children}</p>;
      case "ul":
        return <ul className={className}>{children}</ul>;
      default:
        return <div className={className}>{children}</div>;
    }
  }

  const motionProps = {
    className: cn(className),
    initial: { opacity: 0, x, y },
    whileInView: { opacity: 1, x: 0, y: 0 },
    viewport: { once: true, margin: "50px" as const, amount: 0 as const },
    transition: { delay, duration, ease: EASE },
    ...a11y,
  };

  switch (as) {
    case "nav":
      return <m.nav {...motionProps}>{children}</m.nav>;
    case "header":
      return <m.header {...motionProps}>{children}</m.header>;
    case "section":
      return <m.section {...motionProps}>{children}</m.section>;
    case "p":
      return <m.p {...motionProps}>{children}</m.p>;
    case "ul":
      return <m.ul {...motionProps}>{children}</m.ul>;
    default:
      return <m.div {...motionProps}>{children}</m.div>;
  }
}
