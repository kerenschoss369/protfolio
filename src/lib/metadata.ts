import type { Metadata } from "next";

import { portfolio } from "@/data/portfolio";
import { externalLinks } from "@/data/links";
import { isConfiguredUrl } from "@/lib/links";

const defaultTitle = `${portfolio.name} — ${portfolio.title}`;
const defaultDescription = portfolio.heroStatement;

function configuredSiteUrl(): string | undefined {
  return isConfiguredUrl(externalLinks.siteUrl)
    ? externalLinks.siteUrl
    : undefined;
}

/**
 * Page metadata helper.
 * Canonical and absolute Open Graph URLs are emitted only when `siteUrl`
 * is configured. Never invents a domain, example.com, or localhost canonical.
 */
export function createPageMetadata({
  title,
  description,
  path = "",
  ogImagePath,
}: {
  title?: string;
  description?: string;
  path?: string;
  /** Relative path to an OG image route when siteUrl is configured. */
  ogImagePath?: string;
} = {}): Metadata {
  const pageTitle = title ? `${title} — ${portfolio.name}` : defaultTitle;
  const pageDescription = description ?? defaultDescription;
  const siteUrl = configuredSiteUrl();
  const canonical = siteUrl
    ? new URL(path || "/", siteUrl).toString()
    : undefined;
  const normalizedPath = path || "/";
  const imagePath =
    ogImagePath ??
    (normalizedPath.startsWith("/work/")
      ? `/og/work/${normalizedPath.slice("/work/".length)}`
      : "/og");
  const ogImages = siteUrl
    ? [
        {
          url: new URL(imagePath, siteUrl).toString(),
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ]
    : undefined;

  return {
    title: pageTitle,
    description: pageDescription,
    ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
    ...(canonical
      ? {
          alternates: {
            canonical,
          },
        }
      : {}),
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: "website",
      locale: "en_US",
      siteName: `${portfolio.name} Portfolio`,
      ...(canonical ? { url: canonical } : {}),
      ...(ogImages ? { images: ogImages } : {}),
    },
    twitter: {
      card: ogImages ? "summary_large_image" : "summary",
      title: pageTitle,
      description: pageDescription,
      ...(ogImages ? { images: [ogImages[0]!.url] } : {}),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function getSiteUrlOrNull(): string | null {
  return configuredSiteUrl() ?? null;
}
