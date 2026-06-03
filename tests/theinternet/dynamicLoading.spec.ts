import { test, expect } from '@playwright/test';
import { DynamicLoadingPage } from '../../pages/theinternet/DynamicLoadingPage';

test.describe('Dynamic Loading', () => {
  let dynamicLoadingPage: DynamicLoadingPage;

  test.beforeEach(async ({ page }) => {
    dynamicLoadingPage = new DynamicLoadingPage(page);
  });

  test('hidden element becomes visible after asynchronous loading delay', async () => {
    await dynamicLoadingPage.navigateToExample(1);
    await dynamicLoadingPage.clickStart();
    await dynamicLoadingPage.waitForLoadingToComplete();
    
    await expect(dynamicLoadingPage.loadedText, { message: 'Text container failed to appear' }).toHaveText('Hello World!');
  });

  test('newly rendered element appears in DOM and becomes visible after asynchronous loading delay', async () => {
    await dynamicLoadingPage.navigateToExample(2);
    await dynamicLoadingPage.clickStart();
    await dynamicLoadingPage.waitForLoadingToComplete();
    
    await expect(dynamicLoadingPage.loadedText, { message: 'Text container failed to render' }).toHaveText('Hello World!');
  });
});