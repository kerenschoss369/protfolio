"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

type Options = {
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
};

export function useElementInView<T extends Element>(
  options: Options = {},
): [RefObject<T | null>, boolean] {
  const {
    rootMargin = "0px 0px -8% 0px",
    threshold = 0.2,
    once = true,
  } = options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) {
          return;
        }

        if (entry.isIntersecting) {
          setInView(true);
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return [ref, inView];
}
