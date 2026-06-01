import { test, expect } from "@playwright/test";
import { validUser, getLoginUrl, product1, splitName } from "./test-data.ts";

test("test data is wired correctly", async () => {
  const { email, password } = validUser;  // destructuring!
  console.log("URL:", getLoginUrl("staging"));
  console.log("Email:", email);
  console.log("Password:", password);
  // Does it print what you expect?
});

test("product name contains all three values", async () => {
  const parts = splitName(product1);

 await expect((parts.length), 
 "Expected product name to have at most 3 parts separated by commas").toBeGreaterThanOrEqual(3);

 await parts.forEach((part, i) => {
    console.log(`${i + 1}. ${part}`);
  });
});