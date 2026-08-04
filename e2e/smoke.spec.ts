import { expect, test } from "@playwright/test";

test("homepage loads with primary navigation", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Keren Schoss" }),
  ).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
  await expect(
    page.getByRole("navigation", { name: "Primary" }).getByRole("link", {
      name: "Work",
      exact: true,
    }),
  ).toBeVisible();
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
