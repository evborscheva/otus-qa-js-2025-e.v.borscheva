import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://otus.ru');
});

//понимаю, что это, скорее, UI тест
test('Кнопка "Войти" на странице только одна', async ({ page }) => {
  const searchButton = page.getByRole('button', { name: 'Войти' });
  await expect(searchButton).toHaveCount(1);
});

//UI тест
//работает
test('Отображение страницы авторизации при нажатии нопки \"Войти\"', async ({ page }) => {
  const searchButton = page.getByRole('button', { name: 'Войти' });
  await searchButton.click();
  const pageName = page.getByText('Войдите в свой аккаунт');
  await expect(pageName).toBeVisible();
  await expect(page.getByRole('textbox')).toHaveCount(2);
  await expect(page.getByRole('textbox').first()).toBeVisible();
  await expect(page.getByRole('textbox').nth(1)).toBeVisible();
});

//Из-за капчи тест не проходит до конца, падает((
test('Авторизация на сайте_0', async ({ page }) => {
  const searchButton = page.getByRole('button', { name: 'Войти' });
  await searchButton.click();
  await page.getByRole('textbox').nth(0).fill('e.v.borscheva@gmail.com');
  await page.getByRole('textbox').nth(1).fill('123QWEasd!');
  const Button = page.getByRole('button', { name: 'Войти' }).nth(1);
  await Button.click();
  await expect(page.getByText('Елена', { exact: true })).toBeVisible();
  await expect(page.getByRole('link').getByText('Мое обучение', { exact: true })).toBeVisible();
});

//Из-за капчи тест не проходит до конца, падает((
test('Авторизация на сайте_1', async ({ page }) => {
  const searchButton = page.getByRole('button', { name: 'Войти' });
  await searchButton.click();
  await page.locator('div#__PORTAL__ input').nth(0).fill('e.v.borscheva@gmail.com');
  await page.locator('div#__PORTAL__ input').nth(1).fill('123QWEasd!');
  //const Button = page.getByRole('button', { name: 'Войти' }).nth(1);
  const Button = page.locator('div#__PORTAL__ button');
  await Button.click();
  await expect(page.getByText('Елена', { exact: true })).toBeVisible();
  await expect(page.getByRole('link').getByText('Мое обучение', { exact: true })).toBeVisible();
});

//Не работает
test('Авторизация на сайте_2', async ({ page }) => {
  const searchButton = page.getByRole('button', { name: 'Войти' });
  await searchButton.click();
  await page.getByLabel('Электронная почта').fill('e.v.borscheva@gmail.com');
  //await page.getByLabel('Пароль').fill('123QWEasd!');
  await page.getByRole('textbox', { name: 'Пароль' }).fill('123QWEasd!');
  const Button = page.getByRole('button', { name: 'Войти' }).nth(1);
  await Button.click();
  await expect(page.getByText('Елена', { exact: true })).toBeVisible();
  await expect(page.getByRole('link').getByText('Мое обучение', { exact: true })).toBeVisible();
});

//Не работает
test('Авторизация на сайте_3', async ({ page }) => {
  const searchButton = page.getByRole('button', { name: 'Войти' });
  await searchButton.click();
  await page
    .getByRole('generic')
    .filter({ has: page.getByText('Электронная почта') })
    .getByRole('textbox')
    .fill('e.v.borscheva@gmail.com');

  await page
    .getByRole('generic')
    .filter({ has: page.getByText('Пароль') })
    .getByRole('textbox')
    .fill('123QWEasd!');

  const Button = page.getByRole('button', { name: 'Войти' }).nth(1);
  await Button.click();

  await expect(page.getByText('Елена', { exact: true })).toBeVisible();
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
