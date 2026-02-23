import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { FormAuthPage } from '../pages/FormAuthPage';
import { AddRemoveElementsPage } from '../pages/AddRemoveElementsPage';
import { GooglePage } from '../pages/GooglePage';

type Fixtures = {
  homePage: HomePage;
  formAuthPage: FormAuthPage;
  addRemovePage: AddRemoveElementsPage;
  googlePage: GooglePage;
};

export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  formAuthPage: async ({ page }, use) => {
    await use(new FormAuthPage(page));
  },
  addRemovePage: async ({ page }, use) => {
    await use(new AddRemoveElementsPage(page));
  },
  googlePage: async ({ page }, use) => {
    await use(new GooglePage(page));
  },
});

export { expect } from '@playwright/test';
