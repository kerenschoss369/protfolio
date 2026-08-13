import { describe, expect, it } from "vitest";

import {
  contrastRatio,
  landingContrastPairs,
  meetsWcagAa,
  themeContrastPairs,
} from "@/lib/contrast";

describe("theme contrast (WCAG 2.2 AA)", () => {
  for (const [themeName, palette] of Object.entries(themeContrastPairs)) {
    describe(themeName, () => {
      it("foreground on background meets AA", () => {
        expect(meetsWcagAa(palette.foreground, palette.background)).toBe(true);
        expect(
          contrastRatio(palette.foreground, palette.background),
        ).toBeGreaterThanOrEqual(4.5);
      });

      it("muted on background meets AA", () => {
        expect(meetsWcagAa(palette.muted, palette.background)).toBe(true);
      });

      it("accent on background meets AA for text links", () => {
        expect(meetsWcagAa(palette.accent, palette.background)).toBe(true);
      });

      it("accent-contrast on accent meets AA for primary buttons", () => {
        expect(meetsWcagAa(palette.accentContrast, palette.accent)).toBe(true);
      });

      it("status colors on background meet AA", () => {
        expect(meetsWcagAa(palette.success, palette.background)).toBe(true);
        expect(meetsWcagAa(palette.warning, palette.background)).toBe(true);
        expect(meetsWcagAa(palette.danger, palette.background)).toBe(true);
      });

      it("steel metadata text on background meets AA", () => {
        expect(meetsWcagAa(palette.steel, palette.background)).toBe(true);
      });

      it("focus ring contrasts with background", () => {
        expect(
          contrastRatio(palette.focusRing, palette.background),
        ).toBeGreaterThanOrEqual(3);
      });
    });
  }

  describe("landing immersive palette", () => {
    const palette = landingContrastPairs;

    it("foreground and muted text meet AA on landing background", () => {
      expect(meetsWcagAa(palette.foreground, palette.background)).toBe(true);
      expect(meetsWcagAa(palette.muted, palette.background)).toBe(true);
      expect(meetsWcagAa(palette.kicker, palette.background)).toBe(true);
      expect(meetsWcagAa(palette.accent, palette.background)).toBe(true);
    });

    it("large decorative numbers and heading stops meet large-text AA", () => {
      expect(
        meetsWcagAa(palette.number, palette.background, { largeText: true }),
      ).toBe(true);
      expect(
        meetsWcagAa(palette.headingStop, palette.background, {
          largeText: true,
        }),
      ).toBe(true);
    });
  });
});
