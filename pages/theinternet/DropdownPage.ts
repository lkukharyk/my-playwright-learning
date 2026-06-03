import { type Page, type Locator } from '@playwright/test';
import { NavigatePages } from './NavigatePage';

export class DropdownPage {
  private readonly page: Page;
  readonly dropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dropdown = page.getByRole('combobox');
  }

async navigate(): Promise<void> {
  const navigation = new NavigatePages(this.page);
  await navigation.navigate('Dropdown');
}

  async selectOption(optionText: string): Promise<void> {
    await this.dropdown.selectOption({ label: optionText });
  }
}