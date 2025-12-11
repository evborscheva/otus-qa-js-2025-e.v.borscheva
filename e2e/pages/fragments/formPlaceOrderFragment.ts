import { Page, Locator } from '@playwright/test';

class FormPlaceOrderFragment {
  page: Page;
  root: Locator;
  inputName: Locator;
  inputCountry: Locator;
  inputCity: Locator;
  inputCreditCard: Locator;
  inputMonth: Locator;
  inputYear: Locator;
  purchaseBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.root = page.locator('#orderModal div.modal-content');
    this.inputName = page.getByLabel('Name:');
    this.inputName = page.getByRole('textbox', { name: 'Name:' });
    this.inputCountry = page.getByRole('textbox', { name: 'Country:' });
    this.inputCountry = page.getByLabel('Country:');
    this.inputCity = page.getByRole('textbox', { name: 'City:' });
    this.inputCity = page.getByLabel('City:');
    this.inputCreditCard = page.getByLabel('Credit card:');
    this.inputCreditCard = page.getByRole('textbox', { name: 'Credit card:' });
    this.inputMonth = page.getByRole('textbox', { name: 'Month:' });
    this.inputMonth = page.getByLabel('Month:');
    this.inputYear = page.getByLabel('Year:');
    this.inputYear = page.getByRole('textbox', { name: 'Year:' });
    this.purchaseBtn = page.getByRole('button', { name: 'Purchase' });
  }

  async fillPlaceOrderForm(
    name: string,
    country: string,
    city: string,
    creditCard: string,
    month: string,
    year: string
  ) {
    await this.inputName.fill(name);
    await this.inputCountry.fill(country);
    await this.inputCity.fill(city);
    await this.inputCreditCard.fill(creditCard);
    await this.inputMonth.fill(month);
    await this.inputYear.fill(year);
  }

  async clickPurchaseBtn() {
    await this.purchaseBtn.click();
  }
}
export { FormPlaceOrderFragment };
