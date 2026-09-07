"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";

import {
  isUnmodifiedLeftClick,
  rememberLandingSection,
  scrollToElementId,
} from "@/lib/scroll-to-section";

type HomeSectionLinkProps = {
  section: string;
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
};

export function HomeSectionLink({
  section,
  className,
  children,
  onNavigate,
}: HomeSectionLinkProps) {
  const pathname = usePathname();

  function onClick(event: MouseEvent<HTMLAnchorElement>) {
    onNavigate?.();

    if (!isUnmodifiedLeftClick(event)) {
      return;
    }

    if (pathname === "/") {
      event.preventDefault();
      scrollToElementId(section);
      return;
    }

    rememberLandingSection(section);
  }

  return (
    <Link href="/" className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
