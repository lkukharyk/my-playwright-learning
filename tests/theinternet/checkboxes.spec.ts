import { test, expect } from '@playwright/test';
import { CheckboxesPage } from '../../pages/theinternet/CheckboxesPage';

test.describe('Checkboxes Functionality', () => {
  let checkboxesPage: CheckboxesPage;

  test.beforeEach(async ({ page }) => {
    checkboxesPage = new CheckboxesPage(page);
    await checkboxesPage.navigate();
  });

  test('user can check and uncheck individual checkboxes', async () => {
    await checkboxesPage.setCheckboxState(checkboxesPage.firstCheckbox, true);
    await expect(checkboxesPage.firstCheckbox, { 
        message: 'The first checkbox should be checked after the user interacts with it' }).toBeChecked();

    await checkboxesPage.setCheckboxState(checkboxesPage.secondCheckbox, false);
    await expect(checkboxesPage.secondCheckbox, { 
        message: 'The second checkbox should be unchecked after the user interacts with it' }).not.toBeChecked();
  });

  test('user can check both checkboxes simultaneously', async () => {
    await checkboxesPage.setCheckboxState(checkboxesPage.firstCheckbox, true);
    await checkboxesPage.setCheckboxState(checkboxesPage.secondCheckbox, true);

    await expect(checkboxesPage.firstCheckbox, { 
        message: 'The first checkbox should be checked when both are checked' }).toBeChecked();
    await expect(checkboxesPage.secondCheckbox, { 
        message: 'The second checkbox should be checked when both are checked' }).toBeChecked();
  });

  test('user can uncheck both checkboxes simultaneously', async () => {
    await checkboxesPage.setCheckboxState(checkboxesPage.firstCheckbox, false);
    await checkboxesPage.setCheckboxState(checkboxesPage.secondCheckbox, false);

    await expect(checkboxesPage.firstCheckbox, { 
        message: 'The first checkbox should be unchecked when both are unchecked' }).not.toBeChecked();
    await expect(checkboxesPage.secondCheckbox, { 
        message: 'The second checkbox should be unchecked when both are unchecked' }).not.toBeChecked();
  });
  });
