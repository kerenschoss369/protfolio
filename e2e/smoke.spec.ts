import { expect, test } from "@playwright/test";

test.describe("homepage and navigation", () => {
  test("homepage loads with hero and selected projects", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: /Hi, i'm Keren/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("navigation", { name: "Primary" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Clinical Follow-Up Detector" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Frontend Developer" }),
    ).toBeVisible();
  });

  test("desktop navigation opens the work index", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    await page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: "Work", exact: true })
      .click();

    await expect(page).toHaveURL(/\/work\/?$/);
    await expect(
      page.getByRole("heading", { name: "Work", exact: true }),
    ).toBeVisible();
  });

  test("mobile navigation reaches about page", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    await page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: "About", exact: true })
      .click();

    await expect(page).toHaveURL(/\/about\/?$/);
    await expect(page.getByRole("heading", { name: "About" })).toBeVisible();
  });

  test("command menu opens from about page", async ({ page }) => {
    await page.goto("/about");

    const trigger = page
      .getByRole("button", { name: /Open command menu/i })
      .first();
    await expect(trigger).toBeVisible();
    await trigger.click();

    const dialog = page.getByRole("dialog", { name: "Command menu" });
    await expect(dialog).toBeVisible();
    await page.getByLabel("Search commands").fill("clinical");
    await expect(
      dialog.getByRole("option", { name: /Clinical Follow-Up Detector/i }),
    ).toBeVisible();
  });

  test("primary CTA navigates to contact", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Contact Me" }).first().click();
    await expect(page).toHaveURL(/#contact/);
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

  test("theme toggle remains available off landing", async ({ page }) => {
    await page.goto("/about");
    await expect(
      page.getByRole("button", { name: /Switch to (dark|light) theme/i }),
    ).toBeVisible();
  });
});

test("work project route loads", async ({ page }) => {
  await page.goto("/work/clinical-follow-up-detector");

  await expect(
    page.getByRole("heading", {
      name: "Clinical Follow-Up Detector",
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByText("Demonstration system only", { exact: false }).first(),
  ).toBeVisible();
});
