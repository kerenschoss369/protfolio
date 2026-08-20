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

/** Rescue visible nodes if IntersectionObserver misses (Safari/iOS). */
const VISIBLE_RESCUE_MS = 1200;

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger index for closely related siblings (capped by motion budget). */
  stagger?: number;
  as?: "div" | "section" | "article" | "li" | "header";
};

function isAlreadyVisible(node: HTMLElement): boolean {
  const rect = node.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.98 && rect.bottom > 0;
}

function revealVisiblePending() {
  document.querySelectorAll<HTMLElement>(`[${REVEAL_ATTR}]`).forEach((node) => {
    if (!node.hasAttribute(REVEALED_ATTR) && isAlreadyVisible(node)) {
      node.setAttribute(REVEALED_ATTR, "");
    }
  });
}

/**
 * Progressive section reveal.
 * Server markup stays visible. Enhancement only activates after layout when
 * reduced motion is off; in-view nodes are marked revealed before hiding others.
 * Safari/WebKit: pixel rootMargin, threshold 0, deferred enhance, and a
 * visibility rescue so in-view content never stays stuck at opacity 0.
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
    let rescueTimer = 0;

    function markRevealed() {
      node?.setAttribute(REVEALED_ATTR, "");
      if (rescueTimer) {
        window.clearTimeout(rescueTimer);
        rescueTimer = 0;
      }
    }

    function attachObserver() {
      if (cancelled || !node || observer) {
        return;
      }

      // Pixel margins avoid Safari percentage rootMargin quirks.
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting || entry.intersectionRatio > 0) {
              entry.target.setAttribute(REVEALED_ATTR, "");
              observer?.unobserve(entry.target);
              if (rescueTimer) {
                window.clearTimeout(rescueTimer);
                rescueTimer = 0;
              }
            }
          }
        },
        {
          root: null,
          rootMargin: "0px 0px -48px 0px",
          threshold: 0,
        },
      );

      observer.observe(node);

      rescueTimer = window.setTimeout(() => {
        if (!cancelled && node && !node.hasAttribute(REVEALED_ATTR)) {
          if (isAlreadyVisible(node)) {
            markRevealed();
          }
        }
      }, VISIBLE_RESCUE_MS);
    }

    function enhance() {
      if (cancelled || !node) {
        return;
      }

      if (getReducedMotionSnapshot()) {
        markRevealed();
        return;
      }

      if (isAlreadyVisible(node) || node.hasAttribute(REVEALED_ATTR)) {
        markRevealed();
        return;
      }

      // Attach observers immediately; CSS hiding waits for data-reveal-enhanced.
      attachObserver();
    }

    enhance();
    const unsubscribe = subscribeReducedMotion(() => {
      if (getReducedMotionSnapshot()) {
        markRevealed();
        observer?.disconnect();
        observer = null;
        document.documentElement.removeAttribute(ENHANCED_ATTR);
      }
    });

    return () => {
      cancelled = true;
      unsubscribe();
      observer?.disconnect();
      if (rescueTimer) {
        window.clearTimeout(rescueTimer);
      }
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
 * Defers the enhanced flag one frame so observers can attach first (Safari).
 */
export function RevealEnhancer() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    let cancelled = false;

    function onScrollOrResize() {
      revealVisiblePending();
    }

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
        if (isAlreadyVisible(node)) {
          node.setAttribute(REVEALED_ATTR, "");
        }
      });

      // Defer hiding until after the next paint so individual Reveal effects
      // can attach IntersectionObservers before opacity is forced to 0.
      frame = window.requestAnimationFrame(() => {
        frame = window.requestAnimationFrame(() => {
          if (cancelled) {
            return;
          }
          revealVisiblePending();
          root.setAttribute(ENHANCED_ATTR, "");
        });
      });
    }

    sync();
    const unsubscribe = subscribeReducedMotion(sync);
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      cancelled = true;
      unsubscribe();
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  return null;
}

/** Test helper: reveal attributes used by progressive enhancement. */
export const revealTestIds = {
  attr: REVEAL_ATTR,
  revealed: REVEALED_ATTR,
  enhanced: ENHANCED_ATTR,
  visibleRescueMs: VISIBLE_RESCUE_MS,
} as const;
