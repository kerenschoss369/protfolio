"use client";

import { useEffect, useRef } from "react";

import { useFinePointer } from "@/hooks/useFinePointer";
import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";

type InvertCursorProps = {
  color?: string;
  size?: number;
};

/**
 * Invert-shape cursor: a filled circle that follows the pointer and
 * inverts pixels underneath via mix-blend-mode: difference.
 * Used only in the About section.
 */
export function InvertCursor({
  color = "#ffffff",
  size = 150,
}: InvertCursorProps) {
  const finePointer = useFinePointer();
  const reducedMotion = useReducedMotionPreference();
  const enabled = finePointer && !reducedMotion;
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const dot = dotRef.current;
    const host = dot?.parentElement;
    if (!dot || !host) {
      return;
    }

    const half = size / 2;
    let raf = 0;
    let pending: { x: number; y: number } | null = null;

    const paint = () => {
      raf = 0;
      if (!pending) {
        return;
      }
      dot.style.transform = `translate3d(${pending.x - half}px, ${pending.y - half}px, 0)`;
    };

    const onMove = (event: PointerEvent) => {
      pending = { x: event.clientX, y: event.clientY };
      const overPicture = Boolean(
        event.target instanceof Element &&
          event.target.closest(".about-pic-frame"),
      );
      dot.style.opacity = overPicture ? "0" : "1";
      if (raf === 0) {
        raf = requestAnimationFrame(paint);
      }
    };

    const onLeave = () => {
      pending = null;
      dot.style.opacity = "0";
    };

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);

    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      if (raf !== 0) {
        cancelAnimationFrame(raf);
      }
    };
  }, [enabled, size]);

  if (!enabled) {
    return null;
  }

  return (
    <div
      ref={dotRef}
      className="about-invert-cursor"
      aria-hidden
      style={{
        width: size,
        height: size,
        backgroundColor: color,
      }}
    />
  );
}
