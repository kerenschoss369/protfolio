"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from "react";

import { distances } from "@/lib/animation-config";
import { useFinePointer } from "@/hooks/useFinePointer";
import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";

type PointerNorm = { x: number; y: number };

/**
 * Normalized pointer position (-1..1) with transform-only depth helpers.
 * Caches the element rect on enter/resize — never measures on every move.
 */
export function usePointerPosition(
  maxDepthPx: number = distances.pointerDepthMaxPx,
) {
  const finePointer = useFinePointer();
  const reducedMotion = useReducedMotionPreference();
  const enabled = finePointer && !reducedMotion;
  const rectRef = useRef<DOMRect | null>(null);
  const frameRef = useRef<number | null>(null);
  const [offset, setOffset] = useState<PointerNorm>({ x: 0, y: 0 });

  const cacheRect = useCallback((node: HTMLElement | null) => {
    if (!node) {
      rectRef.current = null;
      return;
    }
    rectRef.current = node.getBoundingClientRect();
  }, []);

  useEffect(() => {
    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const onPointerEnter = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (!enabled) {
        return;
      }
      cacheRect(event.currentTarget);
    },
    [cacheRect, enabled],
  );

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (!enabled) {
        return;
      }

      const rect = rectRef.current;
      if (!rect) {
        cacheRect(event.currentTarget);
        return;
      }

      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      const next = {
        x: Math.max(-1, Math.min(1, nx)),
        y: Math.max(-1, Math.min(1, ny)),
      };

      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }

      frameRef.current = window.requestAnimationFrame(() => {
        setOffset(next);
      });
    },
    [cacheRect, enabled],
  );

  const onPointerLeave = useCallback(() => {
    if (frameRef.current) {
      window.cancelAnimationFrame(frameRef.current);
    }
    setOffset({ x: 0, y: 0 });
  }, []);

  const depth = {
    x: offset.x * maxDepthPx,
    y: offset.y * maxDepthPx,
  };

  return {
    enabled,
    offset,
    depth,
    handlers: {
      onPointerEnter,
      onPointerMove,
      onPointerLeave,
    },
    bindResize: (ref: RefObject<HTMLElement | null>) => {
      cacheRect(ref.current);
    },
  };
}
