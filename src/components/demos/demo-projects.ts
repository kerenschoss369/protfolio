import type { ProjectSlug } from "@/data/content-types";

export type DemoProjectSlug =
  | "clinical-follow-up-detector"
  | "academease"
  | "realtime-gpt-cli"
  | "taptap-avengers";

const DEMO_SLUGS: readonly DemoProjectSlug[] = [
  "clinical-follow-up-detector",
  "academease",
  "realtime-gpt-cli",
  "taptap-avengers",
] as const;

export function hasInteractiveDemo(slug: string): slug is DemoProjectSlug {
  return (DEMO_SLUGS as readonly string[]).includes(slug);
}

export function isDemoProjectSlug(slug: ProjectSlug): slug is DemoProjectSlug {
  return hasInteractiveDemo(slug);
}
