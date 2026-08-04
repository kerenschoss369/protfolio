import { getProjectSlugs } from "@/lib/project-utils";

/**
 * Public indexable routes. Development-only routes must not appear here.
 */
export const PUBLIC_STATIC_ROUTES = [
  "/",
  "/work",
  "/about",
  "/contact",
] as const;

export const DEVELOPMENT_ONLY_ROUTES = ["/design-system"] as const;

export function getPublicSitemapPaths(): string[] {
  return [
    ...PUBLIC_STATIC_ROUTES,
    ...getProjectSlugs().map((slug) => `/work/${slug}`),
  ];
}

export function isDevelopmentOnlyRoute(path: string): boolean {
  return (DEVELOPMENT_ONLY_ROUTES as readonly string[]).includes(path);
}
