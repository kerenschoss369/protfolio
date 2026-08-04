import { expect, test } from "@playwright/test";

test.describe("interactive project demos", () => {
  test.beforeEach(async ({ page }) => {
    // Keep demos usable while avoiding route-enter motion intercepting clicks.
    await page.emulateMedia({ reducedMotion: "reduce" });
  });

  test("clinical demo modes, safety, and no medical input", async ({
    page,
  }) => {
    await page.goto("/work/clinical-follow-up-detector");

    const demo = page.locator("#interactive-demo");
    await expect(
      demo.getByRole("heading", {
        name: /Clinical Follow-Up Detector simulation/i,
      }),
    ).toBeVisible({ timeout: 15_000 });

    await expect(
      demo.getByText(/This portfolio simulation does not send data to OpenAI/i),
    ).toBeVisible();
    await expect(demo.locator("textarea")).toHaveCount(0);
    await expect(demo.locator('input[type="file"]')).toHaveCount(0);

    const extracted = demo.getByRole("button", { name: /Extracted actions/i });
    await extracted.scrollIntoViewIfNeeded();
    await extracted.click();
    await expect(extracted).toHaveAttribute("aria-pressed", "true");
    await expect(
      demo.getByRole("listitem").filter({ hasText: "Repeat CBC" }).first(),
    ).toBeVisible();
    await expect(demo.getByText(/Needs review/i).first()).toBeVisible();

    await demo.getByRole("button", { name: /System architecture/i }).click();
    await expect(
      demo.getByRole("button", { name: /1\. React/i }),
    ).toBeVisible();
  });

  test("terminal command interaction", async ({ page }) => {
    await page.goto("/work/realtime-gpt-cli");

    const demo = page.locator("#interactive-demo");
    await expect(
      demo.getByRole("heading", {
        name: /Realtime GPT-4o-mini CLI simulation/i,
      }),
    ).toBeVisible({ timeout: 15_000 });

    await expect(demo.getByLabel(/^Command$/i)).toBeVisible();
    await expect(demo.getByLabel(/api key/i)).toHaveCount(0);

    const multiply = demo.getByRole("button", { name: "6*7" });
    await multiply.scrollIntoViewIfNeeded();
    await multiply.click();
    await expect(demo.getByText(/local multiply\(6,\s*7\).*42/i)).toBeVisible({
      timeout: 10_000,
    });

    await demo.getByRole("button", { name: /Event flow/i }).click();
    await expect(demo.getByText(/6\*7 function-call lifecycle/i)).toBeVisible();
  });

  test("academease schedule and language switching", async ({ page }) => {
    await page.goto("/work/academease");

    const demo = page.locator("#interactive-demo");
    await expect(
      demo.getByRole("heading", { name: /AcademEase schedule simulation/i }),
    ).toBeVisible({ timeout: 15_000 });

    const scheduleB = demo.getByRole("button", { name: /Schedule B/i });
    await scheduleB.scrollIntoViewIfNeeded();
    await scheduleB.click();
    await expect(scheduleB).toHaveAttribute("aria-pressed", "true");
    await expect(demo.getByText("08:00").first()).toBeVisible();

    await demo.getByRole("button", { name: "עברית" }).click();
    await expect(demo.locator("[dir='rtl']")).toBeVisible();
    await expect(demo.getByText("אלגוריתמים").first()).toBeVisible();
  });

  test("taptap start and reset", async ({ page }) => {
    await page.goto("/work/taptap-avengers");

    const demo = page.locator("#interactive-demo");
    await expect(
      demo.getByRole("heading", { name: /TapTap timing simulation/i }),
    ).toBeVisible({ timeout: 15_000 });

    const start = demo.getByRole("button", { name: /^Start$/i });
    await start.scrollIntoViewIfNeeded();
    await start.click();
    await expect(start).toBeDisabled();
    await expect(demo.getByText(/Playing|Step /i).first()).toBeVisible();
    await demo.getByRole("button", { name: /^Reset$/i }).click();
    await expect(
      demo.getByText(/Ready — review controls/i).first(),
    ).toBeVisible();
  });

  test("keyboard access and 320px overflow on demo pages", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 720 });
    await page.goto("/work/clinical-follow-up-detector");

    const demo = page.locator("#interactive-demo");
    await expect(
      demo.getByRole("heading", {
        name: /Clinical Follow-Up Detector simulation/i,
      }),
    ).toBeVisible({ timeout: 20_000 });

    const actions = demo.getByRole("button", { name: /Extracted actions/i });
    await actions.scrollIntoViewIfNeeded();
    await actions.focus();
    await expect(actions).toBeFocused();
    // Prefer Enter on narrow viewports: Space can be claimed by scroll containers
    // when the sticky header recently adjusted layout.
    await actions.press("Enter");
    await expect(actions).toHaveAttribute("aria-pressed", "true");
    await expect(
      demo.getByRole("listitem").filter({ hasText: "Repeat CBC" }).first(),
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
