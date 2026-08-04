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

/** Solid theme palette samples used for automated contrast checks. */
export const themeContrastPairs = {
  light: {
    background: "#f5f2ec",
    foreground: "#12141a",
    muted: "#5a5751",
    accent: "#1b4fd8",
    accentContrast: "#f5f2ec",
    success: "#1a6b42",
    warning: "#8a5800",
    danger: "#a91d2f",
    focusRing: "#1b4fd8",
  },
  dark: {
    background: "#121417",
    foreground: "#f1eee7",
    muted: "#a9a399",
    accent: "#6b8aff",
    accentContrast: "#0c0e12",
    success: "#4caf7a",
    warning: "#d6a33a",
    danger: "#e35a67",
    focusRing: "#6b8aff",
  },
} as const;
