import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/saucedemo/LoginPage';
import { CartPage } from '../../pages/saucedemo/CartPage';
import { CheckoutPage } from '../../pages/saucedemo/CheckoutPage';
import { InventoryPage } from '../../pages/saucedemo/InventoryPage';
import { CartBadge } from '../../pages/saucedemo/CartBadge';
import { users } from '../../test-data/users';

test.describe('SauceDemo Login tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;
  let cartBadge: CartBadge;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    cartBadge = new CartBadge(page);
    await loginPage.open();
  });

  test('1 - Login form', async ({ page }) => {
    await loginPage.login(users[0].username, users[0].password);
    await expect(page, 'Inventory page should open on log in').toHaveURL(/inventory/);
  });

  test('2 - Negative login', async ({ page }) => {
    await loginPage.login(users[6].username, users[6].password);
    await expect(loginPage.errorMessage, "Expected error message is not displayed")
      .toHaveText('Epic sadface: Username and password do not match any user in this service');

    await page.reload();

    await loginPage.login(users[7].username, users[7].password);
    await expect(loginPage.errorMessage, "Expected error message is not displayed")
      .toHaveText('Epic sadface: Username and password do not match any user in this service');
  });

  test('5 - Form validation empty and half-filled states', async () => {
    await loginPage.loginButton.click();
    await expect(loginPage.errorMessage, "Username error message is not displayed")
      .toContainText('Username is required');

    await loginPage.usernameInput.fill(users[0].username);
    await loginPage.loginButton.click();
    await expect(loginPage.errorMessage, "Password error message is not displayed")
      .toContainText('Password is required');

    await loginPage.usernameInput.fill('');
    await loginPage.passwordInput.fill(users[0].password);
    await loginPage.loginButton.click();
    await expect(loginPage.errorMessage, "Username error message is not displayed")
      .toContainText('Username is required');
  });

  test('GitHub exercise - Test locked out user', async () => {
    await loginPage.login(users[1].username, users[1].password);
    await expect(loginPage.errorMessage, "Locked out user error message is not displayed")
      .toHaveText('Epic sadface: Sorry, this user has been locked out.');
  });
});

// old version of login tests
/* test.describe("Login", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test("standard user can log in", async ({ page }) => {
    await loginPage.login("standard_user", "secret_sauce");
    await expect(page).toHaveURL(/inventory/);
  });

  test("locked user sees error message", async () => {
    await loginPage.login("locked_out_user", "secret_sauce");
    await expect(loginPage.errorMessage).toContainText(/locked out/);
  });
}); */