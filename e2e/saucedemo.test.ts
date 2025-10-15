import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  const searchLoginInput = page.getByPlaceholder('Username');
  const searchPasswordInput = page.locator('#password');
  const searchButton = page.getByTestId('login-button');

  await searchLoginInput.fill('standard_user');
  await searchPasswordInput.fill('secret_sauce');
  await searchButton.click();

  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await expect(page.getByTestId('shopping-cart-link')).toBeVisible();
});

//знаю, что привязываться к элементу страницы по тестовому идентификатору - самый надежный метод.
//Но тут старалась по возможности пробовать самые разные встроенные методы, чтобы понимать, как они работают

//здесь все тесты работают

//понимаю, что это, скорее, UI тест.
test('Появление количества товара на значке корзины', async ({ page }) => {
  const AddToCartButton = page.getByRole('button', { name: 'Add to cart' });
  await AddToCartButton.first().click();
  await expect(page.getByTestId('shopping-cart-badge')).toBeVisible();
  await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');
  await AddToCartButton.nth(1).click();
  await expect(page.getByTestId('shopping-cart-badge')).toHaveText('2');
});

test('Добавление одного товара в корзину', async ({ page }) => {
  const AddToCartButton = page.getByRole('button', { name: 'Add to cart' });
  await AddToCartButton.first().click();
  await page.getByTestId('shopping-cart-link').click();
  await expect(page.getByTestId('inventory-item')).toBeVisible();
  await expect(page.getByTestId('inventory-item')).toBeEnabled();
});

test('Удаление товара из корзины (добавлен только один товар)', async ({ page }) => {
  const AddToCartButton = page.getByRole('button', { name: 'Add to cart' });
  await AddToCartButton.first().click();
  await page.getByTestId('shopping-cart-link').click();
  await expect(page.getByTestId('inventory-item')).toBeVisible();
  await expect(page.getByTestId('inventory-item')).toBeEnabled();

  await page.getByTestId('inventory-item').getByRole('button', { name: 'Remove' }).click();
  await expect(page.getByTestId('inventory-item')).toBeHidden();
  await expect(page.locator('.removed_cart_item')).toBeAttached();
});

test('Удаление одного товара из корзины (добавлены 2 товара)', async ({ page }) => {
  const AddToCartButton = page.getByRole('button', { name: 'Add to cart' });

  await AddToCartButton.first().click();
  await AddToCartButton.nth(1).click();
  await page.getByTestId('shopping-cart-link').click();

  await expect(page.getByTestId('inventory-item')).toHaveCount(2);

  await expect(page.getByTestId('inventory-item').nth(0)).toBeVisible();
  await expect(page.getByTestId('inventory-item').nth(0)).toBeEnabled();

  await expect(page.getByTestId('inventory-item').nth(1)).toBeVisible();
  await expect(page.getByTestId('inventory-item').nth(1)).toBeEnabled();

  await page.getByTestId('inventory-item').nth(0).getByRole('button', { name: 'Remove' }).click();

  await expect(page.getByTestId('inventory-item')).toHaveCount(1);
  await expect(page.locator('.removed_cart_item')).toBeAttached();
});
