import type { Metadata } from "next";

import { portfolio } from "@/data/portfolio";
import { externalLinks } from "@/data/links";
import { isConfiguredUrl } from "@/lib/links";

const defaultTitle = `${portfolio.name} — ${portfolio.title}`;
const defaultDescription = portfolio.heroStatement;

export function createPageMetadata({
  title,
  description,
  path = "",
}: {
  title?: string;
  description?: string;
  path?: string;
} = {}): Metadata {
  const pageTitle = title ? `${title} — ${portfolio.name}` : defaultTitle;
  const pageDescription = description ?? defaultDescription;
  const canonical = isConfiguredUrl(externalLinks.siteUrl)
    ? new URL(path || "/", externalLinks.siteUrl).toString()
    : undefined;

  return {
    title: pageTitle,
    description: pageDescription,
    ...(canonical
      ? {
          alternates: {
            canonical,
          },
          openGraph: {
            title: pageTitle,
            description: pageDescription,
            url: canonical,
            type: "website",
            locale: "en_US",
          },
        }
      : {
          openGraph: {
            title: pageTitle,
            description: pageDescription,
            type: "website",
            locale: "en_US",
          },
        }),
  };
}
