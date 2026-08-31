"use client";

import type { MouseEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { getConfiguredExternalLinks } from "@/data/links";
import { landingSectionNavItems } from "@/data/navigation";
import { cn } from "@/lib/cn";
import {
  isUnmodifiedLeftClick,
  rememberLandingSection,
  scrollToElementId,
} from "@/lib/scroll-to-section";

type LandingChromeNavProps = {
  includeHome?: boolean;
  className?: string;
};

export function LandingChromeNav({
  includeHome = false,
  className,
}: LandingChromeNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const links = getConfiguredExternalLinks();

  function goToSection(event: MouseEvent<HTMLElement>, id: string) {
    if (!isUnmodifiedLeftClick(event)) {
      return;
    }

    event.preventDefault();

    if (!includeHome || pathname === "/") {
      scrollToElementId(id);
      return;
    }

    rememberLandingSection(id);
    router.push("/");
  }

  return (
    <nav aria-label="Primary" className={cn("relative z-40 w-full", className)}>
      <ul className="landing-measure flex w-full items-center justify-between px-5 pt-6 sm:px-8 md:px-10 md:pt-8">
        {includeHome ? (
          <li>
            <Link href="/" className="landing-nav-link">
              Home
            </Link>
          </li>
        ) : null}
        {landingSectionNavItems.map((item) => (
          <li key={item.id}>
            {includeHome ? (
              <Link
                href="/"
                className="landing-nav-link"
                data-section={item.id}
                onClick={(event) => goToSection(event, item.id)}
              >
                {item.label}
              </Link>
            ) : (
              <button
                type="button"
                className="landing-nav-link"
                data-section={item.id}
                onClick={() => scrollToElementId(item.id)}
              >
                {item.label}
              </button>
            )}
          </li>
        ))}
        <li>
          {links.cvPath ? (
            <a
              href={links.cvPath}
              className="landing-nav-link landing-nav-cv"
              download
            >
              Download CV
            </a>
          ) : (
            <span className="landing-nav-link landing-nav-cv opacity-50">
              Download CV
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}
