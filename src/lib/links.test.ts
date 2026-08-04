import { describe, expect, it } from "vitest";

import {
  isConfiguredCvPath,
  isConfiguredEmail,
  isConfiguredHttpUrl,
  isConfiguredUrl,
  isFakePlaceholderValue,
} from "@/lib/links";

describe("isConfiguredUrl", () => {
  it("rejects null and undefined", () => {
    expect(isConfiguredUrl(null)).toBe(false);
    expect(isConfiguredUrl(undefined)).toBe(false);
  });

  it("rejects empty and hash placeholders", () => {
    expect(isConfiguredUrl("")).toBe(false);
    expect(isConfiguredUrl("   ")).toBe(false);
    expect(isConfiguredUrl("#")).toBe(false);
    expect(isConfiguredUrl("#section")).toBe(false);
  });

  it("rejects example domains and bracket placeholders", () => {
    expect(isConfiguredUrl("https://example.com")).toBe(false);
    expect(isConfiguredUrl("[LINKEDIN_URL]")).toBe(false);
    expect(isFakePlaceholderValue("[EMAIL]")).toBe(true);
  });

  it("accepts real URLs and paths", () => {
    expect(isConfiguredUrl("https://github.com/keren")).toBe(true);
    expect(isConfiguredUrl("/cv.pdf")).toBe(true);
    expect(isConfiguredUrl("mailto:person@domain.com")).toBe(true);
  });
});

describe("specialized link validators", () => {
  it("validates http, email, and cv shapes separately", () => {
    expect(isConfiguredHttpUrl("https://github.com/keren")).toBe(true);
    expect(isConfiguredHttpUrl("/cv.pdf")).toBe(false);
    expect(isConfiguredEmail("person@domain.com")).toBe(true);
    expect(isConfiguredEmail("not-an-email")).toBe(false);
    expect(isConfiguredCvPath("/files/cv.pdf")).toBe(true);
    expect(isConfiguredCvPath("cv.pdf")).toBe(false);
  });
});
