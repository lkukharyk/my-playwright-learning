import { type Page, type Locator } from '@playwright/test';
import { NavigatePages } from './NavigatePage';

export class DynamicLoadingPage {
  private readonly page: Page;
  readonly startButton: Locator;
  readonly loadingIndicator: Locator;
  readonly loadedText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.startButton = page.getByRole('button', { name: 'Start' });
    this.loadingIndicator = page.getByText('Loading...');
    this.loadedText = page.locator('id=finish');
  }

async navigateToExample(exampleNumber: 1 | 2): Promise<void> {
  const navigation = new NavigatePages(this.page);
  await navigation.navigate('Dynamic Loading', `${exampleNumber}`);
}

  async clickStart(): Promise<void> {
    await this.startButton.click();
  }

  async waitForLoadingToComplete(): Promise<void> {
    await this.loadingIndicator.waitFor({ state: 'hidden' });
  }
}