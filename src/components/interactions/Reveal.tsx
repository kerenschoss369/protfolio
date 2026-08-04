"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";

import { cn } from "@/lib/cn";
import {
  getServerReducedMotionSnapshot,
  getReducedMotionSnapshot,
  motionBudget,
  subscribeReducedMotion,
} from "@/lib/motion";

const REVEAL_ATTR = "data-reveal";
const REVEALED_ATTR = "data-revealed";
const ENHANCED_ATTR = "data-reveal-enhanced";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger index for closely related siblings (capped by motion budget). */
  stagger?: number;
  as?: "div" | "section" | "article" | "li" | "header";
};

/**
 * Progressive section reveal.
 * Server markup stays visible. Enhancement only activates after layout when
 * reduced motion is off; in-view nodes are marked revealed before hiding others.
 */
export function Reveal({
  children,
  className,
  stagger = 0,
  as: Component = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const delayMs = Math.min(
    stagger * motionBudget.staggerStepMs,
    motionBudget.staggerMaxMs,
  );

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    let cancelled = false;
    let observer: IntersectionObserver | null = null;

    function enhance() {
      if (cancelled || !node) {
        return;
      }

      if (getReducedMotionSnapshot()) {
        node.setAttribute(REVEALED_ATTR, "");
        return;
      }

      const root = document.documentElement;
      if (!root.hasAttribute(ENHANCED_ATTR)) {
        return;
      }

      const rect = node.getBoundingClientRect();
      const alreadyVisible =
        rect.top < window.innerHeight * 0.92 && rect.bottom > 0;

      if (alreadyVisible) {
        node.setAttribute(REVEALED_ATTR, "");
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.setAttribute(REVEALED_ATTR, "");
              observer?.unobserve(entry.target);
            }
          }
        },
        {
          root: null,
          rootMargin: "0px 0px -6% 0px",
          threshold: 0.08,
        },
      );

      observer.observe(node);
    }

    enhance();
    const unsubscribe = subscribeReducedMotion(() => {
      if (getReducedMotionSnapshot()) {
        node.setAttribute(REVEALED_ATTR, "");
        observer?.disconnect();
        observer = null;
        document.documentElement.removeAttribute(ENHANCED_ATTR);
      }
    });

    return () => {
      cancelled = true;
      unsubscribe();
      observer?.disconnect();
    };
  }, []);

  const style = {
    ["--reveal-delay" as string]: `${delayMs}ms`,
  } as CSSProperties;

  return (
    <Component
      ref={ref as never}
      className={cn(className)}
      {...{ [REVEAL_ATTR]: "" }}
      style={style}
    >
      {children}
    </Component>
  );
}

/**
 * Enables reveal CSS only after marking above-the-fold targets as revealed.
 * Mount once near the document root (AppShell).
 */
export function RevealEnhancer() {
  useLayoutEffect(() => {
    const root = document.documentElement;

    function sync() {
      const reduced =
        getReducedMotionSnapshot() || getServerReducedMotionSnapshot();

      if (reduced) {
        root.removeAttribute(ENHANCED_ATTR);
        document.querySelectorAll(`[${REVEAL_ATTR}]`).forEach((node) => {
          node.setAttribute(REVEALED_ATTR, "");
        });
        return;
      }

      const nodes = document.querySelectorAll<HTMLElement>(`[${REVEAL_ATTR}]`);
      nodes.forEach((node) => {
        const rect = node.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
          node.setAttribute(REVEALED_ATTR, "");
        }
      });

      root.setAttribute(ENHANCED_ATTR, "");
    }

    sync();
    return subscribeReducedMotion(sync);
  }, []);

  return null;
}

/** Test helper: reveal attributes used by progressive enhancement. */
export const revealTestIds = {
  attr: REVEAL_ATTR,
  revealed: REVEALED_ATTR,
  enhanced: ENHANCED_ATTR,
} as const;
