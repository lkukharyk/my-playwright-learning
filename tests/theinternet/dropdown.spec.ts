import { test, expect } from '@playwright/test';
import { DropdownPage } from '../../pages/theinternet/DropdownPage';

test.describe('Dropdown Functionality', () => {
  let dropdownPage: DropdownPage;

  test.beforeEach(async ({ page }) => {
    dropdownPage = new DropdownPage(page);
    await dropdownPage.navigate();
  });

  test('user can select Option 1 from the dropdown menu', async () => {
    await dropdownPage.selectOption('Option 1');
    await expect(dropdownPage.dropdown, { 
        message: 'The dropdown value should be updated to Option 1 after selection' }).toHaveValue('1');
  });

  test('user can select Option 2 from the dropdown menu', async () => {
    await dropdownPage.selectOption('Option 2');
    await expect(dropdownPage.dropdown, { 
        message: 'The dropdown value should be updated to Option 2 after selection' }).toHaveValue('2');
  });
});