"use client";

import { useCallback, useEffect, useRef, type PointerEvent } from "react";

import { useFinePointer } from "@/hooks/useFinePointer";
import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";

/**
 * Pointer-follow glow via CSS variables. No React render loop.
 * Disabled for coarse pointers and reduced motion.
 */
export function usePointerGlow<T extends HTMLElement>() {
  const finePointer = useFinePointer();
  const reducedMotion = useReducedMotionPreference();
  const enabled = finePointer && !reducedMotion;
  const ref = useRef<T | null>(null);
  const boundsRef = useRef<DOMRect | null>(null);
  const rafRef = useRef<number | null>(null);
  const pendingRef = useRef<{ x: number; y: number } | null>(null);

  const cacheBounds = useCallback(() => {
    const el = ref.current;
    boundsRef.current = el ? el.getBoundingClientRect() : null;
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) {
      el?.style.setProperty("--glow-opacity", "0");
      return;
    }

    cacheBounds();
    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(cacheBounds)
        : null;
    observer?.observe(el);
    window.addEventListener("scroll", cacheBounds, { passive: true });
    window.addEventListener("resize", cacheBounds);

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", cacheBounds);
      window.removeEventListener("resize", cacheBounds);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [cacheBounds, enabled]);

  const onPointerMove = useCallback(
    (event: PointerEvent<T>) => {
      if (!enabled) {
        return;
      }

      pendingRef.current = { x: event.clientX, y: event.clientY };
      if (rafRef.current !== null) {
        return;
      }

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const el = ref.current;
        const pending = pendingRef.current;
        const bounds = boundsRef.current ?? el?.getBoundingClientRect() ?? null;
        if (!el || !pending || !bounds || bounds.width === 0) {
          return;
        }

        const x = ((pending.x - bounds.left) / bounds.width) * 100;
        const y = ((pending.y - bounds.top) / bounds.height) * 100;
        el.style.setProperty("--glow-x", `${x}%`);
        el.style.setProperty("--glow-y", `${y}%`);
        el.style.setProperty("--glow-opacity", "1");
      });
    },
    [enabled],
  );

  const onPointerLeave = useCallback(() => {
    ref.current?.style.setProperty("--glow-opacity", "0");
  }, []);

  return {
    ref,
    enabled,
    onPointerMove: enabled ? onPointerMove : undefined,
    onPointerLeave: enabled ? onPointerLeave : undefined,
  };
}
