import type { MetadataRoute } from "next";

import { getConfiguredExternalLinks } from "@/data/links";

/**
 * Public pages are indexable. No global noindex.
 * Sitemap absolute URL is included only when `siteUrl` is configured.
 * Development-only `/design-system` is not linked from robots (and is
 * excluded from the sitemap); it already 404s outside development.
 */
export default function robots(): MetadataRoute.Robots {
  const { siteUrl } = getConfiguredExternalLinks();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/design-system"],
    },
    ...(siteUrl
      ? {
          sitemap: new URL("/sitemap.xml", siteUrl).toString(),
          host: new URL(siteUrl).host,
        }
      : {}),
  };
}
