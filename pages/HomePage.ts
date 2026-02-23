import { BasePage } from './BasePage';
import { expect } from '@playwright/test';

export class HomePage extends BasePage {
  async open() {
    await this.goto('/');
    await expect(this.page.getByRole('heading', { name: 'Welcome to the-internet' })).toBeVisible();
  }

  async goToFormAuth() {
    await this.clickLinkByText('Form Authentication');
  }

  async goToAddRemoveElements() {
    await this.clickLinkByText('Add/Remove Elements');
  }
}
