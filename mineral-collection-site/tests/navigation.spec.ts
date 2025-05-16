import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('./');
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
  test('Favorites Link', async ({ page }) => {
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
test.describe('Navigate to Individual Pages', () => {
  test('Navigate to Specific Mineral', async ({ page }) => {
    await page
      .getByRole('main')
      .getByRole('link', { name: 'Minerals' })
      .click();
    await page.getByRole('searchbox', { name: 'Search' }).click();
    await page.getByRole('searchbox', { name: 'Search' }).fill('Amethyst');
    await page.waitForURL('**/minerals?search=Amethyst');
    await page.getByRole('link', { name: 'Amethyst', exact: true }).click();
    await page.waitForURL('**/minerals/amethyst');
    await expect(
      page.getByRole('heading', { name: 'Amethyst', exact: true })
    ).toBeVisible();
  });

  test('Navigate to Specific Rock', async ({ page }) => {
    await page.getByRole('main').getByRole('link', { name: 'Rocks' }).click();
    await page.getByRole('searchbox', { name: 'Search' }).click();
    await page.getByRole('searchbox', { name: 'Search' }).fill('Basalt');
    await page.waitForURL('**/rocks?search=Basalt');
    await page.getByRole('link', { name: 'Basalt' }).click();
    await page.waitForURL('**/rocks/basalt');
  });

  test('Navigate to Specific Specimen', async ({ page }) => {
    await page
      .getByRole('main')
      .getByRole('link', { name: 'Specimens', exact: true })
      .click();
    await page.getByRole('searchbox', { name: 'Search' }).click();
    await page.getByRole('searchbox', { name: 'Search' }).fill('Baryte');
    await page.waitForURL('**/specimens?search=Baryte');
    await page.getByRole('link', { name: 'Baryte - #715' }).click();
    await page.waitForURL('**/specimens/baryte-715');
    await expect(
      page.getByRole('heading', { name: 'Baryte - #715' })
    ).toBeVisible();
  });
});

test.describe('Navigate Through Chained Paged', () => {
  test('Navigate Between Multiple Pages with BackLink', async ({ page }) => {
    await page
      .getByRole('main')
      .getByRole('link', { name: 'Minerals' })
      .click();
    await page.getByRole('searchbox', { name: 'Search' }).click();
    await page.getByRole('searchbox', { name: 'Search' }).fill('Agate');
    await page.waitForURL('**/minerals?search=Agate');
    await page.getByRole('link', { name: 'Agate', exact: true }).click();
    await page.waitForURL('**/minerals/agate');
    await expect(
      page.getByRole('heading', { name: 'Agate', exact: true })
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: '← Back to Minerals' })
    ).toBeVisible();
    await page.getByRole('link', { name: 'Quartz' }).click();
    await page.waitForURL('**/minerals/quartz');
    await expect(
      page.getByRole('heading', { name: 'Quartz', exact: true })
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: '← Back to Agate' })
    ).toBeVisible();
    await page.getByRole('link', { name: '← Back to Agate' }).click();
    await page.waitForURL('**/minerals/agate');
    await expect(
      page.getByRole('heading', { name: 'Agate', exact: true })
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: '← Back to Quartz' })
    ).toBeVisible();
    await page
      .getByRole('link', { name: 'Agate - Blue Lace', exact: true })
      .click();

    await page.waitForURL('**/minerals/agate-blue-lace');
    await expect(
      page.getByRole('heading', { name: 'Agate - Blue Lace' })
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: '← Back to Agate' })
    ).toBeVisible();
    await page.getByRole('link', { name: '← Back to Agate' }).click();
    await page.waitForURL('**/minerals/agate');
    await expect(
      page.getByRole('heading', { name: 'Agate', exact: true })
    ).toBeVisible();
  });
});
