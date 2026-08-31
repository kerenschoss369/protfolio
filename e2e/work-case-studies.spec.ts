import { expect, test } from "@playwright/test";

const publicSlugs = [
  "clinical-follow-up-detector",
  "academease",
  "realtime-gpt-cli",
  "taptap-avengers",
  "atlas-research",
] as const;

test.describe("work case studies", () => {
  for (const slug of publicSlugs) {
    test(`public project route loads: ${slug}`, async ({ page }) => {
      await page.goto(`/work/${slug}`);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.getByRole("link", { name: /All work/i })).toBeVisible();
    });
  }

  test("invalid project route produces not-found behavior", async ({
    page,
  }) => {
    const response = await page.goto("/work/not-a-real-project", {
      waitUntil: "networkidle",
    });
    expect(response?.status()).toBe(404);
    await expect(
      page.getByRole("heading", { name: "Page not found" }),
    ).toBeVisible();
  });

  test("engineering practice has no public case-study route", async ({
    page,
  }) => {
    const response = await page.goto("/work/overthewire-bandit", {
      waitUntil: "networkidle",
    });
    expect(response?.status()).toBe(404);
  });

  test("previous and next navigation works without wrapping", async ({
    page,
  }) => {
    await page.goto("/work/academease");

    await page
      .getByRole("link", { name: /Clinical Follow-Up Detector/i })
      .click();
    await expect(page).toHaveURL(/\/work\/clinical-follow-up-detector$/);

    await expect(
      page
        .getByRole("navigation", { name: "Adjacent projects" })
        .getByRole("link", { name: /Previous project/i }),
    ).toHaveCount(0);

    await page
      .getByRole("navigation", { name: "Adjacent projects" })
      .getByRole("link", { name: /AcademEase/i })
      .click();
    await expect(page).toHaveURL(/\/work\/academease$/);
  });

  test("case-study pages have one h1 and required clinical safety", async ({
    page,
  }) => {
    await page.goto("/work/clinical-follow-up-detector");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(
      page.getByText(/Demonstration system only/i).first(),
    ).toBeVisible();
    await expect(page.getByText(/Not HIPAA compliant/i).first()).toBeVisible();
    await expect(
      page
        .getByText(
          /does not automatically remember the most recently opened note/i,
        )
        .first(),
    ).toBeVisible();
  });

  test("no horizontal overflow at 320px on work routes", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 720 });

    for (const path of ["/", "/work/clinical-follow-up-detector"]) {
      await page.goto(path);
      const hasOverflow = await page.evaluate(() => {
        return (
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth + 1
        );
      });
      expect(hasOverflow).toBe(false);
    }
  });

  test("configured repository links appear only on verified projects", async ({
    page,
  }) => {
    await page.goto("/work/clinical-follow-up-detector");
    const clinicalRepo = page.getByRole("link", { name: /View repository/i });
    await expect(clinicalRepo).toHaveCount(1);
    await expect(clinicalRepo).toHaveAttribute(
      "href",
      "https://github.com/kerenschoss369/clinical-follow-up-detector",
    );
    await expect(clinicalRepo).toHaveAttribute("target", "_blank");
    await expect(clinicalRepo).toHaveAttribute("rel", /noopener/);
    await expect(page.getByRole("link", { name: /Live demo/i })).toHaveCount(0);

    await page.goto("/work/realtime-gpt-cli");
    const cliRepo = page.getByRole("link", { name: /View repository/i });
    await expect(cliRepo).toHaveCount(1);
    await expect(cliRepo).toHaveAttribute(
      "href",
      "https://github.com/kerenschoss369/go-gpt-realtime-cli",
    );
    await expect(cliRepo).toHaveAttribute("target", "_blank");
    await expect(page.getByRole("link", { name: /Live demo/i })).toHaveCount(0);

    await page.goto("/work/taptap-avengers");
    const tapRepo = page.getByRole("link", { name: /View repository/i });
    await expect(tapRepo).toHaveCount(1);
    await expect(tapRepo).toHaveAttribute(
      "href",
      "https://github.com/uvw222/TapTapAvengers",
    );
    await expect(tapRepo).toHaveAttribute("target", "_blank");
    await expect(page.getByRole("link", { name: /Live demo/i })).toHaveCount(0);

    await page.goto("/work/academease");
    await expect(
      page.getByRole("link", { name: /View repository/i }),
    ).toHaveCount(0);
    await expect(page.getByRole("link", { name: /Live demo/i })).toHaveCount(0);

    await page.goto("/work/atlas-research");
    await expect(
      page.getByRole("link", { name: /View repository/i }),
    ).toHaveCount(0);
  });

});
