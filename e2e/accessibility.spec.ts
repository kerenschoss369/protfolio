import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

async function expectNoSeriousAxeViolations(page: Page) {
  // Unrevealed motion content is opacity:0, which creates false color-contrast
  // failures. Match the themes/reduced-motion cases for stable axe runs.
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.evaluate(() => {
    document.documentElement.removeAttribute("data-reveal-enhanced");
    document.querySelectorAll("[data-reveal]").forEach((node) => {
      node.setAttribute("data-revealed", "");
    });
    document.querySelectorAll("[style*='opacity']").forEach((node) => {
      (node as HTMLElement).style.opacity = "1";
    });
  });
  // Allow MotionConfig / reduced-motion subscribers to settle before axe.
  await page.waitForTimeout(150);

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .exclude(".project-preview-clinical")
    .exclude(".project-preview-academease")
    .exclude(".project-preview-terminal")
    .exclude(".project-preview-taptap")
    .analyze();

  const serious = results.violations.filter(
    (violation) =>
      violation.impact === "critical" || violation.impact === "serious",
  );

  expect(
    serious,
    serious
      .map(
        (violation) =>
          `${violation.id}: ${violation.help} (${violation.nodes.length} nodes)`,
      )
      .join("\n"),
  ).toEqual([]);
}

test.describe("automated accessibility (axe)", () => {
  test("homepage", async ({ page }) => {
    await page.goto("/");
    await expectNoSeriousAxeViolations(page);
  });

  test("work index", async ({ page }) => {
    await page.goto("/work");
    await expectNoSeriousAxeViolations(page);
  });

  test("case study with demo", async ({ page }) => {
    await page.goto("/work/clinical-follow-up-detector");
    await expect(
      page.getByRole("heading", {
        name: "Clinical Follow-Up Detector",
        exact: true,
      }),
    ).toBeVisible();
    await expectNoSeriousAxeViolations(page);
  });

  test("about and contact", async ({ page }) => {
    await page.goto("/about");
    await expectNoSeriousAxeViolations(page);
    await page.goto("/contact");
    await expectNoSeriousAxeViolations(page);
  });

  test("not-found", async ({ page }) => {
    await page.goto("/this-route-does-not-exist");
    await expect(
      page.getByRole("heading", { name: "Page not found" }),
    ).toBeVisible();
    await expectNoSeriousAxeViolations(page);
  });

  test("mobile navigation open state", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    await page.getByRole("button", { name: "Open navigation menu" }).click();
    await expect(page.getByRole("dialog", { name: "Menu" })).toBeVisible();
    await expectNoSeriousAxeViolations(page);
  });

  test("command menu open state", async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("button", { name: "Open command menu" })
      .first()
      .click();
    await expect(
      page.getByRole("dialog", { name: "Command menu" }),
    ).toBeVisible();
    await expectNoSeriousAxeViolations(page);
  });

  test("light and dark themes", async ({ page }) => {
    await page.emulateMedia({
      colorScheme: "light",
      reducedMotion: "reduce",
    });
    await page.goto("/");
    await page.evaluate(() => {
      document.documentElement.classList.remove("theme-transition");
      document.documentElement.setAttribute("data-theme", "light");
      window.localStorage.setItem("portfolio-theme", "light");
    });
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    await expectNoSeriousAxeViolations(page);

    await page.evaluate(() => {
      document.documentElement.classList.remove("theme-transition");
      document.documentElement.setAttribute("data-theme", "dark");
      window.localStorage.setItem("portfolio-theme", "dark");
    });
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expectNoSeriousAxeViolations(page);
  });

  test("reduced-motion mode", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/work/taptap-avengers");
    await expect(page.getByText(/Reduced-motion mode/i)).toBeVisible();
    await expectNoSeriousAxeViolations(page);
  });
});

test.describe("keyboard and landmark smoke", () => {
  test("skip link targets focusable main landmark", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to main content" });
    await expect(skip).toBeFocused();
    await skip.press("Enter");
    await expect(page.locator("#main-content")).toBeFocused();
  });

  test("one h1 per major route", async ({ page }) => {
    for (const path of ["/", "/work", "/about", "/contact"]) {
      await page.goto(path);
      await expect(page.locator("h1")).toHaveCount(1);
    }
  });

  test("keyboard-only journey to work and a case study", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await page
      .getByRole("button", { name: "Open command menu" })
      .first()
      .click();
    const dialog = page.getByRole("dialog", { name: "Command menu" });
    await expect(dialog).toBeVisible();
    await page.getByLabel("Search commands").fill("clinical");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/work\/clinical-follow-up-detector$/);
    await expect(page.locator("h1")).toHaveCount(1);
  });
});
