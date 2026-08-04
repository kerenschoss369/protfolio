import { getConfiguredExternalLinks } from "@/data/links";
import { projects } from "@/data/projects";
import { primaryNavItems } from "@/data/navigation";

export type CommandActionKind = "route" | "external" | "theme" | "download";

export type CommandAction = {
  id: string;
  label: string;
  keywords: string[];
  group: "Projects" | "Navigate" | "Actions";
  kind: CommandActionKind;
  href?: string;
};

export function buildCommandActions(): CommandAction[] {
  const links = getConfiguredExternalLinks();
  const actions: CommandAction[] = [];

  for (const project of projects) {
    const isFeatured = project.featured;
    const label = isFeatured
      ? `View ${project.title}`
      : `Open ${project.title}`;

    actions.push({
      id: `project-${project.slug}`,
      label,
      keywords: [
        project.title,
        project.category,
        project.shortDescription,
        ...project.technologyStack,
        project.slug,
        "project",
        "work",
      ],
      group: "Projects",
      kind: "route",
      href: `/work/${project.slug}`,
    });
  }

  actions.push({
    id: "view-all-work",
    label: "View all work",
    keywords: ["work", "projects", "portfolio", "case studies"],
    group: "Navigate",
    kind: "route",
    href: "/work",
  });

  for (const item of primaryNavItems) {
    if (item.href === "/work") {
      continue;
    }

    actions.push({
      id: `nav-${item.href}`,
      label: `Open ${item.label}`,
      keywords: [item.label, item.href.replace("/", "")],
      group: "Navigate",
      kind: "route",
      href: item.href,
    });
  }

  actions.push({
    id: "switch-theme",
    label: "Switch theme",
    keywords: ["theme", "dark", "light", "appearance", "mode"],
    group: "Actions",
    kind: "theme",
  });

  if (links.githubUrl) {
    actions.push({
      id: "github",
      label: "Open GitHub",
      keywords: ["github", "repository", "code", "profile"],
      group: "Actions",
      kind: "external",
      href: links.githubUrl,
    });
  }

  if (links.linkedinUrl) {
    actions.push({
      id: "linkedin",
      label: "Open LinkedIn",
      keywords: ["linkedin", "profile", "network"],
      group: "Actions",
      kind: "external",
      href: links.linkedinUrl,
    });
  }

  if (links.cvPath) {
    actions.push({
      id: "download-cv",
      label: "Download CV",
      keywords: ["cv", "resume", "download", "pdf"],
      group: "Actions",
      kind: "download",
      href: links.cvPath,
    });
  }

  if (links.email) {
    actions.push({
      id: "email",
      label: "Send email",
      keywords: ["email", "contact", "mail", links.email],
      group: "Actions",
      kind: "external",
      href: `mailto:${links.email}`,
    });
  }

  return actions;
}

export function filterCommandActions(
  actions: readonly CommandAction[],
  query: string,
): CommandAction[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return [...actions];
  }

  return actions.filter((action) => {
    const haystack = [action.label, ...action.keywords].join(" ").toLowerCase();
    return haystack.includes(normalized);
  });
}
