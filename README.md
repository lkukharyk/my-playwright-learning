# Final Project — Playwright Test Suite

## Test targets
1. SauceDemo (https://www.saucedemo.com)
2. TheInternet (https://the-internet.herokuapp.com/)

## 1. SauceDemo

## Covered user journey
Login → product selection → cart → checkout

## Test cases
- Valid user can log in
- Locked user cannot log in
- User can add product to cart
- User can remove product from cart
- User can sort products by price
- User can complete checkout and see success message

## Project structure
- `pages/saucedemo` — Page Object classes (LoginPage, InventoryPage, CartPage, CheckoutPage, CartBadge)
- `tests/saucedemo` — test specs (*.spec.ts)
- `test-data/` — credentials and test inputs
- `playwright.config.ts` — configuration

## How to run
```bash
npm install
npx playwright install
npx playwright test saucedemo
npx playwright show-report
```

## Notes
- No hard waits (`waitForTimeout`) are used
- Tests use semantic locators (`getByRole`, `getByTestId`, `getByPlaceholder`), and, in some cases, page.locator with data-test
- Test data is stored separately from test logic
- playwright.config.ts contains https://www.saucedemo.com as base url

## Known limitations
- This suite covers only the selected user journey
- It does not cover all possible edge cases


## 2. TheInternet (Track C, technical UI practice)

## Covered user journey
- Separate interactions that can be done in any order because each page has isolated functionality

## Test cases
- Checkboxes can be selected and unselected
- Dropdown option can be selected
- Dynamic loading waits for final text without hard wait
- File upload shows uploaded file name
- Broken images are detected

## Project structure
- `pages/theinternet` — Page Object classes (BrokenImagesPage, CheckboxesPage, DropdownPage, DynamicLoadingPage, FileUploadPage, NavigatePage)
- `tests/theinternet` — test specs (*.spec.ts)
- `test-data/` — test inputs
- `playwright.config.ts` — configuration

## How to run
```bash
npm install
npx playwright install
npx playwright test theinternet
npx playwright show-report
```

## Notes
- No hard waits (`waitForTimeout`) are used
- Tests use semantic locators (`getByRole`, `getByTestId`, `getByPlaceholder`)
- Test data is stored separately from test logic

## Known limitations
- This suite covers only part of the pages on https://the-internet.herokuapp.com/ site
- It does not cover all possible edge cases