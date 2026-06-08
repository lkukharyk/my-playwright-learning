## What changed
## SauceDemo (Track A):
- Added Page Object classes for Login, Inventory, Cart, Checkout, Cart Badge
- Added 39 Playwright tests for login, cart, sorting, and checkout
- Added test data files
- Added README with setup and run instructions

## The Internet (Track C):
- Added Page Object classes for Main page, Broken Images, Checkboxes, Dropdown, Dynamic Loading, File Upload
- Added 27 Playwright tests for the next pages: Broken Images, Checkboxes, Dropdown, Dynamic Loading, File Upload
- Added test data files
- Added README with setup and run instructions

## Other changes
- Removed early exercise files (like testing the playwright.dev site) that do not belong to Saucedemo or Theinternet

## How tested
- `npx playwright test` — all tests pass
- `npx playwright show-report` — HTML report reviewed

## Checklist
- [x] No `test.only` left in code
- [x] No `waitForTimeout` used
- [x] No generated reports committed (`playwright-report/`, `test-results/`)
- [x] Tests pass locally with `--project=chromium`
- [x] README.md is complete
- [x] Locators are stable (semantic, no XPath)
- [x] Commit messages are clear