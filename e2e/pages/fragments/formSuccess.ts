import { Page, Locator } from '@playwright/test';

class FormSuccess {
  page: Page;
  contentSuccessForm: Locator;
  root: Locator;
  successFormBtn: Locator;
  headingSuccessForm: Locator;

  constructor(page: Page) {
    this.page = page;
    this.root = page.locator('div.showSweetAlert');
    this.headingSuccessForm = page.getByRole('heading', { name: 'Thank you for your purchase!' });
    this.contentSuccessForm = page.locator('div.showSweetAlert p');
    this.successFormBtn = page.getByRole('button', { name: 'OK' });
  }

  async SuccessFormBtn() {
    await this.successFormBtn.click();
  }
}

export { FormSuccess };
