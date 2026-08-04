import type {
  ConfigurableUrl,
  ExternalLinkAction,
  ProjectSlug,
} from "@/data/content-types";
import {
  isConfiguredCvPath,
  isConfiguredEmail,
  isConfiguredHttpUrl,
  isConfiguredUrl,
  isFakePlaceholderValue,
} from "@/lib/links";

/**
 * Central external-link configuration.
 * null means the action must not render. Never use fake URLs.
 */
export const externalLinks = {
  githubUrl: null as ConfigurableUrl,
  linkedinUrl: null as ConfigurableUrl,
  email: null as ConfigurableUrl,
  cvPath: null as ConfigurableUrl,
  siteUrl: null as ConfigurableUrl,
} as const;

export type ExternalLinks = typeof externalLinks;
export type ExternalLinkKey = keyof ExternalLinks;

export function getConfiguredExternalLinks() {
  return {
    githubUrl: isConfiguredHttpUrl(externalLinks.githubUrl)
      ? externalLinks.githubUrl
      : null,
    linkedinUrl: isConfiguredHttpUrl(externalLinks.linkedinUrl)
      ? externalLinks.linkedinUrl
      : null,
    email: isConfiguredEmail(externalLinks.email) ? externalLinks.email : null,
    cvPath: isConfiguredCvPath(externalLinks.cvPath)
      ? externalLinks.cvPath
      : null,
    siteUrl: isConfiguredHttpUrl(externalLinks.siteUrl)
      ? externalLinks.siteUrl
      : null,
  } as const;
}

export function getConfiguredExternalActions(): ExternalLinkAction[] {
  const links = getConfiguredExternalLinks();
  const actions: ExternalLinkAction[] = [];

  if (links.githubUrl) {
    actions.push({ action: "github", href: links.githubUrl });
  }
  if (links.linkedinUrl) {
    actions.push({ action: "linkedin", href: links.linkedinUrl });
  }
  if (links.email) {
    actions.push({
      action: "email",
      href: `mailto:${links.email}`,
      address: links.email,
    });
  }
  if (links.cvPath) {
    actions.push({ action: "cv", href: links.cvPath });
  }
  if (links.siteUrl) {
    actions.push({ action: "site", href: links.siteUrl });
  }

  return actions;
}

export function getProjectLinkActions(input: {
  slug: ProjectSlug;
  repositoryUrl: ConfigurableUrl;
  liveUrl: ConfigurableUrl;
}): ExternalLinkAction[] {
  const actions: ExternalLinkAction[] = [];

  if (isConfiguredHttpUrl(input.repositoryUrl)) {
    actions.push({
      action: "repository",
      href: input.repositoryUrl,
      projectSlug: input.slug,
    });
  }

  if (isConfiguredHttpUrl(input.liveUrl)) {
    actions.push({
      action: "live-demo",
      href: input.liveUrl,
      projectSlug: input.slug,
    });
  }

  return actions;
}

export function isExternalActionConfigured(
  value: ConfigurableUrl,
  kind: "http" | "email" | "cv" | "any" = "any",
): value is string {
  if (isFakePlaceholderValue(value)) {
    return false;
  }

  switch (kind) {
    case "http":
      return isConfiguredHttpUrl(value);
    case "email":
      return isConfiguredEmail(value);
    case "cv":
      return isConfiguredCvPath(value);
    case "any":
      return isConfiguredUrl(value);
  }
}
