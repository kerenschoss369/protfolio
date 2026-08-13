"use client";

import Link from "next/link";
import { Command } from "lucide-react";

import { useCommandMenu } from "@/components/command-menu/CommandMenuHost";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { IconButton } from "@/components/ui/IconButton";
import { getConfiguredExternalLinks } from "@/data/links";
import { primaryNavItems } from "@/data/navigation";
import { cn } from "@/lib/cn";

type LandingChromeNavProps = {
  includeHome?: boolean;
  className?: string;
};

export function LandingChromeNav({
  includeHome = false,
  className,
}: LandingChromeNavProps) {
  const links = getConfiguredExternalLinks();
  const { openCommandMenu } = useCommandMenu();

  const items = includeHome
    ? [{ href: "/", label: "Home" }, ...primaryNavItems]
    : [...primaryNavItems];

  return (
    <nav aria-label="Primary" className={cn("relative z-40", className)}>
      <div className="flex items-center justify-between gap-2 px-4 pt-3 sm:px-6 sm:pt-4 md:px-10 md:pt-6">
        <ul className="flex min-w-0 flex-1 flex-wrap items-center gap-x-1 gap-y-1">
          {items.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="landing-nav-link">
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            {links.cvPath ? (
              <a
                href={links.cvPath}
                className="landing-nav-link"
                download
                aria-label="Download CV"
              >
                CV
              </a>
            ) : (
              <span className="landing-nav-link text-muted">CV</span>
            )}
          </li>
        </ul>
        <div className="flex shrink-0 items-center gap-1">
          <ThemeToggle />
          <IconButton
            label="Open command menu"
            onClick={openCommandMenu}
            aria-keyshortcuts="Meta+K Control+K"
          >
            <Command size={18} aria-hidden />
          </IconButton>
        </div>
      </div>
    </nav>
  );
}
