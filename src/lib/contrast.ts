/**
 * Relative-luminance / contrast helpers for design-token validation.
 * Implements WCAG 2.x relative luminance and contrast ratio formulas.
 */

export function hexToRgb(hex: string): [number, number, number] {
  const normalized = hex.replace("#", "").trim();
  const full =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => `${char}${char}`)
          .join("")
      : normalized;

  if (!/^[0-9a-fA-F]{6}$/.test(full)) {
    throw new Error(`Invalid hex color: ${hex}`);
  }

  return [
    Number.parseInt(full.slice(0, 2), 16),
    Number.parseInt(full.slice(2, 4), 16),
    Number.parseInt(full.slice(4, 6), 16),
  ];
}

function channelLuminance(channel: number): number {
  const value = channel / 255;
  return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

export function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex);
  return (
    0.2126 * channelLuminance(r) +
    0.7152 * channelLuminance(g) +
    0.0722 * channelLuminance(b)
  );
}

export function contrastRatio(foreground: string, background: string): number {
  const lighter = Math.max(
    relativeLuminance(foreground),
    relativeLuminance(background),
  );
  const darker = Math.min(
    relativeLuminance(foreground),
    relativeLuminance(background),
  );
  return (lighter + 0.05) / (darker + 0.05);
}

export function meetsWcagAa(
  foreground: string,
  background: string,
  options: { largeText?: boolean } = {},
): boolean {
  const minimum = options.largeText ? 3 : 4.5;
  return contrastRatio(foreground, background) >= minimum;
}

/** Solid palette samples used for automated contrast checks. */
export const themeContrastPairs = {
  dark: {
    background: "#0c0c0c",
    foreground: "#e4e8eb",
    muted: "#9eaab2",
    accent: "#a8d8ff",
    accentContrast: "#0c0c0c",
    success: "#7dba98",
    warning: "#d2b36a",
    danger: "#e08a92",
    focusRing: "#a8d8ff",
    steel: "#a5c1d4",
  },
} as const;

/** Immersive landing palette — solid colors, no opacity hacks. */
export const landingContrastPairs = {
  background: "#0c0c0c",
  foreground: "#e4e8eb",
  muted: "#9eaab2",
  kicker: "#9eaab2",
  number: "#a5c1d4",
  accent: "#a8d8ff",
  headingStop: "#a5c1d4",
} as const;
