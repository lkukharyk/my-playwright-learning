import { test, expect } from '@playwright/test';

test.describe('SauceDemo Login tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });
test('1 - Login form', async ({ page }) => {
    
  await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
  await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
  
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page,'Inventory page should open on log in').toHaveURL(/inventory/);
  console.log ("Inventory page is opened, login is successful");
});

test('2 - Negative login', async ({ page }) => {

  await page.getByRole('textbox', { name: 'Username' }).fill(')FJ0-gn29'); //invalid username
  await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
  
  await page.getByRole('button', { name: 'Login' }).click();
  const errorContainer = page.locator('[data-test="error"]'); //decided to use data-test here
await expect(errorContainer, "Expected error message is not displayed")
.toHaveText('Epic sadface: Username and password do not match any user in this service');
await page.reload(); //to release current error message and test the appearance of the next one
  await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
  await page.getByRole('textbox', { name: 'Password' }).fill('fvne0v03&'); //invalid password
  
  await page.getByRole('button', { name: 'Login' }).click();
await expect(errorContainer, "Expected error message is not displayed")
.toHaveText('Epic sadface: Username and password do not match any user in this service');

});

test('5 - Form validation empty and half-filled states', async ({ page }) => {

  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('heading', { name: /Username is required/i }), "Expected error message is not displayed").toBeVisible();
   //no page reload: this time, unlike Test 2, we must check that message changes on the same page
  await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('heading', { name: /Password is required/i }), "Expected error message is not displayed").toBeVisible();

  await page.getByRole('textbox', { name: 'Username' }).fill(''); 
  await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('heading', { name: /Username is required/i }), "Expected error message is not displayed").toBeVisible();
  });

test('GitHub exercise - Test locked out user', async ({ page }) => {

  await page.getByRole('textbox', { name: 'Username' }).fill('locked_out_user');
  await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  const errorContainer = page.locator('[data-test="error"]');
  await expect(errorContainer, "Expected error message is not displayed")
  .toHaveText('Epic sadface: Sorry, this user has been locked out.'); 
  });
});


test.describe('SauceDemo Cart tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page, "Inventory page URL is different").toHaveURL(/inventory/);

  });

test('3 - Add product to cart and verify badge count', async ({ page }) => {
  // using more data-test just to see it works well, and to avoid any possible issues with locators in case of UI changes.

const addToCartButtons = page.getByRole('button', { name: 'Add to cart' });
await addToCartButtons.nth(1).click(); 
  await expect(page.locator('[data-test="shopping-cart-badge"]'), 
  "Cart badge is not visible or has different value").toHaveText('1');
  
  console.log('Success: Product added and cart badge correctly displays "1".');
});

test('4 - Remove product from cart test', async ({ page }) => {

  await page.getByRole('button', { name: 'Add to cart' }).nth(2).click();
  await expect(page.locator('[data-test="shopping-cart-badge"]'),
   "Cart badge is not visible or has different value").toHaveText('1');
  
  await page.getByRole('button', { name: 'Remove' }).click();

  await expect(
    page.locator('[data-test="shopping-cart-badge"]'),
    'Cart badge should not be visible after product is removed'
  ).not.toBeVisible();
});

test('6 (and Bonus 2) - Rapid sorting selection', async ({ page }) => {

  const sortDropdown = page.locator('[data-test="product-sort-container"]');

  await sortDropdown.selectOption('hilo');
  await sortDropdown.selectOption('az');
  await sortDropdown.selectOption('hilo');
  await sortDropdown.selectOption('az');
  await sortDropdown.selectOption('hilo');

  const firstItemTitle = page.locator('[data-test="item-4-title-link"]'); // Sauce Labs Backpack title link
  const firstItemPrice = page.locator('.inventory_item_price').first();
  await expect(firstItemPrice, "Price is different").toHaveText('$49.99');

  const firstInventoryItemName = page.locator('.inventory_item_name').first();
  await expect(firstInventoryItemName, "Item name is different").toHaveText('Sauce Labs Fleece Jacket');
});

test('Bonus 1 - Multiple products', async ({ page }) => {

  const addToCartButtons = page.getByRole('button', { name: 'Add to cart' });

  await addToCartButtons.nth(0).click();
  await addToCartButtons.nth(0).click();
  await addToCartButtons.nth(0).click();

  const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  await expect(cartBadge, "Cart badge has different value").toHaveText('3');

  await page.getByRole('button', { name: 'Remove' }).first().click();

  await expect(cartBadge, "Cart badge has different value after item removal").toHaveText('2');
});

test('Bonus 3 - Cart after refresh', async ({ page }) => {

  const firstAddToCartButton = page.getByRole('button', { name: 'Add to cart' }).first();
  await firstAddToCartButton.click();

  const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  await expect(cartBadge, "Cart badge is not visible or has different value").toHaveText('1');

  await page.reload();

  await expect(cartBadge, "Cart badge is not visible or has different value after refresh").toHaveText('1');
  const firstItemButtonAfterRefresh = page.getByRole('button').filter({ hasText: /Remove|Add to cart/ }).first();
  await expect(firstItemButtonAfterRefresh,"Item button has different text after refresh")
  .toContainText(/Remove/);

  });
});