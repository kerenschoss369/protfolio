"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";
import { cn } from "@/lib/cn";

type FadeInTag = "div" | "nav" | "header" | "section" | "p" | "ul" | "li";

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
 * After hydration, only below-fold entries animate in.
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

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) {
      return;
    }

    const markVisible = () => {
      el.classList.add("is-visible");
      el.classList.remove("fade-pending");
    };

    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView) {
      markVisible();
      return;
    }

    el.classList.add("fade-pending");
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          markVisible();
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
