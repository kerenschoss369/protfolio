"use client";

import { scrollToElementId } from "@/lib/scroll-to-section";

export function SkipLink() {
  return (
    <button
      type="button"
      data-skip-link=""
      className="bg-accent text-accent-contrast absolute top-3 left-3 z-[var(--z-skip-link)] -translate-y-[200%] cursor-pointer rounded-[var(--radius-md)] border-0 px-4 py-2 font-sans transition-transform duration-[var(--duration-fast)] ease-[var(--ease-standard)] focus:translate-y-0"
      onClick={() => scrollToElementId("main-content", { focus: true })}
    >
      Skip to main content
    </button>
  );
}
