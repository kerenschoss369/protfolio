"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const navListRef = useRef<HTMLUListElement>(null);
  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0,
    ready: false,
  });

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

  useEffect(() => {
    const list = navListRef.current;
    if (!list) {
      return;
    }

    const activeLink = list.querySelector<HTMLElement>('[aria-current="page"]');

    function update() {
      if (!activeLink || !list) {
        setIndicator((current) => ({ ...current, width: 0, ready: false }));
        return;
      }

      const listRect = list.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      setIndicator({
        left: linkRect.left - listRect.left,
        width: linkRect.width,
        ready: true,
      });
    }

    update();

    const observer =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(update) : null;
    observer?.observe(list);
    if (activeLink) {
      observer?.observe(activeLink);
    }

    window.addEventListener("resize", update);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  return (
    <>
      <header
        data-theme-surface
        className={cn(
          "sticky top-0 z-[var(--z-sticky)] transition-[background-color,border-color,box-shadow,backdrop-filter] duration-[var(--duration-base)] ease-[var(--ease-standard)]",
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
              className="border-border-subtle text-steel group-hover:border-border-strong group-focus-visible:border-accent inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] border font-mono text-[length:var(--text-meta)] tracking-[var(--tracking-meta)] uppercase transition-[border-color] duration-[var(--duration-fast)] ease-[var(--ease-standard)]"
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
            <ul ref={navListRef} className="relative flex items-center gap-1">
              {primaryNavItems.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "relative inline-flex min-h-[var(--touch-target)] items-center rounded-[var(--radius-md)] px-3 text-[length:var(--text-sm)] transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
                        active
                          ? "text-foreground"
                          : "text-muted hover:bg-surface-1 hover:text-foreground",
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <span
                aria-hidden
                className={cn(
                  "bg-accent pointer-events-none absolute bottom-1 h-0.5 rounded-full transition-[transform,width,opacity] duration-[var(--duration-base)] ease-[var(--ease-emphasized)]",
                  indicator.ready ? "opacity-100" : "opacity-0",
                )}
                style={{
                  width: indicator.width,
                  transform: `translateX(${indicator.left}px)`,
                }}
              />
            </ul>

            {links.cvPath ? (
              <a
                href={links.cvPath}
                className="text-muted hover:bg-surface-1 hover:text-foreground inline-flex min-h-[var(--touch-target)] items-center rounded-[var(--radius-md)] px-3 text-[length:var(--text-sm)] transition-colors duration-[var(--duration-fast)]"
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
