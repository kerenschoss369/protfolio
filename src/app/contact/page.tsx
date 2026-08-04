import { TextLink } from "@/components/ui/TextLink";
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

      <section
        className="mt-10 max-w-3xl space-y-4"
        aria-label="Contact methods"
      >
        {hasAnyLink ? (
          <ul className="space-y-3 text-base">
            {links.email ? (
              <li>
                <TextLink href={`mailto:${links.email}`}>
                  Email {portfolio.name}
                </TextLink>
              </li>
            ) : null}
            {links.linkedinUrl ? (
              <li>
                <TextLink href={links.linkedinUrl} external>
                  LinkedIn
                </TextLink>
              </li>
            ) : null}
            {links.githubUrl ? (
              <li>
                <TextLink href={links.githubUrl} external>
                  GitHub
                </TextLink>
              </li>
            ) : null}
            {links.cvPath ? (
              <li>
                <TextLink href={links.cvPath}>Download CV</TextLink>
              </li>
            ) : null}
          </ul>
        ) : (
          <p className="text-sm text-[var(--muted)]">
            Contact methods are not configured yet. Verified email, LinkedIn,
            GitHub, and CV links will appear here when available — no
            placeholder actions are shown.
          </p>
        )}
      </section>
    </div>
  );
}
