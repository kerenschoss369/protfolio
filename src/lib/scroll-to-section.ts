import { prefersReducedMotion } from "@/lib/motion";

export const LANDING_SCROLL_KEY = "landing-scroll-to";

export function scrollToElementId(
  id: string,
  options?: { focus?: boolean },
): boolean {
  const target = document.getElementById(id);
  if (!target) {
    return false;
  }

  target.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });

  if (options?.focus) {
    target.focus({ preventScroll: true });
  }

  return true;
}

export function rememberLandingSection(id: string): void {
  sessionStorage.setItem(LANDING_SCROLL_KEY, id);
}

export function consumeLandingSection(): string | null {
  const id = sessionStorage.getItem(LANDING_SCROLL_KEY);
  if (id) {
    sessionStorage.removeItem(LANDING_SCROLL_KEY);
  }
  return id;
}

export function isUnmodifiedLeftClick(
  event: Pick<
    MouseEvent,
    | "button"
    | "metaKey"
    | "ctrlKey"
    | "shiftKey"
    | "altKey"
    | "defaultPrevented"
  >,
): boolean {
  return (
    !event.defaultPrevented &&
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  );
}
