"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { RevealEnhancer } from "@/components/interactions/Reveal";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SkipLink } from "@/components/layout/SkipLink";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { ScrollProgress } from "@/components/motion/ScrollProgress";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLanding = pathname === "/";

  return (
    <MotionProvider>
      <SkipLink />
      {!isLanding ? <ScrollProgress /> : null}
      {!isLanding ? <RevealEnhancer /> : null}
      {!isLanding ? <SiteHeader /> : null}
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      {!isLanding ? <SiteFooter /> : null}
    </MotionProvider>
  );
}
