import { type Page, type Locator } from '@playwright/test';
import { NavigatePages } from './NavigatePage';

export class BrokenImagesPage {
  private readonly page: Page;
  readonly images: Locator;

  constructor(page: Page) {
    this.page = page;
    this.images = page.getByRole('img');
  }

  async navigate(): Promise<void> {
    await this.page.goto('https://the-internet.herokuapp.com/broken_images');
  }

  async getBrokenImagesCount(): Promise<number> {
    const allImages = await this.images.all();
    let brokenCount = 0;

    for (const img of allImages) {
      const isBroken = await img.evaluate((el: HTMLImageElement) => {
        return !el.complete || el.naturalWidth === 0;
      });

      if (isBroken) {
        brokenCount++;
      }
    }

    return brokenCount;
  }
}