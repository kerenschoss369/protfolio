import type { ReactNode } from "react";

import { RevealEnhancer } from "@/components/interactions/Reveal";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SkipLink } from "@/components/layout/SkipLink";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { ScrollProgress } from "@/components/motion/ScrollProgress";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <MotionProvider>
      <SkipLink />
      <ScrollProgress />
      <RevealEnhancer />
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      <SiteFooter />
    </MotionProvider>
  );
}
