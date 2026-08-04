import { expect, test } from "@playwright/test";

test.describe("homepage and navigation", () => {
  test("homepage loads with hero and featured projects", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "Keren Schoss" }),
    ).toBeVisible();
    await expect(
      page.getByRole("navigation", { name: "Primary" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Clinical Follow-Up Detector" }),
    ).toBeVisible();
    await expect(
      page.getByText(/Professional work is described at a high level/i),
    ).toBeVisible();
  });

  test("desktop navigation reaches work", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    await page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: "Work", exact: true })
      .click();

    await expect(page).toHaveURL(/\/work$/);
  });

  test("mobile navigation opens and navigates", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    await page.getByRole("button", { name: "Open navigation menu" }).click();

    const menu = page.getByRole("dialog", { name: "Menu" });
    await expect(menu).toBeVisible();
    await menu.getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL(/\/about$/);
  });

  test("command menu opens with keyboard and supports search", async ({
    page,
  }) => {
    await page.goto("/");

    await page.keyboard.press("Control+K");
    const dialog = page.getByRole("dialog", { name: "Command menu" });
    await expect(dialog).toBeVisible();

    await page.getByLabel("Search commands").fill("contact");
    await expect(
      dialog.getByRole("option", { name: /Open Contact/i }),
    ).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });

  test("primary CTA navigates to work", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "View selected work" }).click();
    await expect(page).toHaveURL(/\/work$/);
  });

  test("no horizontal overflow at 320px", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 720 });
    await page.goto("/");

    const hasOverflow = await page.evaluate(() => {
      return (
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth + 1
      );
    });

    expect(hasOverflow).toBe(false);
  });

  test("light and dark theme smoke", async ({ page }) => {
    await page.goto("/");

    const toggle = page
      .getByRole("button", { name: /Switch to dark theme/i })
      .first();
    await toggle.click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

    await page
      .getByRole("button", { name: /Switch to light theme/i })
      .first()
      .click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  });
});

test("work project route loads", async ({ page }) => {
  await page.goto("/work/clinical-follow-up-detector");

  await expect(
    page.getByRole("heading", { name: "Clinical Follow-Up Detector" }),
  ).toBeVisible();
  await expect(
    page.getByText("Demonstration system only", { exact: false }),
  ).toBeVisible();
});
