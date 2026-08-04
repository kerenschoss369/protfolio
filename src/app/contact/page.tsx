import { getConfiguredExternalLinks } from "@/data/links";
import { portfolio } from "@/data/portfolio";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact Keren Schoss about frontend development, full-stack engineering, and complex UI work.",
  path: "/contact",
});

export default function ContactPage() {
  const links = getConfiguredExternalLinks();
  const hasAnyLink = Boolean(
    links.email || links.linkedinUrl || links.githubUrl || links.cvPath,
  );

  return (
    <div className="mx-auto w-full max-w-[1480px] px-4 py-16 sm:px-6 lg:px-8">
      <header className="max-w-3xl space-y-4">
        <h1 className="font-serif text-4xl tracking-tight">Contact</h1>
        <p className="leading-7 text-[var(--muted)]">
          Open to conversations about frontend development, full-stack
          development, product engineering, and complex UI work.
        </p>
      </header>

      <section className="mt-10 max-w-3xl space-y-4">
        {hasAnyLink ? (
          <ul className="space-y-3 text-base">
            {links.email ? (
              <li>
                <a href={`mailto:${links.email}`}>Email {portfolio.name}</a>
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
            {links.cvPath ? (
              <li>
                <a href={links.cvPath}>Download CV</a>
              </li>
            ) : null}
          </ul>
        ) : (
          <p className="text-sm text-[var(--muted)]">
            Contact links are not configured yet. Add verified email, LinkedIn,
            GitHub, and CV values in central configuration when available.
          </p>
        )}
      </section>
    </div>
  );
}
