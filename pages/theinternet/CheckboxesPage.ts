import { type Page, type Locator } from '@playwright/test';
import { NavigatePages } from './NavigatePage';

export class CheckboxesPage {
  private readonly page: Page;
  readonly firstCheckbox: Locator;
  readonly secondCheckbox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstCheckbox = page.getByRole('checkbox').first();
    this.secondCheckbox = page.getByRole('checkbox').last();
  }

async navigate(): Promise<void> {
  const navigation = new NavigatePages(this.page);
  await navigation.navigate('Checkboxes');
}

  async setCheckboxState(checkbox: Locator, checked: boolean): Promise<void> {
    await checkbox.setChecked(checked);
  }
}