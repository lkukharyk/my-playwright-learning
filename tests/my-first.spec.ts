import { test, expect } from '@playwright/test';

// POSITIVE test — checks that something IS as expected
test('page has the correct title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});

// NEGATIVE test — checks that something is NOT present.
// In QA, this is just as important as positive checks.
test('page does not contain error text', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  // .not.toBeVisible() = assert the element is NOT visible on the page
  await expect(page.getByText('404 Page Not Found')).not.toBeVisible();
 function getTimeout(seconds: number): number {
  return seconds * 1000;  // Hint: look at the return type
}
const config = { baseURL: "https://playwright.dev/" };
console.log(config.baseURL); 

function printName(name: string) {
  console.log(name);
}
const userName: string | undefined = "Joe";
printName(userName); 
});

test ('all the "Available for" links are valid', 
    async ({page}) => {
        await page.goto('https://playwright.dev');
        await expect(page.getByRole('link', { name: 'TypeScript' }))
  .toHaveAttribute('href', 'https://playwright.dev/docs/intro');
        await expect(page.getByRole('banner').getByRole('link', { name: 'Python' }))
  .toHaveAttribute('href', 'https://playwright.dev/python/docs/intro');
        await expect(page.getByRole('banner').getByRole('link', { name: '.NET' }))
  .toHaveAttribute('href', 'https://playwright.dev/dotnet/docs/intro');
        await expect(page.getByRole('banner').getByRole('link', { name: 'Java' }))
  .toHaveAttribute('href', 'https://playwright.dev/java/docs/intro');
  await expect (page.getByRole('link')).toHaveAttribute('aria-label', 'Star microsoft/playwright on GitHub');

  // ❌ Bad
page.locator("div:nth-child(3) > span");
// ✅ Good
const items = await page.getByTestId('item-name').nth(3).locator('span').all();

    });

test('Count the dropdown menu elements, then click the second one', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  const dropdown = page.getByRole('button', { name: 'Node.js' })
  await dropdown.hover();

  const langItems = page.locator('.dropdown__menu a');

  const itemCount = await langItems.count();
  console.log(`Total language options in dropdown ${itemCount}`);
  
  expect(itemCount).toBeGreaterThan(1);

  const secondItem = langItems.nth(1);
  await expect(secondItem).toBeVisible();
  
  await secondItem.click();
  await page.waitForURL(/.*python/);
  console.log("Second link in the dropdown menu is opened, and it's Python");

  //Disney Hotstar link locator - manually created:

//HTML:
/* <a href="https://www.hotstar.com/" target="_blank" rel="noreferrer noopener"><img src="img/logos/DHotstar.jpg" 
alt="Disney+ Hotstar"></a>*/
page.getByRole('link', { name: 'Disney+ Hotstar' });
// Icon locator:
page.getByRole('img', { name: 'Disney+ Hotstar' });

test('Select items using the functions', async ({ page }) => {
  await page.goto('your-website-url');

  //Test ID for Bike
const hotstarLocator_optimal = page.getByTestId('item-2');

  //XPath of <li> - Bike
  //*[@id="__docusaurus_skipToContent_fallback"]/main/section[6]/div/div/div/ul/li[4]

const hotstarLocator_xpath = page.locator("xpath=//a[img[@alt='Disney+ Hotstar']]");

//simple element without its own role - <kbd class="DocSearch-Button-Key">⌘</kbd>. Class isn't used because
//it's better to use the button (to which this kbd belongs) name, if the same kbd element is not the only one on the page.
const searchCommandKey = page.getByRole('button', { name: /search/i }).locator('kbd').getByText('⌘');

    });
});

