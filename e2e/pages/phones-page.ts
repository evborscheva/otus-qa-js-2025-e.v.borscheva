import { MainPage, ProductPage, Header } from './';
import { Page, Locator } from '@playwright/test';

class PhonesPage extends MainPage {
  page: Page;
  header: Header;
  firstPhone: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.header = new Header(page);
    this.firstPhone = page.locator('#tbodyid').getByRole('link').first();
  }

  async clickFirstPhonesBtn() {
    await this.firstPhone.click();
    return new ProductPage(this.page);
  }
}

export { PhonesPage };
