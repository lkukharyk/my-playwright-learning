import { test, expect } from '@playwright/test';


test("login should redirect to inventory", async ({ page }) => {
  await page.goto("/");
  await page.getByPlaceholder("Username").fill("standard_user");   // ← is this the real placeholder?
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL(/inventory/);
});

/* 
Root cause: Wrong username placeholder
Fix: "User Name" is replaced with "Username"
How I verified: Checked the placeholder in <input> tag in the browser using locator pick tool. Ran
npx playwright test --headed and checked that the test passed 
*/

test("error message on wrong password", async ({ page }) => {
  await page.goto("/");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("wrong_password");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.locator('[data-test="error"]')).toHaveText(
    "Epic sadface: Username and password do not match any user in this service"   // ← is this the exact text?
  );
});

/* 
Root cause: Different error message text than expected, getbytestid is not working for this element
Fix: Updated the expected error message to match the actual error message displayed, used locator to data-test instead
How I verified: Ran npx playwright test --ui to see the error message and checked that the test passed 
*/

test("cart badge appears after adding product", async ({ page }) => {
  await page.goto("/");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  await page.locator("[data-test=\"add-to-cart-sauce-labs-backpack\"]").click();   // ← something missing here

  await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
});

/* 
Root cause: await is missing. The test currently passes without it, but if server of saucedemo or testing env will not 
be quick enough, test will fail
Fix: await is added
How I verified: Ran npx playwright test --headed and checked that the test passed 
*/