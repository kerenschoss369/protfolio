"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import {
  consumeLandingSection,
  scrollToElementId,
} from "@/lib/scroll-to-section";

function scrollHomeSection(id: string): boolean {
  if (id === "top") {
    const top = document.getElementById("top");
    if (top) {
      top.scrollIntoView({ behavior: "auto", block: "start" });
      return true;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    return true;
  }

  return scrollToElementId(id);
}

export function LandingScrollRestore() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const id = consumeLandingSection();
    if (!id) {
      return;
    }

    let attempts = 0;
    let frame = 0;

    const tryScroll = () => {
      if (scrollHomeSection(id) || attempts >= 24) {
        return;
      }
      attempts += 1;
      frame = window.requestAnimationFrame(tryScroll);
    };

    frame = window.requestAnimationFrame(tryScroll);

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
