import { Header } from './fragments';
import { Page, Locator } from '@playwright/test';

class MainPage {
  page: Page;
  header: Header;
  phonesBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
    this.phonesBtn = page.getByRole('link', { name: 'Phones' });
  }

  async clickPhonesBtn() {
    await this.phonesBtn.click();
  }

  async open() {
    await this.page.goto('/');
  }
}

export { MainPage };
