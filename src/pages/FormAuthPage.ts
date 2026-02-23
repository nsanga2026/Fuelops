import { BasePage } from './BasePage';
import { expect } from '@playwright/test';

export class FormAuthPage extends BasePage {
  async login(username: string, password: string) {
    await this.goto('/login');
    await this.page.getByLabel('Username').fill(username);
    await this.page.getByLabel('Password').fill(password);
    await this.page.getByRole('button', { name: ' Login' }).click();
  }

  async assertSuccess() {
    await this.assertUrlContains('/secure');
    await expect(this.page.getByText('You logged into a secure area!')).toBeVisible();
  }

  async assertFailure() {
    await expect(this.page.getByText('Your username is invalid!').or(this.page.getByText('Your password is invalid!'))).toBeVisible();
  }

  async logout() {
    await this.page.getByRole('link', { name: 'Logout' }).click();
    await this.assertUrlContains('/login');
  }
}
