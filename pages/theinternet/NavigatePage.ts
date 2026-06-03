import { type Page } from '@playwright/test';

export type PageName = 
  | 'Checkboxes'
  | 'Dropdown'
  | 'Broken Images' 
  | 'Dynamic Loading' 
  | 'File Upload';

export class NavigatePages {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(pageName: PageName, subRoute: string = ''): Promise<void> {
    await this.page.goto('https://the-internet.herokuapp.com/');
    await this.page.getByRole('link', { name: pageName, exact: true }).click();
    
    if (subRoute) {
      const currentUrl = this.page.url();
      await this.page.goto(`${currentUrl}/${subRoute}`);
    }
  }
}