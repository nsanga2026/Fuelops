import { BasePage } from './BasePage';
import { expect } from '@playwright/test';

export class AddRemoveElementsPage extends BasePage {
  async open() {
    await this.goto('/add_remove_elements/');
  }

  async addElements(times: number) {
    for (let i = 0; i < times; i++) {
      await this.page.getByRole('button', { name: 'Add Element' }).click();
    }
  }

  async countDeleteButtons() {
    return await this.page.getByRole('button', { name: 'Delete' }).count();
  }

  async removeOne() {
    const btn = this.page.getByRole('button', { name: 'Delete' }).first();
    if (await btn.isVisible()) {
      await btn.click();
    }
  }

  async assertDeleteButtons(expected: number) {
    await expect(this.page.getByRole('button', { name: 'Delete' })).toHaveCount(expected);
  }
}
