/**
 * Unique view-transition names and helpers for route continuity.
 * Names must stay unique per rendered page to avoid duplicate ID issues.
 */

import { runViewTransition, supportsViewTransitions } from "@/lib/motion";

const PREFIX = "ks";

export function projectTitleTransitionName(slug: string): string {
  return `${PREFIX}-project-title-${slug}`;
}

export function projectCategoryTransitionName(slug: string): string {
  return `${PREFIX}-project-category-${slug}`;
}

export function projectVisualTransitionName(slug: string): string {
  return `${PREFIX}-project-visual-${slug}`;
}

export function projectAccentTransitionName(slug: string): string {
  return `${PREFIX}-project-accent-${slug}`;
}

export function themeRevealTransitionName(): string {
  return `${PREFIX}-theme-reveal`;
}

export const viewTransitionNames = {
  projectTitle: projectTitleTransitionName,
  projectCategory: projectCategoryTransitionName,
  projectVisual: projectVisualTransitionName,
  projectAccent: projectAccentTransitionName,
  themeReveal: themeRevealTransitionName,
} as const;

export function navigateWithViewTransition(
  navigate: () => void,
  options?: { reducedMotion?: boolean },
): void {
  runViewTransition(navigate, { reducedMotion: options?.reducedMotion });
}

export { supportsViewTransitions, runViewTransition };
