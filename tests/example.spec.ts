import { test, expect } from '@playwright/test'; //imports Playwright tools

test('has title', async ({ page }) => { //header of the test and arrow function, async for await usage
  await page.goto('https://playwright.dev/'); //page async loading function with URL parameter

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => { //header of the test for checking certain element on page
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
}); 