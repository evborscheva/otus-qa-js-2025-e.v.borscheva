import { Page, Locator } from '@playwright/test';

class LoginForm {
  page: Page;
  root: Locator;
  inputUsername: Locator;
  inputPassword: Locator;
  loginBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.root = page.locator('div.modal-content').filter({ hasText: 'Log in' });
    this.inputUsername = page.locator('#loginusername'); //привязаться по имени поля/лейблу не получилось, так как есть 2 поля с таким лейблом (форма авторизации и форма регистрации)
    this.inputPassword = page.locator('#loginpassword'); // та же ситуация, что и с логином
    this.loginBtn = page.getByRole('button', { name: 'Log in' });
  }

  async clickLoginBtn() {
    await this.loginBtn.click();
  }

  async fillLoginForm(login: string, password: string) {
    await this.inputUsername.fill(login);
    await this.inputPassword.fill(password);
  }
}

export { LoginForm };
