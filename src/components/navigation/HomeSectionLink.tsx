"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  const router = useRouter();

  function onClick(event: MouseEvent<HTMLAnchorElement>) {
    onNavigate?.();

    if (!isUnmodifiedLeftClick(event)) {
      return;
    }

    event.preventDefault();

    if (pathname === "/") {
      scrollToElementId(section);
      return;
    }

    rememberLandingSection(section);
    router.push("/");
  }

  return (
    <Link href="/" className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
