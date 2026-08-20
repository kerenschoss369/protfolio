"use client";

import { m } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";

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
 * SSR and first paint stay fully visible; Motion only enhances after mount
 * so Safari/WebKit never leave brand copy or CTAs stuck invisible.
 */
export function AnimatedText({
  children,
  className,
  as = "div",
  delay = 0,
  masked = true,
}: AnimatedTextProps) {
  const reducedMotion = useReducedMotionPreference();
  const [enhance, setEnhance] = useState(false);

  useEffect(() => {
    setEnhance(true);
  }, []);

  const Tag = m[as];
  const Static = as;

  if (reducedMotion || !enhance) {
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
  const [enhance, setEnhance] = useState(false);

  useEffect(() => {
    setEnhance(true);
  }, []);

  if (reducedMotion || !enhance) {
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
  const [enhance, setEnhance] = useState(false);

  useEffect(() => {
    setEnhance(true);
  }, []);

  if (reducedMotion || !enhance) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      className={className}
      variants={{
        // Keep a readable floor opacity in case animation never commits.
        hidden: { opacity: 0.01, y: distances.settleRem * 12 },
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
