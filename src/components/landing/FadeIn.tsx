"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";
import { cn } from "@/lib/cn";

type FadeInTag = "div" | "nav" | "header" | "section" | "p" | "ul" | "li" | "span";

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  as?: FadeInTag;
  "aria-label"?: string;
};

/**
 * Progressive-enhancement fade. SSR and no-JS render at full opacity.
 * After hydration, entries fade in with delay / offset, including above-the-fold.
 */
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
  const reducedMotion = useReducedMotionPreference();
  const ref = useRef<HTMLElement | null>(null);
  const Tag = as;
  const a11y = ariaLabel ? { "aria-label": ariaLabel } : {};

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) {
      return;
    }

    el.classList.add("fade-pending");
    void el.offsetWidth;

    const reveal = () => {
      el.classList.add("is-visible");
    };

    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView) {
      const frame = window.requestAnimationFrame(reveal);
      return () => window.cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { rootMargin: "50px", threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const setRef = (node: HTMLElement | null) => {
    ref.current = node;
  };

  return (
    <Tag
      ref={setRef}
      className={cn(className)}
      style={{
        ["--fade-delay" as string]: `${delay}s`,
        ["--fade-duration" as string]: `${duration}s`,
        ["--fade-x" as string]: `${x}px`,
        ["--fade-y" as string]: `${y}px`,
      }}
      {...a11y}
    >
      {children}
    </Tag>
  );
}
