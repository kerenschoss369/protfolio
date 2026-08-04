/**
 * Lightweight focus-trap helpers for overlays.
 * No dialog library — keeps Phase 3 dependencies minimal.
 */

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  ).filter(
    (element) =>
      !element.hasAttribute("disabled") &&
      element.getAttribute("aria-hidden") !== "true" &&
      element.tabIndex !== -1,
  );
}

export function trapFocus(event: KeyboardEvent, container: HTMLElement): void {
  if (event.key !== "Tab") {
    return;
  }

  const focusable = getFocusableElements(container);
  if (focusable.length === 0) {
    event.preventDefault();
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (!first || !last) {
    return;
  }

  const active = document.activeElement as HTMLElement | null;

  if (event.shiftKey) {
    if (active === first || !container.contains(active)) {
      event.preventDefault();
      last.focus();
    }
    return;
  }

  if (active === last) {
    event.preventDefault();
    first.focus();
  }
}

export function lockBodyScroll(): () => void {
  const previousOverflow = document.body.style.overflow;
  const previousPaddingRight = document.body.style.paddingRight;
  const scrollbarGap = Math.min(
    64,
    Math.max(0, window.innerWidth - document.documentElement.clientWidth),
  );

  document.body.style.overflow = "hidden";
  if (scrollbarGap > 0) {
    document.body.style.paddingRight = `${scrollbarGap}px`;
  }

  return () => {
    document.body.style.overflow = previousOverflow;
    document.body.style.paddingRight = previousPaddingRight;
  };
}

/**
 * Marks page landmarks outside an open dialog as inert so assistive
 * technology browse mode cannot reach background content.
 * Does not inert ancestors that contain the dialog (e.g. header).
 */
export function inertBackgroundLandmarks(): () => void {
  const candidates = [
    document.getElementById("main-content"),
    document.querySelector("footer"),
    document.querySelector('a[href="#main-content"]'),
  ].filter((element): element is HTMLElement => element instanceof HTMLElement);

  const restored: Array<{ element: HTMLElement; wasInert: boolean }> = [];

  for (const element of candidates) {
    restored.push({ element, wasInert: element.inert });
    element.inert = true;
  }

  return () => {
    for (const { element, wasInert } of restored) {
      element.inert = wasInert;
    }
  };
}
