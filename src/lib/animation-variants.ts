import {
  distances,
  durations,
  easings,
  springs,
  stagger,
} from "@/lib/animation-config";

export const fadeUp = {
  hidden: {
    opacity: 0,
    y: distances.settleRem * 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.base,
      ease: easings.entrance,
    },
  },
} as const;

export const fadeOnly = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: durations.fast, ease: easings.standard },
  },
} as const;

export const maskReveal = {
  hidden: {
    y: "110%",
    opacity: 0.4,
  },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: durations.slow,
      ease: easings.entrance,
    },
  },
} as const;

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger.step,
      delayChildren: 0.04,
    },
  },
} as const;

export const scalePress = {
  rest: { scale: 1 },
  press: { scale: 0.985, transition: springs.snappy },
} as const;

export const reducedMotionFade = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0 },
  },
} as const;
