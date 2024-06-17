import { describe } from "node:test";
import { expect, test } from "playwright/test";

describe("Google", () => {
  test("google test pass", async ({ page }) => {
    await page.goto("https://www.google.com/");
    setTimeout(() => {}, 3000);
    expect(await page.title()).toBe("Google");
  });

  test("google test fail", async ({ page }) => {
    await page.goto("https://www.google.com/");
    setTimeout(() => {}, 3000);
    expect(await page.title()).toBe("Apple");
  });

  test.skip("google test skip", async ({ page }) => {
    await page.goto("https://www.google.com/");
    setTimeout(() => {}, 3000);
    expect(await page.title()).toBe("Apple");
  });
});
