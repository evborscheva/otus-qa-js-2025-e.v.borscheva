import { Header } from './';
import { Page, Locator } from '@playwright/test';

class ProductPage {
  page: Page;
  header: Header;
  addToCartBtn: Locator;
  descriptionProduct: Locator;
  price: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
    this.descriptionProduct = page.getByText('Product description');
    this.price = page.locator('.price-container');
    this.addToCartBtn = page.getByRole('link', { name: 'Add to cart' });
  }

  async clickAddToCartBtn() {
    this.page.on('dialog', async dialog => {
      await dialog.accept();
    });
    await this.addToCartBtn.click();
  }
}

export { ProductPage };
