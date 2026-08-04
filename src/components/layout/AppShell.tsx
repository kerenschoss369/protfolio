import type { ReactNode } from "react";

import { RevealEnhancer } from "@/components/interactions/Reveal";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SkipLink } from "@/components/layout/SkipLink";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SkipLink />
      <RevealEnhancer />
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
