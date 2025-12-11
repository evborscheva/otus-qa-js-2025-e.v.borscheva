import { CartPage } from '../';
import { Page, Locator } from '@playwright/test';

class Header {
  page: Page;
  root: Locator;
  pageHomeBtn: Locator;
  contactFormBtn: Locator;
  aboutFormBtn: Locator;
  pageCartBtn: Locator;
  loginBtninMenu: Locator;
  signUpBtninMenu: Locator;
  logOutBtninMenu: Locator;
  welcomeBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.root = page.locator('#navbarExample');
    this.pageHomeBtn = page.getByRole('link', { name: 'Home ' });
    this.contactFormBtn = page.getByRole('link', { name: 'Contact' });
    this.aboutFormBtn = page.getByRole('link', { name: 'About us' });
    this.pageCartBtn = page.getByRole('link', { name: 'Cart', exact: true });
    this.loginBtninMenu = page.getByRole('link', { name: 'Log in' });
    this.signUpBtninMenu = page.getByRole('link', { name: 'Sign up' });
    this.logOutBtninMenu = page.getByRole('link', { name: 'Log out' });
    this.welcomeBtn = page.locator('#nameofuser');
  }

  async clickPageCartBtn() {
    await this.pageCartBtn.click();
    return new CartPage(this.page);
  }

  async clickLoginBtn() {
    await this.loginBtninMenu.click();
  }
}

export { Header };
