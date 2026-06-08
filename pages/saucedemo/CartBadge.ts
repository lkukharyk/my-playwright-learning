import { type Locator, type Page } from "@playwright/test";

export class CartBadge {
    readonly page: Page;
    readonly cartLink: Locator;
    readonly badgeCount: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartLink = page.locator('.shopping_cart_link');
        this.badgeCount = page.locator('[data-test="shopping-cart-badge"]');
    }

async clickCart() {
    await this.cartLink.click();
}

    async getBadgeCount(): Promise<string> {
            return await this.badgeCount.innerText();
    }

    async isBadgeCountVisible(): Promise<boolean> {
        return await this.badgeCount.isVisible();
    }
    
    async isBadgeVisible(): Promise<boolean> {
        return await this.cartLink.isVisible();
    }
}