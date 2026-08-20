import { expect, test } from "@playwright/test";

/**
 * Safari/WebKit regressions: section reveals and hero chrome must stay usable.
 * Chromium-only coverage previously missed opacity:0 stuck states.
 */
test.describe("Safari / WebKit compatibility", () => {
  test("hero and primary CTA are visible on first paint", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "Keren Schoss" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "View selected work" }),
    ).toBeVisible();
  });

  test("scrolling reveals homepage sections instead of leaving them blank", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    const selectedWork = page.getByRole("heading", {
      name: /Projects that show how interfaces/,
    });
    await selectedWork.scrollIntoViewIfNeeded();
    await expect(selectedWork).toBeVisible();

    const featured = page.getByRole("heading", {
      name: "Clinical Follow-Up Detector",
    });
    await featured.scrollIntoViewIfNeeded();
    await expect(featured).toBeVisible();

    const contact = page.getByRole("heading", {
      name: /Conversations about frontend/,
    });
    await contact.scrollIntoViewIfNeeded();
    await expect(contact).toBeVisible();

    const stuck = await page.evaluate(() => {
      return [...document.querySelectorAll("[data-reveal]")].filter((node) => {
        const style = getComputedStyle(node);
        const rect = node.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        return inView && style.opacity === "0";
      }).length;
    });
    expect(stuck).toBe(0);
  });

  test("project cards navigate under WebKit", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/work");

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
});
