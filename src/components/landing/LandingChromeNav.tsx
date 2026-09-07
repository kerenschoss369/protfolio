"use client";

import { getConfiguredExternalLinks } from "@/data/links";
import { landingSectionNavItems } from "@/data/navigation";
import { cn } from "@/lib/cn";
import { scrollToElementId } from "@/lib/scroll-to-section";

type LandingChromeNavProps = {
  className?: string;
};

export function LandingChromeNav({ className }: LandingChromeNavProps) {
  const links = getConfiguredExternalLinks();

  return (
    <nav aria-label="Primary" className={cn("relative z-40 w-full", className)}>
      <ul className="landing-measure flex w-full items-center justify-between px-5 pt-6 sm:px-8 md:px-10 md:pt-8">
        {landingSectionNavItems.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className="landing-nav-link"
              data-section={item.id}
              onClick={() => scrollToElementId(item.id)}
            >
              {item.label}
            </button>
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
