import { expect, test } from "@playwright/test";

test.describe("remediation regressions", () => {
  test("homepage content is visible immediately and uses canonical facts", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: /Hi, i'm Keren/i }),
    ).toBeVisible();
    await expect(
      page
        .getByText(
          /I build polished digital products through frontend engineering/i,
        )
        .first(),
    ).toBeVisible();
    await expect(page.getByText(/2025–Present/)).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "SOC Team Leader & IT" }),
    ).toBeVisible();
    await expect(
      page.getByText("IDF Manpower Directorate", { exact: true }),
    ).toBeVisible();
    await expect(page.getByText(/not HIPAA compliant/i).first()).toBeVisible();
    await expect(
      page.getByText(
        /Developing production features across EL AL's large-scale web platform/,
      ),
    ).toBeVisible();
    await expect(
      page.getByRole("navigation", { name: "Primary" }).getByRole("button", {
        name: "Work",
        exact: true,
      }),
    ).toBeVisible();
  });

  test("command menu works on major public routes", async ({
    page,
    isMobile,
  }) => {
    for (const path of ["/", "/work", "/work/clinical-follow-up-detector"]) {
      await page.goto(path);
      const usesLandingChrome =
        path === "/" || path === "/work" || /^\/work\/[^/]+/.test(path);
      if (usesLandingChrome) {
        await page.keyboard.press("Control+K");
      } else {
        const trigger = page
          .getByRole("button", { name: /Open command menu/i })
          .first();
        await expect(trigger, path).toBeVisible();
        if (isMobile) {
          await trigger.click();
        } else {
          await page.keyboard.press("Control+K");
        }
      }
      const dialog = page.getByRole("dialog", { name: "Command menu" });
      await expect(dialog, path).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(dialog).toHaveCount(0);
    }
  });

  test("invalid project slug keeps usable 404 chrome", async ({ page }) => {
    await page.goto("/work/not-a-real-project");
    await expect(
      page.getByRole("heading", { name: "Page not found" }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Open command menu/i }).first(),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Work", exact: true }).first(),
    ).toHaveAttribute("href", "/work");
  });

  test("Bandit and ATLAS are discoverable from the work index", async ({
    page,
  }) => {
    await page.goto("/work");
    await expect(
      page.getByRole("heading", { name: /OverTheWire Bandit/i }).first(),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /OverTheWire Bandit/i }),
    ).toHaveCount(0);
    await expect(
      page.getByRole("link", { name: /ATLAS/i }).first(),
    ).toBeVisible();
  });

  test("case study all-work returns to the work index", async ({ page }) => {
    await page.goto("/work/clinical-follow-up-detector");
    await page.getByRole("link", { name: /All work/i }).click();
    await expect(page).toHaveURL(/\/work\/?$/);
  });

  test("reduced motion keeps sticky cards static and copy visible", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await expect(
      page.locator('[data-sticky-stack="off"]').first(),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /Hi, i'm Keren/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Clinical Follow-Up Detector" }),
    ).toBeVisible();
  });

  test("AcademEase preview exposes pressed language state", async ({
    page,
  }) => {
    await page.goto("/");
    const hebrew = page.getByRole("button", { name: "HE" }).first();
    await hebrew.click();
    await expect(hebrew).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator('[lang="he"]').first()).toBeVisible();
  });
});

test.describe("no JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("homepage copy and routes remain readable", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(
      page.getByRole("heading", { name: /Hi, i'm Keren/i }),
    ).toBeVisible();
    await expect(
      page
        .getByText(
          /I build polished digital products through frontend engineering/i,
        )
        .first(),
    ).toBeVisible();
    await expect(
      page.getByRole("navigation", { name: "Primary" }).getByRole("button", {
        name: "Work",
        exact: true,
      }),
    ).toBeVisible();
  });
});

test.describe("mobile hero composition", () => {
  for (const viewport of [
    { width: 320, height: 568 },
    { width: 375, height: 667 },
    { width: 390, height: 844 },
    { width: 430, height: 932 },
  ]) {
    test(`no hero overlap at ${viewport.width}x${viewport.height}`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport);
      await page.goto("/");

      const overlap = await page.evaluate(() => {
        const tagline = document.querySelector(".hero-statement");
        const navContact = document.querySelector(
          '#hero [data-section="contact"]',
        );
        const portrait = document.querySelector(".hero-portrait");
        const nav = document.querySelector('nav[aria-label="Primary"] a');
        if (!tagline || !navContact || !portrait || !nav) {
          return { missing: true };
        }

        const intersects = (a: Element, b: Element) => {
          const ar = a.getBoundingClientRect();
          const br = b.getBoundingClientRect();
          return !(
            ar.right < br.left ||
            ar.left > br.right ||
            ar.bottom < br.top ||
            ar.top > br.bottom
          );
        };

        return {
          missing: false,
          taglineOverlapsPortrait: intersects(tagline, portrait),
          navContactOverlapsPortrait: intersects(navContact, portrait),
          navHeight: nav.getBoundingClientRect().height,
        };
      });

      expect(overlap.missing).toBe(false);
      expect(overlap.taglineOverlapsPortrait).toBe(false);
      expect(overlap.navContactOverlapsPortrait).toBe(false);
      expect(overlap.navHeight ?? 0).toBeGreaterThanOrEqual(24);
    });
  }

  test("landscape mobile keeps hero copy readable", async ({ page }) => {
    await page.setViewportSize({ width: 667, height: 375 });
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: /Hi, i'm Keren/i }),
    ).toBeVisible();
    await expect(page.locator("#hero p").first()).toBeVisible();
  });

  test("200% zoom keeps homepage usable", async ({ page }) => {
    await page.setViewportSize({ width: 640, height: 400 });
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: /Hi, i'm Keren/i }),
    ).toBeVisible();
    const hasOverflow = await page.evaluate(() => {
      return (
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth + 1
      );
    });
    expect(hasOverflow).toBe(false);
  });
});
