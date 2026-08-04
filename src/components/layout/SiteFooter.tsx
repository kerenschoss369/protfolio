import Link from "next/link";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Container } from "@/components/ui/Container";
import { getConfiguredExternalLinks } from "@/data/links";
import { primaryNavItems } from "@/data/navigation";
import { portfolio } from "@/data/portfolio";

export function SiteFooter() {
  const links = getConfiguredExternalLinks();
  const year = new Date().getFullYear();

  return (
    <footer className="border-border-subtle bg-surface-1 mt-auto border-t">
      <Container className="flex flex-col gap-8 py-10 sm:py-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md space-y-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-medium tracking-tight"
              aria-label={`${portfolio.name} home`}
            >
              <span
                aria-hidden
                className="border-border-subtle text-steel inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] border font-mono text-[length:var(--text-meta)] tracking-[var(--tracking-meta)] uppercase"
              >
                KS
              </span>
              {portfolio.name}
            </Link>
            <p className="text-muted text-[length:var(--text-sm)] leading-[var(--leading-relaxed)]">
              Precise interfaces. Thoughtful systems. Visual clarity.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <nav aria-label="Footer">
              <p className="text-muted mb-3 font-mono text-[length:var(--text-meta)] tracking-[var(--tracking-meta)] uppercase">
                Navigate
              </p>
              <ul className="space-y-2 text-[length:var(--text-sm)]">
                {primaryNavItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="hover:text-foreground text-muted inline-flex min-h-11 items-center"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="text-muted mb-3 font-mono text-[length:var(--text-meta)] tracking-[var(--tracking-meta)] uppercase">
                Connect
              </p>
              <ul className="space-y-2 text-[length:var(--text-sm)]">
                {links.githubUrl ? (
                  <li>
                    <a
                      href={links.githubUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="hover:text-foreground text-muted inline-flex min-h-11 items-center"
                    >
                      GitHub
                    </a>
                  </li>
                ) : null}
                {links.linkedinUrl ? (
                  <li>
                    <a
                      href={links.linkedinUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="hover:text-foreground text-muted inline-flex min-h-11 items-center"
                    >
                      LinkedIn
                    </a>
                  </li>
                ) : null}
                {links.email ? (
                  <li>
                    <a
                      href={`mailto:${links.email}`}
                      className="hover:text-foreground text-muted inline-flex min-h-11 items-center"
                    >
                      Email
                    </a>
                  </li>
                ) : null}
                {links.cvPath ? (
                  <li>
                    <a
                      href={links.cvPath}
                      className="hover:text-foreground text-muted inline-flex min-h-11 items-center"
                    >
                      Download CV
                    </a>
                  </li>
                ) : null}
                {!links.githubUrl &&
                !links.linkedinUrl &&
                !links.email &&
                !links.cvPath ? (
                  <li className="text-muted min-h-11 py-2">
                    Links available when configured
                  </li>
                ) : null}
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <p className="text-muted mb-3 font-mono text-[length:var(--text-meta)] tracking-[var(--tracking-meta)] uppercase">
                Appearance
              </p>
              <ThemeToggle />
            </div>
          </div>
        </div>

        <div className="border-border-subtle flex flex-col gap-2 border-t pt-6 text-[length:var(--text-sm)] text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {portfolio.name}
          </p>
          <p className="font-mono text-[length:var(--text-meta)] tracking-[var(--tracking-meta)] uppercase">
            {portfolio.location}
          </p>
        </div>
      </Container>
    </footer>
  );
}
