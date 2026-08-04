import { expect, test } from "@playwright/test";

test.describe("SEO and production readiness", () => {
  test("sitemap lists public routes and excludes design-system", async ({
    page,
  }) => {
    const response = await page.goto("/sitemap.xml");
    expect(response?.ok()).toBeTruthy();
    const body = await response!.text();

    for (const path of [
      "/",
      "/work",
      "/about",
      "/contact",
      "/work/clinical-follow-up-detector",
      "/work/academease",
      "/work/realtime-gpt-cli",
      "/work/taptap-avengers",
      "/work/overthewire-bandit",
      "/work/atlas-research",
    ]) {
      expect(body).toContain(`<loc>${path}</loc>`);
    }

    expect(body).not.toContain("/design-system");
    expect(body).not.toContain("example.com");
    expect(body).not.toContain("localhost");
  });

  test("robots allows indexing and disallows design-system", async ({
    page,
  }) => {
    const response = await page.goto("/robots.txt");
    expect(response?.ok()).toBeTruthy();
    const body = await response!.text();
    expect(body).toMatch(/Allow:\s*\//i);
    expect(body).toMatch(/Disallow:\s*\/design-system/i);
    expect(body).not.toMatch(/example\.com/i);
  });

  test("pages expose unique titles and Person JSON-LD", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Keren Schoss/);

    const scripts = page.locator('script[type="application/ld+json"]');
    await expect(scripts.first()).toBeAttached();
    const jsonText = await scripts.first().textContent();
    expect(jsonText).toBeTruthy();
    const parsed = JSON.parse(jsonText!);
    const payload = Array.isArray(parsed) ? parsed : [parsed];
    const person = payload.find((item) => item["@type"] === "Person");
    expect(person?.name).toBe("Keren Schoss");
    expect(person?.sameAs).toEqual([
      "https://github.com/kerenschoss369",
      "https://www.linkedin.com/in/kerenschoss/",
    ]);
    expect(JSON.stringify(person)).not.toMatch(/example\.com/i);
  });

  test("case study includes project structured data without medical claims", async ({
    page,
  }) => {
    await page.goto("/work/clinical-follow-up-detector");
    const scripts = page.locator('script[type="application/ld+json"]');
    const count = await scripts.count();
    expect(count).toBeGreaterThan(0);

    let foundProject = false;
    for (let index = 0; index < count; index += 1) {
      const text = await scripts.nth(index).textContent();
      if (!text?.includes("Clinical Follow-Up Detector")) {
        continue;
      }
      foundProject = true;
      expect(text).toMatch(/Demonstration system only/i);
      expect(text.toLowerCase()).not.toContain("medical device");
      expect(text).toMatch(
        /"codeRepository":"https:\/\/github\.com\/kerenschoss369\/clinical-follow-up-detector"/,
      );
    }
    expect(foundProject).toBe(true);
  });

  test("contact exposes configured methods without fake placeholders", async ({
    page,
  }) => {
    await page.goto("/contact");
    await expect(
      page.getByRole("heading", { name: "Contact", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Email Keren Schoss/i }),
    ).toHaveAttribute("href", "mailto:kerenschoss369@gmail.com");
    await expect(
      page.getByRole("main").getByRole("link", { name: /LinkedIn/i }),
    ).toHaveAttribute("href", "https://www.linkedin.com/in/kerenschoss/");
    await expect(
      page.getByRole("main").getByRole("link", { name: /GitHub/i }),
    ).toHaveAttribute("href", "https://github.com/kerenschoss369");
    await expect(
      page.getByRole("main").getByRole("link", { name: /Download CV/i }),
    ).toHaveAttribute("href", "/cv/keren-schoss-cv.pdf");
    await expect(page.locator('a[href="#"]')).toHaveCount(0);
    await expect(page.locator('a[href*="example.com"]')).toHaveCount(0);
  });

  test("CV download is available from homepage, nav, and command menu", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(
      page.getByRole("navigation", { name: "Primary" }).getByRole("link", {
        name: /Download CV/i,
      }),
    ).toHaveAttribute("href", "/cv/keren-schoss-cv.pdf");
    await expect(
      page
        .getByRole("main")
        .getByRole("link", { name: /Download CV/i })
        .first(),
    ).toHaveAttribute("href", "/cv/keren-schoss-cv.pdf");

    const cvResponse = await page.request.get("/cv/keren-schoss-cv.pdf");
    expect(cvResponse.ok()).toBeTruthy();
    expect(cvResponse.headers()["content-type"]).toMatch(/pdf/i);

    await page.keyboard.press("Control+K");
    const dialog = page.getByRole("dialog", { name: "Command menu" });
    await expect(dialog).toBeVisible();
    await page.getByLabel("Search commands").fill("cv");
    await expect(
      dialog.getByRole("option", { name: /Download CV/i }),
    ).toBeVisible();
  });

  test("favicon and open graph image routes respond", async ({ page }) => {
    const icon = await page.goto("/icon");
    expect(icon?.ok()).toBeTruthy();
    expect(icon?.headers()["content-type"]).toMatch(/image\//);

    const og = await page.goto("/og");
    expect(og?.ok()).toBeTruthy();
    expect(og?.headers()["content-type"]).toMatch(/image\//);

    const projectOg = await page.goto("/og/work/clinical-follow-up-detector");
    expect(projectOg?.ok()).toBeTruthy();
  });

  test("unconfigured siteUrl does not emit localhost OG metadata", async ({
    page,
  }) => {
    await page.goto("/");
    const content = await page.content();
    expect(content).not.toMatch(/og:image[^>]+localhost/i);
    expect(content).not.toMatch(
      /property="og:image"[^>]*content="http:\/\/localhost/i,
    );
  });

  test("no horizontal overflow at 320px across major routes", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 720 });
    for (const path of [
      "/",
      "/work",
      "/about",
      "/contact",
      "/work/academease",
    ]) {
      await page.goto(path);
      const hasOverflow = await page.evaluate(() => {
        return (
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth + 1
        );
      });
      expect(hasOverflow, path).toBe(false);
    }
  });
});
