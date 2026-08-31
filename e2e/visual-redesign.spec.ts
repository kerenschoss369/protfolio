import { expect, test } from "@playwright/test";

test.describe("visual redesign", () => {
  test("landing five-second signals", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: /Hi, i'm Keren/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("img", { name: /Portrait of Keren Schoss/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Clinical Follow-Up Detector" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /Between logic/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /Let'?s\s*Talk/i }),
    ).toBeVisible();
  });

  test("selected projects remain visible under reduced motion", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "Clinical Follow-Up Detector" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "TapTap Avengers" }),
    ).toBeVisible();
  });

  test("homepage about portrait and contact", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("img", {
        name: "Keren Schoss, frontend and full-stack developer",
      }),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { name: /Let'?s\s*Talk/i }),
    ).toBeVisible();
    await expect(
      page.getByText(/Have an opportunity, an interesting project/i),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /kerenschoss369@gmail\.com/i }),
    ).toBeVisible();
  });

  test("case study shows mockup and technical details disclosure", async ({
    page,
  }) => {
    await page.goto("/work/clinical-follow-up-detector");

    await expect(
      page.getByText(/Conceptual product preview/i).first(),
    ).toBeVisible();
    await expect(
      page.locator("summary").filter({ hasText: "Technical details" }),
    ).toBeVisible();
    await expect(page.getByLabel("Safety notice")).toBeVisible();
  });

  test("no horizontal overflow on mobile homepage", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    const hasOverflow = await page.evaluate(() => {
      return (
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth + 1
      );
    });

    expect(hasOverflow).toBe(false);
  });
});
