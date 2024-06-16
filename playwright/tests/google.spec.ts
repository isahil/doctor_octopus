import { expect, test } from "playwright/test";

test('google', async ({ page }) => {
    await page.goto('https://www.google.com/');
    setTimeout(() => {}, 3000);   
    expect(await page.title()).toBe('Google');
})