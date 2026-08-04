"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";

import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";
import { distances, durations, easings, stagger } from "@/lib/animation-config";
import { cn } from "@/lib/cn";

type AnimatedTextProps = {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  delay?: number;
  /** When true, wraps children in an overflow-hidden mask for editorial reveal */
  masked?: boolean;
};

/**
 * Editorial entrance for a single phrase/line.
 * SSR HTML remains present and crawlable; animation is progressive enhancement.
 */
export function AnimatedText({
  children,
  className,
  as = "div",
  delay = 0,
  masked = true,
}: AnimatedTextProps) {
  const reducedMotion = useReducedMotionPreference();
  const Tag = m[as];

  if (reducedMotion) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  if (masked) {
    return (
      <span className={cn("block overflow-hidden", className)}>
        <Tag
          initial={{ y: "110%", opacity: 0.35 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{
            duration: durations.slow,
            ease: easings.entrance,
            delay,
          }}
          className="block"
        >
          {children}
        </Tag>
      </span>
    );
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0.45, y: distances.settleRem * 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: durations.base,
        ease: easings.entrance,
        delay,
      }}
    >
      {children}
    </Tag>
  );
}

type StaggerGroupProps = {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
};

export function StaggerGroup({
  children,
  className,
  delayChildren = 0.04,
}: StaggerGroupProps) {
  const reducedMotion = useReducedMotionPreference();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger.step,
            delayChildren,
          },
        },
      }}
    >
      {children}
    </m.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reducedMotion = useReducedMotionPreference();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: distances.settleRem * 12 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: durations.base, ease: easings.entrance },
        },
      }}
    >
      {children}
    </m.div>
  );
}
