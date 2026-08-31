"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";
import { scrollToElementId } from "@/lib/scroll-to-section";

const SHOW_AFTER_PX = 240;

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SHOW_AFTER_PX);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      className={cn("landing-back-top", visible && "is-visible")}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      onClick={() => scrollToElementId("top")}
    >
      <ArrowUp aria-hidden size={20} strokeWidth={2.5} />
    </button>
  );
}
