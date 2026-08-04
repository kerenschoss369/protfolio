/**
 * Link configuration helpers.
 * Missing or placeholder values must never become public clickable actions.
 */

const BRACKET_PLACEHOLDER = /\[[A-Z0-9_-]+\]/;

export function isFakePlaceholderValue(
  value: string | null | undefined,
): boolean {
  if (typeof value !== "string") {
    return false;
  }

  const trimmed = value.trim().toLowerCase();

  if (trimmed.length === 0) {
    return false;
  }

  if (trimmed === "#" || trimmed.startsWith("#")) {
    return true;
  }

  if (trimmed.includes("example.com") || trimmed.includes("example.org")) {
    return true;
  }

  if (BRACKET_PLACEHOLDER.test(value.trim())) {
    return true;
  }

  return false;
}

/**
 * Returns true only for non-empty configured values that are not known fakes.
 * Prefer specialized helpers for HTTP, email, and CV paths when rendering.
 */
export function isConfiguredUrl(
  value: string | null | undefined,
): value is string {
  if (typeof value !== "string") {
    return false;
  }

  const trimmed = value.trim();

  if (trimmed.length === 0) {
    return false;
  }

  if (isFakePlaceholderValue(trimmed)) {
    return false;
  }

  return true;
}

export function isConfiguredHttpUrl(
  value: string | null | undefined,
): value is string {
  if (!isConfiguredUrl(value)) {
    return false;
  }

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function isConfiguredEmail(
  value: string | null | undefined,
): value is string {
  if (!isConfiguredUrl(value)) {
    return false;
  }

  // Accept bare emails; mailto: is normalized by callers when building hrefs.
  const address = value.toLowerCase().startsWith("mailto:")
    ? value.slice("mailto:".length)
    : value;

  if (isFakePlaceholderValue(address)) {
    return false;
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address);
}

export function isConfiguredCvPath(
  value: string | null | undefined,
): value is string {
  if (!isConfiguredUrl(value)) {
    return false;
  }

  if (value.includes("://")) {
    return isConfiguredHttpUrl(value);
  }

  return value.startsWith("/") && !value.includes(" ");
}

export function assertValidConfiguredUrl(
  value: string | null | undefined,
  label: string,
  kind: "http" | "email" | "cv" | "any" = "any",
): void {
  if (value == null) {
    return;
  }

  if (isFakePlaceholderValue(value)) {
    throw new Error(
      `${label} contains a forbidden placeholder value: ${value}`,
    );
  }

  const ok =
    kind === "http"
      ? isConfiguredHttpUrl(value)
      : kind === "email"
        ? isConfiguredEmail(value)
        : kind === "cv"
          ? isConfiguredCvPath(value)
          : isConfiguredUrl(value);

  if (!ok) {
    throw new Error(`${label} is malformed: ${value}`);
  }
}
