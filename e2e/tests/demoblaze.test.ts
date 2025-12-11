import { test, expect } from '@playwright/test';
import { CartPage, MainPage, PhonesPage, FormPlaceOrderFragment, FormSuccess, LoginForm } from '../pages';
import config from '../config/configDemoblaze';

test('Добавление одного товара в корзину', async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.open();
  await mainPage.clickPhonesBtn();
  const phonesPage = new PhonesPage(page);
  const productPage = await phonesPage.clickFirstPhonesBtn();

  await expect(productPage.price).toBeVisible();
  await expect(productPage.price).toHaveText(/\$\d+/);

  await expect(productPage.descriptionProduct).toBeVisible();

  await productPage.clickAddToCartBtn();
  await mainPage.header.clickPageCartBtn();
  const cartPage = new CartPage(page);

  await expect(cartPage.productImageTitle).toBeVisible();
  await expect(cartPage.productNameTitle).toBeVisible();
  await expect(cartPage.productPriceTitle).toBeVisible();
  await expect(cartPage.productRemoveTitle).toBeVisible();

  await expect(cartPage.productPrice).toBeVisible();
  await expect(cartPage.productPrice).toHaveText(/\d+/);

  await expect(cartPage.productName).toBeVisible();
  await expect(cartPage.productName).not.toBeEmpty();

  await expect(cartPage.productImage).toBeVisible();

  await expect(cartPage.deleteBtn).toBeVisible();

  await expect(cartPage.totalPrice).toBeVisible();
  await expect(cartPage.totalPrice).toHaveText(/\d+/);

  const productPriceText = await cartPage.productPrice.textContent();
  const totalPriceText = await cartPage.totalPrice.textContent();

  expect(productPriceText).toBe(totalPriceText);
});

test('Удаление одного товара из корзины', async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.open();
  await mainPage.clickPhonesBtn();
  const phonesPage = new PhonesPage(page);
  const productPage = await phonesPage.clickFirstPhonesBtn();
  await productPage.clickAddToCartBtn();
  await mainPage.header.clickPageCartBtn();
  const cartPage = new CartPage(page);
  await expect(cartPage.productItems).not.toBeEmpty();
  await cartPage.clickDeleteBtn();

  await expect(cartPage.productImage).toBeHidden();
  await expect(cartPage.productPrice).toBeHidden();
  await expect(cartPage.productName).toBeHidden();
  await expect(cartPage.deleteBtn).toBeHidden();
  await expect(cartPage.totalPrice).toBeHidden();

  await expect(cartPage.productImageTitle).toBeVisible();
  await expect(cartPage.productNameTitle).toBeVisible();
  await expect(cartPage.productPriceTitle).toBeVisible();
  await expect(cartPage.productRemoveTitle).toBeVisible();
});

test('Добавление одного товара в корзину и оформление заказа', async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.open();
  await mainPage.clickPhonesBtn();
  const phonesPage = new PhonesPage(page);
  const productPage = await phonesPage.clickFirstPhonesBtn();
  await productPage.clickAddToCartBtn();
  await mainPage.header.clickPageCartBtn();
  const cartPage = new CartPage(page);
  await cartPage.clickPlaceOrderBtn();
  const formPlaceOrderFragment = new FormPlaceOrderFragment(page);
  await formPlaceOrderFragment.fillPlaceOrderForm('Elena', 'Russia', 'Moscow', '1234', '05', '1980');
  await formPlaceOrderFragment.clickPurchaseBtn();
  const formSuccess = new FormSuccess(page);

  await expect(formSuccess.headingSuccessForm).toBeVisible();

  await expect(formSuccess.contentSuccessForm).toHaveText(/Id: \d+/);
  await expect(formSuccess.contentSuccessForm).toHaveText(/Elena/);
  await expect(formSuccess.contentSuccessForm).toHaveText(/Card Number: 1234/);

  await expect(formSuccess.successFormBtn).toBeVisible();
  await expect(formSuccess.successFormBtn).toBeEnabled();

  await formSuccess.SuccessFormBtn();

  await expect(formSuccess.headingSuccessForm).toBeHidden();
  await expect(formSuccess.contentSuccessForm).toBeHidden();
  await expect(formSuccess.successFormBtn).toBeHidden();
});

test('Вход в личный кабинет', async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.open();
  await mainPage.header.clickLoginBtn();
  const loginForm = new LoginForm(page);
  const login = config.login!;
  const password = config.password!;
  await loginForm.fillLoginForm(login, password);
  await loginForm.clickLoginBtn();
  await expect(mainPage.header.logOutBtninMenu).toBeVisible();
  await expect(mainPage.header.loginBtninMenu).toBeHidden();
  await expect(mainPage.header.signUpBtninMenu).toBeHidden();
  await expect(mainPage.header.welcomeBtn).toBeVisible();
  await expect(mainPage.header.welcomeBtn).toHaveText('Welcome Elena12345');
});
