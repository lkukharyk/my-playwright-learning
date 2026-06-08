import { test, expect } from '@playwright/test';
import { BrokenImagesPage } from '../../pages/theinternet/BrokenImagesPage';

test.describe('Broken Images Verification', () => {
  let brokenImagesPage: BrokenImagesPage;

  test.beforeEach(async ({ page }) => {
    brokenImagesPage = new BrokenImagesPage(page);
    await brokenImagesPage.navigate();
  });

  test('broken images are detected on the page', async () => {
    const brokenCount = await brokenImagesPage.getBrokenImagesCount();
    if (brokenCount!=null) {
        console.log ("There's "+brokenCount+" broken images");
       expect(brokenCount, { message: 'Incorrect number of broken images detected' }).toBe(2); }
    else
        console.log("There's no broken images");
  });
});