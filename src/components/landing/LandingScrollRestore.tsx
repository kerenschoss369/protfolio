"use client";

import { useEffect } from "react";

import {
  consumeLandingSection,
  scrollToElementId,
} from "@/lib/scroll-to-section";

export function LandingScrollRestore() {
  useEffect(() => {
    const id = consumeLandingSection();
    if (!id) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      scrollToElementId(id);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return null;
}
