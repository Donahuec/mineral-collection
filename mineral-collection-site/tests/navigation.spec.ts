import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('./');
});

test('has title', async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Mineral/);
});

test.describe('Home Page Navigation', () => {
  test('Favorite Specimens Link', async ({ page }) => {
    await page
      .getByRole('main')
      .getByRole('link', { name: 'Favorite Specimens' })
      .click();
    await page.waitForURL('**/favorites');
    await expect(
      page.getByRole('heading', { name: 'Favorite Specimens' })
    ).toBeVisible();
  });

  test('Specimens Link', async ({ page }) => {
    await page
      .getByRole('main')
      .getByRole('link', { name: 'Specimens', exact: true })
      .click();
    await page.waitForURL('**/specimens');
    await expect(
      page.getByRole('heading', { name: 'Specimens' })
    ).toBeVisible();
  });

  test('Minerals Link', async ({ page }) => {
    await page
      .getByRole('main')
      .getByRole('link', { name: 'Minerals' })
      .click();
    await page.waitForURL('**/minerals');
    await expect(page.getByRole('heading', { name: 'Minerals' })).toBeVisible();
  });

  test('Rocks Link', async ({ page }) => {
    await page.getByRole('main').getByRole('link', { name: 'Rocks' }).click();
    await page.waitForURL('**/rocks');
    await expect(page.getByRole('heading', { name: 'Rocks' })).toBeVisible();
  });
});

test.describe('Header Navigation', () => {
  test('Favorite Specimens Link', async ({ page }) => {
    await page
      .getByRole('navigation')
      .getByRole('link', { name: 'Favorites' })
      .click();
    await page.waitForURL('**/favorites');
    await expect(
      page.getByRole('heading', { name: 'Favorite Specimens' })
    ).toBeVisible();
  });

  test('Specimens Link', async ({ page }) => {
    await page
      .getByRole('navigation')
      .getByRole('link', { name: 'Specimens', exact: true })
      .click();
    await page.waitForURL('**/specimens');
    await expect(
      page.getByRole('heading', { name: 'Specimens' })
    ).toBeVisible();
  });

  test('Minerals Link', async ({ page }) => {
    await page
      .getByRole('navigation')
      .getByRole('link', { name: 'Minerals' })
      .click();
    await page.waitForURL('**/minerals');
    await expect(page.getByRole('heading', { name: 'Minerals' })).toBeVisible();
  });

  test('Rocks Link', async ({ page }) => {
    await page
      .getByRole('navigation')
      .getByRole('link', { name: 'Rocks' })
      .click();
    await page.waitForURL('**/rocks');
    await expect(page.getByRole('heading', { name: 'Rocks' })).toBeVisible();
  });
});

test('navigate to mineral', async ({ page }) => {
  await page.getByRole('main').getByRole('link', { name: 'Minerals' }).click();
  await page.getByRole('searchbox', { name: 'Search' }).click();
  await page.getByRole('searchbox', { name: 'Search' }).fill('Amethyst');
  await page.getByRole('searchbox', { name: 'Search' }).press('Enter');
  await page.waitForURL('**/minerals?search=Amethyst');
  await page.getByRole('link', { name: 'Amethyst Amethyst' }).click();
  await page.waitForURL('**/minerals/amethyst');
  await expect(
    page.getByRole('heading', { name: 'Amethyst', exact: true })
  ).toBeVisible();
});
