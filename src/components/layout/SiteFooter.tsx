import { portfolio } from "@/data/portfolio";
import { getConfiguredExternalLinks } from "@/data/links";

export function SiteFooter() {
  const links = getConfiguredExternalLinks();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[var(--border-subtle)] bg-[var(--surface-1)]">
      <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-3 px-4 py-8 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>
          © {year} {portfolio.name}
        </p>
        <ul className="flex flex-wrap gap-4">
          {links.githubUrl ? (
            <li>
              <a
                href={links.githubUrl}
                rel="noopener noreferrer"
                target="_blank"
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
              >
                LinkedIn
              </a>
            </li>
          ) : null}
          {links.email ? (
            <li>
              <a href={`mailto:${links.email}`}>Email</a>
            </li>
          ) : null}
        </ul>
      </div>
    </footer>
  );
}
