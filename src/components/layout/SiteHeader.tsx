"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Command, Menu } from "lucide-react";

import {
  CommandMenu,
  useCommandMenuShortcut,
} from "@/components/command-menu/CommandMenu";
import { MobileNav } from "@/components/navigation/MobileNav";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { IconButton } from "@/components/ui/IconButton";
import { getConfiguredExternalLinks } from "@/data/links";
import { primaryNavItems } from "@/data/navigation";
import { portfolio } from "@/data/portfolio";
import { cn } from "@/lib/cn";

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const links = getConfiguredExternalLinks();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  const openCommandMenu = useCallback(() => {
    setMobileOpen(false);
    setCommandOpen(true);
  }, []);

  useCommandMenuShortcut(
    useCallback(() => {
      setMobileOpen(false);
      setCommandOpen((current) => !current);
    }, []),
  );

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-[var(--z-sticky)] transition-[background-color,border-color,box-shadow] duration-[var(--duration-base)] ease-[var(--ease-standard)]",
          scrolled
            ? "border-border-subtle border-b bg-[color-mix(in_srgb,var(--background)_92%,transparent)] shadow-[var(--shadow-sm)] backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex w-full max-w-[var(--content-max)] items-center justify-between gap-3 px-[var(--space-gutter)] py-3">
          <Link
            href="/"
            className="group inline-flex min-h-[var(--touch-target)] items-center gap-2 tracking-tight"
            aria-label={`${portfolio.name} home`}
          >
            <span
              aria-hidden
              className="border-border-subtle text-steel inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] border font-mono text-[length:var(--text-meta)] tracking-[var(--tracking-meta)] uppercase"
            >
              KS
            </span>
            <span className="hidden font-medium sm:inline">
              {portfolio.name}
            </span>
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 lg:flex"
          >
            <ul className="flex items-center gap-1">
              {primaryNavItems.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "inline-flex min-h-[var(--touch-target)] items-center rounded-[var(--radius-md)] px-3 text-[length:var(--text-sm)] transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
                        active
                          ? "bg-surface-2 text-foreground"
                          : "text-muted hover:bg-surface-1 hover:text-foreground",
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {links.cvPath ? (
              <a
                href={links.cvPath}
                className="text-muted hover:bg-surface-1 hover:text-foreground inline-flex min-h-[var(--touch-target)] items-center rounded-[var(--radius-md)] px-3 text-[length:var(--text-sm)]"
              >
                Download CV
              </a>
            ) : null}

            <ThemeToggle />

            <IconButton
              label="Open command menu"
              onClick={openCommandMenu}
              aria-keyshortcuts="Meta+K Control+K"
            >
              <Command size={18} aria-hidden />
            </IconButton>
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <IconButton
              label="Open command menu"
              onClick={openCommandMenu}
              aria-keyshortcuts="Meta+K Control+K"
            >
              <Command size={18} aria-hidden />
            </IconButton>
            <IconButton
              label="Open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={18} aria-hidden />
            </IconButton>
          </div>
        </div>
      </header>

      <div id="mobile-navigation">
        <MobileNav
          open={mobileOpen}
          onOpenChange={setMobileOpen}
          cvPath={links.cvPath}
          onOpenCommandMenu={openCommandMenu}
        />
      </div>

      <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} />
    </>
  );
}
