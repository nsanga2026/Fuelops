import { Page, expect } from '@playwright/test';

export class GooglePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('https://www.google.com/ncr');
  }

  async acceptConsent() {
    try {
      const selectors = [
        'button:has-text("I agree")',
        'button:has-text("Accept all")',
        '[aria-label="Accept all"]',
        '#L2AGLb',
      ];
      for (const sel of selectors) {
        const el = this.page.locator(sel).first();
        if (await el.isVisible({ timeout: 1000 }).catch(() => false)) {
          await el.click({ timeout: 2000 });
          return;
        }
      }
      const frame = this.page.frameLocator('iframe[name="callout"], iframe[aria-label="Consent"], iframe[src*="consent"]');
      for (const sel of selectors) {
        const el = frame.locator(sel).first();
        if (await el.isVisible({ timeout: 1000 }).catch(() => false)) {
          await el.click({ timeout: 2000 });
          return;
        }
      }
    } catch {
      // ignore if no consent shown
    }
  }

  async search(query: string) {
    const input = this.page.locator('textarea[name="q"], input[name="q"]').first();
    await input.waitFor({ state: 'visible', timeout: 10000 });
    await input.fill(query);
    await input.press('Enter');
  }

  async isCaptcha(): Promise<boolean> {
    if (this.page.url().includes('/sorry/')) return true;
    const robot = this.page.getByText("I'm not a robot");
    return robot.isVisible({ timeout: 1500 }).catch(() => false);
  }

  async expectResultsVisible() {
    await expect(this.page).toHaveURL(/\/search/);
    const resultHeading = this.page.locator('main h3, #search h3, article h3').first();
    await expect(resultHeading).toBeVisible({ timeout: 15000 });
  }
}
