import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/saucedemo/LoginPage';
import { CartPage } from '../../pages/saucedemo/CartPage';
import { CheckoutPage } from '../../pages/saucedemo/CheckoutPage';
import { InventoryPage } from '../../pages/saucedemo/InventoryPage';
import { CartBadge } from '../../pages/saucedemo/CartBadge';
import { users } from '../../test-data/users';

test.describe('SauceDemo Inventory tests', () => {
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
    await loginPage.login(users[0].username, users[0].password);
    await expect(page, "Inventory page URL is different").toHaveURL(/inventory/);
  });

  test('4 - Remove product from cart test', async () => {
  await inventoryPage.addItemToCart(2);
  await expect(inventoryPage.cartBadge, "Cart badge has different value").toHaveText("1");
  await inventoryPage.removeItemFromCart();
  await expect(inventoryPage.cartBadge, "Cart badge is still visible").not.toBeVisible();
});

test('6 (and Bonus 2) - Rapid sorting selection', async () => {
    await inventoryPage.selectSortOption('hilo');
    await inventoryPage.selectSortOption('az');
    await inventoryPage.selectSortOption('hilo');
    await inventoryPage.selectSortOption('az');
    await inventoryPage.selectSortOption('hilo');

    const firstItemPrice = await inventoryPage.getItemPrice(0);
    console.log("First item price: " + firstItemPrice);
    expect(firstItemPrice.toString(), "First item price is incorrect").toContain('49.99');

    const firstItemName = await inventoryPage.getItemName(0);
    console.log("First item name: " + firstItemName);
    await expect(firstItemName, "First item name is incorrect").toContain('Sauce Labs Fleece Jacket');

    const itemCount = await inventoryPage.getItemNames().count();
    const lastItemName = await inventoryPage.getItemName(itemCount - 1);
    console.log("Last item name: " + lastItemName);
    await expect(lastItemName, "Last item name is incorrect").toContain('Sauce Labs Onesie');

});

test('3 - Add product to cart and verify badge count', async () => {
  const addToCartBtn = inventoryPage.page.getByRole('button', { name: 'Add to cart' }).first();
  await addToCartBtn.click();
  await expect(cartBadge.badgeCount, "Cart badge count is different").toHaveText("1");
  console.log("Badge count after adding item: " + await cartBadge.getBadgeCount());
});

test('Bonus 1 - Multiple products', async () => {
    await inventoryPage.addItemToCart(0);
    await inventoryPage.addItemToCart(1);
    await inventoryPage.addItemToCart(2);

    await expect(cartBadge.badgeCount, "Cart badge has different value").toHaveText('3');

    await inventoryPage.removeItemFromCart();
    await expect(cartBadge.badgeCount, "Cart badge has different value after item removal").toHaveText('2');
  });

test('Bonus 3 - Cart badge after refresh', async () => {
    await inventoryPage.addItemToCart(0);
    await expect(inventoryPage.cartBadge, "Cart badge has different value").toHaveText('1');

    await inventoryPage.page.reload();
    await expect(inventoryPage.cartBadge, "Cart badge is not visible after page reload").toBeVisible();
    await expect(inventoryPage.cartBadge, "Cart badge has different value after page reload").toHaveText('1');
    await expect((inventoryPage.page.getByRole('button', { name: 'Remove' }).first()), 
    "Remove button should be visible after page refresh").toBeTruthy();
  });
});
