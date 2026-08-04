"use client";

import { m, useScroll, useSpring } from "motion/react";

import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";
import { scroll } from "@/lib/animation-config";

/**
 * Thin page-progress indicator. Desktop-first; disabled under reduced motion.
 */
export function ScrollProgress() {
  const reducedMotion = useReducedMotionPreference();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  if (reducedMotion) {
    return null;
  }

  return (
    <m.div
      aria-hidden
      className="pointer-events-none fixed top-0 right-0 left-0 z-[var(--z-sticky)] origin-left bg-[var(--accent)] max-md:hidden"
      style={{
        scaleX,
        height: scroll.progressThicknessPx,
        opacity: 0.55,
      }}
    />
  );
}
