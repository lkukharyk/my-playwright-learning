import { type Locator, type Page } from "@playwright/test";

export class CartPage {
    readonly page: Page;
    readonly continueShoppingButton: Locator;
    readonly checkoutButton: Locator;
    readonly cartItemsList: Locator;
    readonly itemQuantity: Locator;
    readonly itemName: Locator;
    readonly itemDescription: Locator;
    readonly itemPrice: Locator;
    readonly removeButton: Locator;

    constructor(page: Page) {

        //for some reason, getByRole or other get's didn't worked (timeout error), so I used locators instead
        this.page = page;
        this.continueShoppingButton = page.locator('button[data-test="continue-shopping"]');
        this.checkoutButton = page.locator('button[data-test="checkout"]');
        this.cartItemsList = page.locator('[data-test="inventory-item"]');
        this.itemQuantity = page.locator('[data-test="item-quantity"]');
        this.itemName = page.locator('[data-test="inventory-item-name"]');
        this.itemDescription = page.locator('[data-test="inventory-item-desc"]');
        this.itemPrice = page.locator('[data-test="inventory-item-price"]');
        this.removeButton = page.locator('button[data-test="remove"]');
    }

    async clickCheckout() {
        await this.checkoutButton.click();
    }

  async clickContinueShopping() {
    const count = await this.continueShoppingButton.count();
    
    if (count === 0) {
        throw new Error('Continue Shopping button not found on cart page');
    }
    
    await this.continueShoppingButton.click();
}

    getCartItemByName(itemName: string): Locator {
        return this.cartItemsList.filter({ hasText: itemName });
    }

    async removeItemByName(itemName: string) {
        const targetRow = this.getCartItemByName(itemName);
        await targetRow.locator('button[data-test="remove"]').click();
    }

    async getAllCartItemNames() {
        return await this.itemName.allInnerTexts();
    }

    async getQuantityByItemName(itemName: string) {
        const targetRow = this.getCartItemByName(itemName);
        return await targetRow.locator('[data-test="item-quantity"]').innerText();
    }

    async clearCart() {
        const itemCount = await this.cartItemsList.count();
        for (let i = 0; i < itemCount; i++) {
            await this.cartItemsList.nth(i).locator('button[data-test="remove"]').click(); 

        }
    }
}