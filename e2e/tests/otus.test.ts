import { test, expect } from '@playwright/test';
import config from '../config/configOtus';

test.beforeEach(async ({ page }) => {
  await page.goto('https://otus.ru');
});

//понимаю, что это, скорее, UI тест
test('Кнопка "Войти" на странице только одна', async ({ page }) => {
  const searchButton = page.getByRole('button', { name: 'Войти' });
  await expect(searchButton).toHaveCount(1);
});

//UI тест
//C такими локаторами полей, увы, НЕ работает
test('Отображение страницы авторизации при нажатии нопки \"Войти\"', async ({ page }) => {
  const searchButton = page.getByRole('button', { name: 'Войти' });
  await searchButton.click();
  const pageName = page.getByText('Войдите в свой аккаунт');
  await expect(pageName).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Электронная почта' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Пароль' })).toBeVisible();
});

//локаторы для полей найдены через запуск codegen
//работает, заполняются поля, но из-за капчи тест не проходит до конца
test('Авторизация на сайте_0', async ({ page }) => {
  const searchButton = page.getByRole('button', { name: 'Войти' });
  await searchButton.click();

  const login = config.login!;
  const emailField = page.locator('input[name="email"]');
  await emailField.fill(login);

  const password = config.password!;
  const passwordField = page.locator('input[type="password"]');
  await passwordField.fill(password);

  //const Button = page.getByRole('button', { name: 'Войти' }).nth(1);
  const Button = page.locator('div#__PORTAL__ button');
  await Button.click();

  await expect(page.locator('.sc-r03h0s-5.sc-1youhxc-2.bYKNcH').filter({ hasText: 'Елена' })).toBeVisible();

  await expect(page.getByRole('link').getByText('Мое обучение', { exact: true })).toBeVisible();
});

//работает
test('Работа поля поиска', async ({ page }) => {
  await page.getByPlaceholder('Поиск курса').fill('javascript qa engineer');
  await page
    .getByRole('button')
    .filter({ has: page.getByRole('paragraph').getByText('JavaScript QA Engineer') })
    .click();
  await expect(page).toHaveURL('https://otus.ru/lessons/qajs/');
});

//работает
test('Поиск по каталогу курсов', async ({ page }) => {
  const searchButton = page.getByRole('link').getByText('Все курсы', { exact: true });
  await searchButton.click();
  await page.getByLabel('Архитектура').check();
  await page.getByLabel('Advanced').check();
  /*const allItems = await page.getByRole('main').locator('section').getByRole('link').all();
console.log(`Количество найденных курсов: ${allItems.length}`);*/
  await expect(page.getByRole('main').locator('section').getByRole('link')).toHaveCount(10);
});
