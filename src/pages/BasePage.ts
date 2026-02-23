import { Page, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path: string = '/') {
    await this.page.goto(path);
  }

  async assertUrlContains(fragment: string) {
    await expect(this.page).toHaveURL(new RegExp(fragment));
  }

  async clickLinkByText(text: string) {
    await this.page.getByRole('link', { name: text }).click();
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `test-results/${name}.png`, fullPage: true });
  }
}
