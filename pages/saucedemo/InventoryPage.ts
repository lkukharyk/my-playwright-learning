import { type Locator, type Page } from "@playwright/test";

export class InventoryPage {
    readonly page: Page;
    readonly cartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    }

    getSortDropdown(): Locator {
        return this.page.locator('[data-test="product-sort-container"]');
    }

    getActiveSortOption(): Locator {
        return this.page.locator('[data-test="active-option"]');
    }

    getItemNames(): Locator {
        return this.page.getByTestId('inventory-item-name');
    }

    getItemDescriptions(): Locator {
        return this.page.getByTestId('inventory-item-desc');
    }

    async getItemPrice(index: number = 0): Promise<string> {
        return await this.page.locator('[data-test="inventory-item"]').nth(index).locator('[data-test="inventory-item-price"]')
        .innerText();
    }

    async getItemName(index: number = 0): Promise<string> {
    return await this.page.locator('[data-test="inventory-item"]').nth(index).locator('[data-test="inventory-item-name"]')
    .innerText();
    }

    async selectSortOption(value: 'az' | 'za' | 'lohi' | 'hilo') {
        const dropdown = this.page.getByRole('combobox');
        await dropdown.selectOption(value);
    }

    async getActiveSortText() {
        return await this.getActiveSortOption().innerText();
    }

    getInventoryItemByName(itemName: string): Locator {
        return this.page.getByTestId('inventory-item').filter({ hasText: itemName });
    }

    async clickItemName(itemName: string) {
        const itemRow = this.getInventoryItemByName(itemName);
        await itemRow.getByTestId('inventory-item-name').click();
    }

    async addItemToCart(index: number = 0) {
        const addToCartButton = this.page.getByRole('button', { name: 'Add to cart' }).nth(index);
        await addToCartButton.click();
    }

    async removeItemFromCart() {
        const removeButton = this.page.getByRole('button', { name: 'Remove' }).first();
        await removeButton.click();
    }

    async addItemToCartByName(itemName: string) {
        const formattedName = itemName.toLowerCase().replace(/\s+/g, '-');
        const addToCartButton = this.page.locator(`[data-test="add-to-cart-${formattedName}"]`);
        await addToCartButton.scrollIntoViewIfNeeded();
        await addToCartButton.click();
    }

    async removeItemFromCartByName(itemName: string) {
        const formattedName = itemName.toLowerCase().replace(/\s+/g, '-');
        const removeButton = this.page.locator(`[data-test="remove-${formattedName}"]`);
        await removeButton.scrollIntoViewIfNeeded();
        await removeButton.click();
    }

    getRemoveButtonForItem(itemName: string): Locator {
        return this.getInventoryItemByName(itemName).getByRole('button', { name: 'Remove' });
    }
}