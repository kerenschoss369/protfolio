import Link from "next/link";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { portfolio } from "@/data/portfolio";
import { getConfiguredExternalLinks } from "@/data/links";

const navItems = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const links = getConfiguredExternalLinks();

  return (
    <header className="border-b border-[var(--border-subtle)] bg-[var(--background)]">
      <div className="mx-auto flex w-full max-w-[1480px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-medium tracking-tight text-[var(--foreground)]"
        >
          {portfolio.name}
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-2 sm:gap-4">
          <ul className="flex items-center gap-3 text-sm sm:gap-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center text-[var(--muted)] hover:text-[var(--foreground)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {links.cvPath ? (
            <a
              href={links.cvPath}
              className="inline-flex min-h-11 items-center text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              Download CV
            </a>
          ) : null}

          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
