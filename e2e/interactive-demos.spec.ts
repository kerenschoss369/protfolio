import { expect, test } from "@playwright/test";

test.describe("interactive project demos", () => {
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

    await demo.getByRole("button", { name: /Extracted actions/i }).click();
    await expect(demo.getByText("Repeat CBC", { exact: true })).toBeVisible();
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

    await demo.getByRole("button", { name: "6*7" }).click();
    await expect(demo.getByText(/local multiply\(6, 7\) → 42/i)).toBeVisible();

    await demo.getByRole("button", { name: /Event flow/i }).click();
    await expect(demo.getByText(/6\*7 function-call lifecycle/i)).toBeVisible();
  });

  test("academease schedule and language switching", async ({ page }) => {
    await page.goto("/work/academease");

    const demo = page.locator("#interactive-demo");
    await expect(
      demo.getByRole("heading", { name: /AcademEase schedule simulation/i }),
    ).toBeVisible({ timeout: 15_000 });

    await demo.getByRole("button", { name: /Schedule B/i }).click();
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

    await demo.getByRole("button", { name: /^Start$/i }).click();
    await expect(demo.getByText(/Playing|Step /i)).toBeVisible();
    await demo.getByRole("button", { name: /^Reset$/i }).click();
    await expect(demo.getByText(/Ready — review controls/i)).toBeVisible();
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
    await actions.focus();
    await expect(actions).toBeFocused();
    await page.keyboard.press("Space");
    await expect(demo.getByText("Repeat CBC", { exact: true })).toBeVisible();

    const hasOverflow = await page.evaluate(() => {
      return (
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth + 1
      );
    });
    expect(hasOverflow).toBe(false);
  });

  test("reduced-motion smoke for taptap", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/work/taptap-avengers");

    const demo = page.locator("#interactive-demo");
    await expect(
      demo.getByRole("heading", { name: /TapTap timing simulation/i }),
    ).toBeVisible({ timeout: 15_000 });
    await expect(demo.getByText(/Reduced-motion mode/i)).toBeVisible();
  });
});
