import { expect, test } from '@playwright/test';

test('google', async ({ page }) => {
    await page.goto('https://www.google.com/');
    expect(await page.title()).toBe('Google');
})