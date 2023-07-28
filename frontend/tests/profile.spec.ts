import { BrowserContext, Page, expect, request, test } from "@playwright/test";

test("Is logged in", async ({ page }) => {
  await page.goto("http://localhost/");
  await expect(page.getByRole("link", { name: "Sign in" })).toBeHidden();
});

test("Can search products", async ({ page }) => {
  await page.goto("http://localhost/");
  await page.getByText("Oily").click();
  await page.getByText("Sensitive", { exact: true }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("button", { name: "Add Products" }).click();
  await page.getByPlaceholder("Search for products...").click();
  await page.getByPlaceholder("Search for products...").fill("oil");
  await page.getByText("Oil & Pore Reducing Facial MoisturizerMuradAdd").click({
    button: "middle",
  });
  await page.getByText("Oil & Pore Reducing Facial Moisturizer").click({
    button: "middle",
  });
  await page.getByText("Effaclar Mat Oil-Free Mattifying Moisturizer").click({
    button: "middle",
  });
  await page.getByText("Avocado Oil Serum").click({
    button: "middle",
  });
  await page.getByText("Oil Free Face Moisturizer with SPF15").click({
    button: "middle",
  });
  await page
    .getByText("Roma Truffle Therapy Face Toner & Cleansing Oil Duo")
    .click({
      button: "middle",
    });
  await page
    .locator("div")
    .filter({ hasText: /^Oil & Pore Reducing Facial MoisturizerMuradAdd$/ })
    .getByRole("button")
    .click({
      button: "middle",
    });

  await expect(
    page
      .locator('[id="headlessui-dialog-panel-\\:r8\\:"]')
      .getByRole("button")
      .filter({ hasText: "Add" })
  ).toHaveCount(5);
});

test("Can setup SkinProfile", async ({ page }) => {
  await page.goto("http://localhost/");
  await page.getByText("Dry").click();
  await page.getByText("Sensitive", { exact: true }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("button", { name: "Add Products" }).click();
  await page.getByPlaceholder("Search for products...").click();
  await page.getByPlaceholder("Search for products...").fill("sunscreen");
  await page
    .locator("div")
    .filter({
      hasText:
        /^Max Mineral Tinted Sunscreen Broad Spectrum SPF 45, 1\.7 Fl OzPeter ThomasAdd$/,
    })
    .getByRole("button")
    .click();
  await page
    .locator("div")
    .filter({
      hasText: /^SPF 30 Mineral Sunscreen, 3\.2 fl\. oz\.Hampton SunAdd$/,
    })
    .getByRole("button")
    .click();
  await page
    .locator("div")
    .filter({
      hasText: /^SPF 30 mineral sunscreen, 1\.7 fl\. oz\.Malin \+ GoetzAdd$/,
    })
    .getByRole("button")
    .click();
  await page
    .locator("div")
    .filter({
      hasText:
        /^Organic Mineral Matte Tinted Sunscreen SPF 30 Sunblock, 1\.7 Fl OzCOOLAAdd$/,
    })
    .getByRole("button")
    .click();
  await page.locator('[id="headlessui-dialog-panel-\\:r8\\:"] path').click();
  await page.getByRole("button", { name: "Create SkinProfile" }).click();
  await page
    .locator('[id="headlessui-dialog-panel-\\:ra\\:"] > div > .svg-inline--fa')
    .click();
  await page.locator('[id="headlessui-popover-button-\\:r0\\:"]').click();
  await page.getByRole("link", { name: "Account settings" }).click();

  // Test if products were added
  await expect(
    page.getByText(
      "Max Mineral Tinted Sunscreen Broad Spectrum SPF 45, 1.7 Fl Oz"
    )
  ).toBeVisible();
  await expect(
    page.getByText("SPF 30 Mineral Sunscreen, 3.2 fl. oz.")
  ).toBeVisible();
  await expect(
    page.getByText("SPF 30 mineral sunscreen, 1.7 fl. oz.")
  ).toBeVisible();
  await expect(
    page.getByText(
      "Organic Mineral Matte Tinted Sunscreen SPF 30 Sunblock, 1.7 Fl Oz"
    )
  ).toBeVisible();
});

test("Can remove items", async ({ page }) => {
  await page.goto("http://localhost/account");
  await page
    .locator("div")
    .filter({
      hasText:
        /^Max Mineral Tinted Sunscreen Broad Spectrum SPF 45, 1\.7 Fl OzPeter ThomasRemove$/,
    })
    .getByRole("button")
    .click();
  await page
    .locator("div")
    .filter({
      hasText: /^SPF 30 Mineral Sunscreen, 3\.2 fl\. oz\.Hampton SunRemove$/,
    })
    .getByRole("button")
    .click();
  await page
    .locator("div")
    .filter({
      hasText: /^SPF 30 mineral sunscreen, 1\.7 fl\. oz\.Malin \+ GoetzRemove$/,
    })
    .getByRole("button")
    .click();
  await page.getByRole("button", { name: "Remove" }).click();

  // Test if products were hidden
  await expect(
    page.getByText(
      "Max Mineral Tinted Sunscreen Broad Spectrum SPF 45, 1.7 Fl Oz"
    )
  ).toBeHidden();
  await expect(
    page.getByText("SPF 30 Mineral Sunscreen, 3.2 fl. oz.")
  ).toBeHidden();
  await expect(
    page.getByText("SPF 30 mineral sunscreen, 1.7 fl. oz.")
  ).toBeHidden();
  await expect(
    page.getByText(
      "Organic Mineral Matte Tinted Sunscreen SPF 30 Sunblock, 1.7 Fl Oz"
    )
  ).toBeHidden();
});

test("Can add items back", async ({ page }) => {
  await page.goto("http://localhost/account");
  await page.getByRole("button", { name: "Add Products" }).click();
  await page.getByPlaceholder("Search for products...").fill("sunscr");
  await page
    .locator("div")
    .filter({
      hasText:
        /^Max Mineral Tinted Sunscreen Broad Spectrum SPF 45, 1\.7 Fl OzPeter ThomasAdd$/,
    })
    .getByRole("button")
    .click();
  await page
    .locator("div")
    .filter({
      hasText: /^SPF 30 Mineral Sunscreen, 3\.2 fl\. oz\.Hampton SunAdd$/,
    })
    .getByRole("button")
    .click();
  await page
    .locator("div")
    .filter({
      hasText: /^SPF 30 mineral sunscreen, 1\.7 fl\. oz\.Malin \+ GoetzAdd$/,
    })
    .getByRole("button")
    .click();
  await page
    .locator("div")
    .filter({
      hasText:
        /^Organic Mineral Matte Tinted Sunscreen SPF 30 Sunblock, 1\.7 Fl OzCOOLAAdd$/,
    })
    .getByRole("button")
    .click();
  await page.locator('[id="headlessui-dialog-panel-\\:r6\\:"] svg').click();

  await expect(
    page.getByText(
      "Max Mineral Tinted Sunscreen Broad Spectrum SPF 45, 1.7 Fl Oz"
    )
  ).toBeVisible();
  await expect(
    page.getByText("SPF 30 Mineral Sunscreen, 3.2 fl. oz.")
  ).toBeVisible();
  await expect(
    page.getByText("SPF 30 mineral sunscreen, 1.7 fl. oz.")
  ).toBeVisible();
  await expect(
    page.getByText(
      "Organic Mineral Matte Tinted Sunscreen SPF 30 Sunblock, 1.7 Fl Oz"
    )
  ).toBeVisible();
});

// Test if results show up correctly at http://localhost/account/results
test("Can see results", async ({ page }) => {
  await page.goto("http://localhost/account/results");
  await expect(page.getByText("1,2-HEXANEDIOL")).toBeVisible();
  await expect(page.getByText("ALOE BARBADENSIS LEAF JUICE")).toBeVisible();
  await expect(page.getByText("ALUMINA")).toBeVisible();
  await expect(page.getByText("AMINOMETHYL PROPANOL")).toBeVisible();
});

test("Does have products", async ({ page }) => {
  await page.goto("http://localhost/products");
  await page.getByText("Off").click();
  await expect(
    page
      .locator(".flex-initial > .w-full")
      .filter({ hasText: "SHOW DETAILS" })
      .first()
  ).toBeVisible();
});

test("Can view product details", async ({ page }) => {
  await page.goto("http://localhost/products");

  await page.getByRole("button", { name: "Show details" }).first().click();
  await expect(
    page.getByText("I'm Rice Exfoliating Enzyme Cleanser, 50 g")
  ).toBeVisible();
  await page.locator(".sticky > svg").click();
});

test("SkinProfile product filter is working", async ({ page }) => {
  await page.goto("http://localhost/products");

  await page.getByText("Off").click();
  await page.getByText("Sunscreens", { exact: true }).click();

  const unfilteredCount = await page
    .locator(".flex-initial > .w-full")
    .filter({ hasText: "SHOW DETAILS" })
    .count();

  await page.getByText("On", { exact: true }).click();
  expect(
    await page
      .locator(".flex-initial > .w-full")
      .filter({ hasText: "SHOW DETAILS" })
      .count()
  ).toBeLessThan(unfilteredCount);

  await page.getByText("Sunscreens", { exact: true }).click();
  await page.getByText("Off").click();
});

test("Can infinite scroll", async ({ page }) => {
  await page.goto("http://localhost/products");

  await page.getByText("Off").click();
  const showDetailsElements = page
    .locator(".flex-initial > .w-full")
    .filter({ hasText: "SHOW DETAILS" });

  await showDetailsElements.first().isVisible();
  await expect(showDetailsElements).toHaveCount(25);

  await showDetailsElements.last().scrollIntoViewIfNeeded();

  await expect(showDetailsElements).toHaveCount(50);
});

// Test category filters
test("Can filter by category", async ({ page }) => {
  await page.goto("http://localhost/products");

  await expect(page.getByText("spf 30").first()).toBeHidden();

  await page.getByText("Off").click();
  await page.getByText("Sunscreens", { exact: true }).click();

  await expect(page.getByText("spf 30").first()).toBeVisible();

  await page.getByText("Sunscreens", { exact: true }).click();
});

// Test Effect filters
test("Can filter by effect", async ({ page }) => {
  await page.goto("http://localhost/products");

  await expect(page.getByText("spf 30").first()).toBeHidden();

  await page.getByText("Off").click();
  await page.getByText("UV-Protecting", { exact: true }).click();

  await expect(page.getByText("spf 30").first()).toBeVisible();

  await page.getByText("UV-Protecting", { exact: true }).click();
});

test("Filter state is preserved in localstorage", async ({ page }) => {
  await page.goto("http://localhost/products");

  await expect(page.getByText("spf 30").first()).toBeHidden();

  await page.getByText("Off").click();
  await page.getByText("UV-Protecting", { exact: true }).click();

  await page.goto("http://localhost/products");

  await expect(page.getByText("spf 30").first()).toBeVisible();

  await page.getByText("UV-Protecting", { exact: true }).click();
});
