// import 'expect-puppeteer';

const baseUrl = 'http://localhost:3000';

// E2E: Add to cart, change quantity and remove from cart
test('Add to cart, update amount, delete product from cart', async () => {
  await page.goto(`${baseUrl}/`);
  await expect(page).toClick('[data-test-id="register-link"]');
  await page.waitForNavigation();
  expect(page.url()).toBe(`${baseUrl}/register`);
  await expect(page).toFill('[data-test-id="register-username"]', 'Flo');
  await expect(page).toFill('[data-test-id="register-password"]', '123');
  await expect(page).toClick('[data-test-id="register-button"]');
  await page.waitForNavigation();
  await expect(page).toMatch('Available Pokemon Cards');
  await expect(page).toClick('[data-test-id="product-1"]');
  await page.waitForNavigation();
  expect(page.url()).toBe(`${baseUrl}/products/1`);
  await expect(page).toClick('[data-test-id="product-add-to-cart"]');
  await expect(page).toMatchElement('[data-test-id="cart-count"]', {
    text: '1',
  });
  await page.goto(`${baseUrl}/`);
  await expect(page).toClick('[data-test-id="product-1"]');
  await page.waitForNavigation();
  // go to single product page with id 1
  expect(page.url()).toBe(`${baseUrl}/products/1`);
  await expect(page).toClick('[data-test-id="product-add-to-cart"]');
  await expect(page).toMatchElement('[data-test-id="cart-count"]', {
    text: '2',
  });
  await expect(page).toClick('[data-test-id="cart-link"]');
  await page.waitForNavigation();
  // go to cart page
  expect(page.url()).toBe(`${baseUrl}/cart`);
  await expect(page).toClick('[data-test-id="cart-product-remove-1"]');
  await expect(page).toMatchElement('[data-test-id="cart-count"]', {
    text: '0',
  });
});

// E2E Test for checkout flow, filling out form and thanks page

test('Checkout flow', async () => {
  await page.goto(`${baseUrl}/`);
  await expect(page).toMatch('Available Pokemon Cards');
  expect(page.url()).toBe(`${baseUrl}/`);
  await expect(page).toClick('[data-test-id="cart-link"]');
  await page.waitForNavigation();
  expect(page.url()).toBe(`${baseUrl}/cart`);
  await expect(page).toClick('[data-test-id="cart-checkout"]');
  await page.waitForNavigation();
  expect(page.url()).toBe(`${baseUrl}/checkout`);
  await expect(page).toFill('[data-test-id="checkout-first-name"]', 'Flo');
  await expect(page).toFill('[data-test-id="checkout-last-name"]', 'Görlich');
  await expect(page).toFill(
    '[data-test-id="checkout-email"]',
    'flo@upleveled.com',
  );
  await expect(page).toFill('[data-test-id="checkout-address"]', 'Wald');
  await expect(page).toFill('[data-test-id="checkout-city"]', 'Vienna');
  await expect(page).toFill('[data-test-id="checkout-postal-code"]', '1140');
  await expect(page).toFill('[data-test-id="checkout-country"]', 'Austria');
  await expect(page).toFill(
    '[data-test-id="checkout-credit-card"]',
    '1234567891234567',
  );
  await expect(page).toFill(
    '[data-test-id="checkout-expiration-date"]',
    '02/22',
  );
  await expect(page).toFill('[data-test-id="checkout-security-code"]', '123');
  await expect(page).toClick('[data-test-id="checkout-confirm-order"]');
  await page.waitForNavigation();
  expect(page.url()).toBe(`${baseUrl}/thanks`);
  await expect(page).toMatch('Thank you for your order');
});
