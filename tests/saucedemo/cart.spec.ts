import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/saucedemo/LoginPage';
import { CartPage } from '../../pages/saucedemo/CartPage';
import { CheckoutPage } from '../../pages/saucedemo/CheckoutPage';
import { InventoryPage } from '../../pages/saucedemo/InventoryPage';
import { CartBadge } from '../../pages/saucedemo/CartBadge';
import { users } from '../../test-data/users';

test.describe('SauceDemo Cart and Checkout tests', () => {
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

    test("User can complete checkout", async () => {
    await test.step("Clear the cart before test", async () => {
     expect (cartBadge.cartLink.isVisible(), "Cart link is not visible").toBeTruthy();
      await cartBadge.clickCart();
      await cartPage.clearCart();
      await cartPage.clickContinueShopping();
    });

    await test.step("Add product to cart", async () => {
      await inventoryPage.addItemToCart(0);
      await expect(cartBadge.badgeCount, "Cart badge count is different").toHaveText("1");
    });

    await test.step("Open cart and start checkout", async () => {
      await cartBadge.clickCart();
      await cartPage.clickCheckout();
    });

    await test.step("Complete checkout", async () => {
      try {
        await checkoutPage.fillInformation("John", "Smith", "12345");
        await checkoutPage.clickContinue();
      } catch (error) {
        console.error("Error during checkout process: ", error);
        throw error; 
      } finally {

        await expect(checkoutPage.page, "Checkout overview page URL is different").toHaveURL(/checkout-step-two/);
        await checkoutPage.page.getByRole('button', { name: 'Finish' }).click();
        await expect(checkoutPage.page, "Checkout complete page URL is different").toHaveURL(/checkout-complete/);
        await expect(checkoutPage.page.getByText('Thank you for your order!'), "Order confirmation message is not visible")
          .toBeVisible();
       console.log("Checkout process completed successfully");
      }
    });
});
});