import { describe } from "node:test";
import { expect, test } from "playwright/test";

describe("Dummy Test Suite", () => {
  test("Google Test Pass", async ({ page }) => {
    await page.goto("https://www.google.com/");
    // setTimeout(() => {}, 3000);
    expect(await page.title()).toBe("Google");
  });

  test("Google Test Fail", async ({ page }) => {
    await page.goto("https://www.google.com/");
    expect(await page.title()).toBe("Apple");
  });

  test("Flaky Test", async () => {
    expect(Math.random() > 0.5).toBe(true);
  });

  test.skip("Skipped Test", async () => {
    expect(true).toBe(false);
  });
});
