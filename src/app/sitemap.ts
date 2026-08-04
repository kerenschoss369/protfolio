import type { MetadataRoute } from "next";

import { getConfiguredExternalLinks } from "@/data/links";
import { getPublicSitemapPaths } from "@/lib/site-routes";

/**
 * Public sitemap. Absolute URLs are emitted only when `siteUrl` is configured.
 * When unconfigured, path-only entries are returned so the route still lists
 * public pages without inventing a domain or using localhost.
 * `/design-system` is intentionally excluded.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const { siteUrl } = getConfiguredExternalLinks();
  const paths = getPublicSitemapPaths();

  return paths.map((path) => ({
    url: siteUrl ? new URL(path, siteUrl).toString() : path,
    changeFrequency: path.startsWith("/work/")
      ? "monthly"
      : path === "/"
        ? "weekly"
        : "monthly",
    priority: path === "/" ? 1 : path === "/work" ? 0.9 : 0.7,
  }));
}
