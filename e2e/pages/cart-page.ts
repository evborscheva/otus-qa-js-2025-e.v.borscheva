import { Header } from './fragments/header';
import { Page, Locator } from '@playwright/test';

class CartPage {
  page: Page;
  header: Header;
  deleteBtn: Locator;
  placeOrderBtn: Locator;
  productItems: Locator;
  productPrice: Locator;
  productName: Locator;
  totalPrice: Locator;
  productImage: Locator;
  productImageTitle: Locator;
  productNameTitle: Locator;
  productPriceTitle: Locator;
  productRemoveTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
    this.deleteBtn = page.getByRole('link', { name: 'Delete' });
    this.placeOrderBtn = page.getByRole('button', { name: 'Place Order' });

    this.productImageTitle = page.getByRole('cell', { name: 'Pic' });
    this.productNameTitle = page.getByRole('cell', { name: 'Title' });
    this.productPriceTitle = page.getByRole('cell', { name: 'Price' });
    this.productRemoveTitle = page.getByRole('cell', { name: 'x', exact: true });

    this.productItems = page.locator('#tbodyid');
    this.productPrice = page.locator('#tbodyid').getByRole('cell').nth(2);
    this.productName = page.locator('#tbodyid').getByRole('cell').nth(1);
    this.productImage = page.locator('#tbodyid').getByRole('row').getByRole('img');
    this.totalPrice = page.locator('#totalp');
  }

  async clickPlaceOrderBtn() {
    await this.placeOrderBtn.click();
  }

  async clickDeleteBtn() {
    await this.deleteBtn.click();
  }
}

export { CartPage };
