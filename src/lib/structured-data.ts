import type { Project } from "@/data/content-types";
import { getConfiguredExternalLinks } from "@/data/links";
import { portfolio } from "@/data/portfolio";
import { skillGroups } from "@/data/skills";
import { isClinicalFollowUpDetector } from "@/lib/content-validation";
import { isConfiguredHttpUrl } from "@/lib/links";

type JsonLd = Record<string, unknown>;

function siteUrlOrUndefined(): string | undefined {
  const { siteUrl } = getConfiguredExternalLinks();
  return siteUrl ?? undefined;
}

/**
 * Person structured data from verified facts only.
 * Omits null social links, fake images, and unsupported claims.
 */
export function buildPersonJsonLd(): JsonLd {
  const links = getConfiguredExternalLinks();
  const sameAs = [links.githubUrl, links.linkedinUrl].filter(
    (value): value is string => Boolean(value),
  );
  const knowsAbout = skillGroups.flatMap((group) => [...group.skills]);
  const url = siteUrlOrUndefined();

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: portfolio.name,
    jobTitle: portfolio.title,
    description: portfolio.about.summary,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tel Aviv",
      addressCountry: "IL",
    },
    knowsAbout,
    ...(url ? { url } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

/**
 * Project structured data. Uses SoftwareSourceCode only when a public
 * repository URL is configured. Never marks proprietary professional work.
 * Clinical project descriptions retain demonstration-only framing.
 */
export function buildProjectJsonLd(project: Project): JsonLd {
  const url = siteUrlOrUndefined();
  const pageUrl = url
    ? new URL(`/work/${project.slug}`, url).toString()
    : undefined;
  const technologies = project.technologyStack;
  const hasRepository = isConfiguredHttpUrl(project.repositoryUrl);
  const hasLive = isConfiguredHttpUrl(project.liveUrl);
  const clinical = isClinicalFollowUpDetector(project);

  const description = clinical
    ? `${project.shortDescription} Demonstration system only — not clinically validated, not for medical decision-making, and not for real patient data.`
    : project.shortDescription;

  const base: JsonLd = {
    "@context": "https://schema.org",
    "@type": hasRepository ? "SoftwareSourceCode" : "CreativeWork",
    name: project.title,
    description,
    ...(technologies.length > 0 ? { keywords: technologies.join(", ") } : {}),
    ...(pageUrl ? { url: pageUrl } : {}),
    ...(hasLive && project.liveUrl ? { sameAs: [project.liveUrl] } : {}),
  };

  if (hasRepository && project.repositoryUrl) {
    base.codeRepository = project.repositoryUrl;
    base.programmingLanguage = technologies;
  } else if (technologies.length > 0) {
    base.programmingLanguage = technologies;
  }

  if (clinical) {
    base.additionalType = "https://schema.org/SoftwareApplication";
    base.applicationCategory = "DeveloperApplication";
    base.creativeWorkStatus = "Demonstration / portfolio simulation";
  }

  return base;
}

export function buildBreadcrumbJsonLd(
  items: readonly { name: string; path: string }[],
): JsonLd {
  const url = siteUrlOrUndefined();

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(url
        ? { item: new URL(item.path, url).toString() }
        : { item: item.path }),
    })),
  };
}

export function buildWebsiteJsonLd(): JsonLd {
  const url = siteUrlOrUndefined();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${portfolio.name} — Portfolio`,
    description: portfolio.heroStatement,
    ...(url ? { url } : {}),
    author: {
      "@type": "Person",
      name: portfolio.name,
      jobTitle: portfolio.title,
    },
  };
}
