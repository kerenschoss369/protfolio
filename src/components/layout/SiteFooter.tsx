import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { getConfiguredExternalLinks } from "@/data/links";
import { portfolio } from "@/data/portfolio";

export function SiteFooter() {
  const links = getConfiguredExternalLinks();
  const year = new Date().getFullYear();

  return (
    <footer className="border-border-subtle mt-auto border-t">
      <Container className="flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:py-10">
        <div className="space-y-1">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[length:var(--text-sm)] font-medium tracking-tight"
            aria-label={`${portfolio.name} home`}
          >
            <span
              aria-hidden
              className="border-border-subtle text-steel inline-flex h-7 w-7 items-center justify-center rounded-[var(--radius-sm)] border font-mono text-[length:var(--text-meta)] tracking-[var(--tracking-meta)] uppercase"
            >
              KS
            </span>
            {portfolio.name}
          </Link>
          <p className="text-muted font-mono text-[length:var(--text-meta)] tracking-[var(--tracking-meta)] uppercase">
            © {year} · {portfolio.location}
          </p>
        </div>

        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[length:var(--text-sm)]">
          <li>
            <Link
              href="/work"
              className="text-muted hover:text-foreground inline-flex min-h-11 items-center"
            >
              Work
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="text-muted hover:text-foreground inline-flex min-h-11 items-center"
            >
              Contact
            </Link>
          </li>
          {links.githubUrl ? (
            <li>
              <a
                href={links.githubUrl}
                rel="noopener noreferrer"
                target="_blank"
                className="text-muted hover:text-foreground inline-flex min-h-11 items-center"
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
                className="text-muted hover:text-foreground inline-flex min-h-11 items-center"
              >
                LinkedIn
              </a>
            </li>
          ) : null}
          {links.cvPath ? (
            <li>
              <a
                href={links.cvPath}
                className="text-muted hover:text-foreground inline-flex min-h-11 items-center"
              >
                CV
              </a>
            </li>
          ) : null}
        </ul>
      </Container>
    </footer>
  );
}
