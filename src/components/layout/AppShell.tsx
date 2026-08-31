"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { CommandMenuHost } from "@/components/command-menu/CommandMenuHost";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { RevealEnhancer } from "@/components/interactions/Reveal";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SkipLink } from "@/components/layout/SkipLink";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { getProjectBySlug } from "@/lib/project-utils";

function usesLandingChrome(pathname: string) {
  if (pathname === "/" || pathname === "/work") {
    return true;
  }

  const match = pathname.match(/^\/work\/([^/]+)\/?$/);
  if (!match?.[1]) {
    return false;
  }

  return Boolean(getProjectBySlug(match[1]));
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLandingChrome = usesLandingChrome(pathname);

  return (
    <MotionProvider>
      <CommandMenuHost>
        <SkipLink />
        {!isLandingChrome ? <ScrollProgress /> : null}
        {!isLandingChrome ? <RevealEnhancer /> : null}
        {!isLandingChrome ? <SiteHeader /> : null}
        <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        {!isLandingChrome ? <SiteFooter /> : null}
        <CustomCursor />
      </CommandMenuHost>
    </MotionProvider>
  );
}
