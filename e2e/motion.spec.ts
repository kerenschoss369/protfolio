import { expect, test } from "@playwright/test";

test.describe("motion refinements", () => {
  test("homepage sections remain visible without depending on animation", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "Keren Schoss" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: /Interfaces, systems, and AI/,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Clinical Follow-Up Detector" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: /precise, useful, and memorable/,
      }),
    ).toBeVisible();
  });

  test("route navigation remains immediate and content stays visible", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    await page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: "Work", exact: true })
      .click();

    await expect(page).toHaveURL(/\/work$/);
    await expect(
      page.getByRole("heading", { name: "Work", exact: true }),
    ).toBeVisible();

    await page
      .locator('a[href="/work/clinical-follow-up-detector"]')
      .first()
      .click();
    await expect(page).toHaveURL(/\/work\/clinical-follow-up-detector$/);
    await expect(
      page.getByRole("heading", {
        name: "Clinical Follow-Up Detector",
        exact: true,
      }),
    ).toBeVisible();
  });

  test("reduced-motion navigation keeps content visible", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    await page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: "About", exact: true })
      .click();

    await expect(page).toHaveURL(/\/about$/);
    await expect(page.locator("#main-content")).toBeVisible();
    await expect(page.getByRole("heading").first()).toBeVisible();
  });

  test("theme switching remains accessible and updates theme attribute", async ({
    page,
  }) => {
    await page.goto("/");

    const toggle = page
      .getByRole("button", { name: /Switch to dark theme/i })
      .first();
    await toggle.focus();
    await expect(toggle).toBeFocused();
    await toggle.click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

    await page
      .getByRole("button", { name: /Switch to light theme/i })
      .first()
      .click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  });

  test("mobile menu and command menu still open and close", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    await page.getByRole("button", { name: "Open navigation menu" }).click();
    const menu = page.getByRole("dialog", { name: "Menu" });
    await expect(menu).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();

    await page.keyboard.press("Control+K");
    const command = page.getByRole("dialog", { name: "Command menu" });
    await expect(command).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(command).toBeHidden();
  });

  test("project navigation and keyboard focus remain usable", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/work/clinical-follow-up-detector");

    const next = page
      .getByRole("navigation", { name: "Adjacent projects" })
      .getByRole("link")
      .first();
    await next.focus();
    await expect(next).toBeFocused();
    await next.click();
    await expect(page).toHaveURL(/\/work\//);
    await expect(page.locator("#main-content")).toBeVisible();
  });

  test("no horizontal overflow at 320px after motion changes", async ({
    page,
  }) => {
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

  test("clinical demo still works after motion refinements", async ({
    page,
  }) => {
    await page.goto("/work/clinical-follow-up-detector");

    await expect(page.getByText("Portfolio simulation").first()).toBeVisible();
    await expect(
      page
        .getByRole("button", { name: /Source note|Extracted|Architecture/i })
        .first(),
    ).toBeVisible();
  });

  test("hero nodes remain keyboard selectable", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    const interfaceNode = page.getByRole("button", {
      name: /^Interface$/i,
    });
    await interfaceNode.focus();
    await expect(interfaceNode).toBeFocused();
    await interfaceNode.click();
    await expect(interfaceNode).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByText(/User-facing experience/i)).toBeVisible();
  });

  test("browser back keeps content visible after case-study navigation", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/work");
    await page
      .locator('a[href="/work/clinical-follow-up-detector"]')
      .first()
      .click();
    await expect(page).toHaveURL(/clinical-follow-up-detector/);
    await page.goBack();
    await expect(page).toHaveURL(/\/work$/);
    await expect(
      page.getByRole("heading", { name: "Work", exact: true }),
    ).toBeVisible();
  });

  test("work filters remain usable with motion", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/work");

    const aiFilter = page.getByRole("button", { name: /^AI\b/i });
    await aiFilter.click();
    await expect(aiFilter).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("#main-content")).toBeVisible();
  });

  test("about narrative and contact converge remain readable", async ({
    page,
  }) => {
    await page.goto("/about");
    await expect(
      page.getByText(/Composition becomes interface/i).first(),
    ).toBeVisible();
    await expect(
      page.getByRole("img", { name: /Portrait of Keren Schoss/i }),
    ).toBeVisible();

    await page.goto("/contact");
    await expect(
      page.getByRole("heading", { name: "Contact", exact: true }),
    ).toBeVisible();
    await expect(page.getByText(/Frontend/i).first()).toBeVisible();
  });

  test("not-found reconnect visual stays lightweight", async ({ page }) => {
    await page.goto("/missing-route-signature-motion");
    await expect(
      page.getByRole("heading", { name: "Page not found" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Home", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Work", exact: true }).first(),
    ).toBeVisible();
  });
});
