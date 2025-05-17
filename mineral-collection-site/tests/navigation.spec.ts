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
    const mineralTitle = /^Amethyst$/;
    await test.step('Navigate to Minerals Page', async () => {
      await page
        .getByRole('main')
        .getByRole('link', { name: 'Minerals' })
        .click();
    });
    await test.step('Search for Mineral', async () => {
      await page.getByRole('searchbox', { name: 'Search' }).click();
      await page.getByRole('searchbox', { name: 'Search' }).fill('Amethyst');
      await page.waitForURL('**/minerals?search=Amethyst');
    });
    await test.step('Click on Mineral Link', async () => {
      await page.getByRole('link', { name: mineralTitle, exact: true }).click();
    });
    await test.step('Verify Mineral Page', async () => {
      await expect(page.locator('h1', { hasText: mineralTitle })).toBeVisible();
    });
  });

  test('Navigate to Specific Rock', async ({ page }) => {
    const rockTitle = /^Basalt$/;
    await test.step('Navigate to Rocks Page', async () => {
      await page.getByRole('main').getByRole('link', { name: 'Rocks' }).click();
    });
    await test.step('Search for Rock', async () => {
      await page.getByRole('searchbox', { name: 'Search' }).click();
      await page.getByRole('searchbox', { name: 'Search' }).fill('Basalt');
      await page.waitForURL('**/rocks?search=Basalt');
    });
    await test.step('Click on Rock Link', async () => {
      await page.getByRole('link', { name: rockTitle, exact: true }).click();
    });
    await test.step('Verify Rock Page', async () => {
      await expect(page.locator('h1', { hasText: rockTitle })).toBeVisible();
    });
  });

  test('Navigate to Specific Specimen', async ({ page }) => {
    const specimenTitle = /^Baryte - #715$/;
    await test.step('Navigate to Specimens Page', async () => {
      await page
        .getByRole('main')
        .getByRole('link', { name: 'Specimens', exact: true })
        .click();
    });
    await test.step('Search for Specimen', async () => {
      await page.getByRole('searchbox', { name: 'Search' }).click();
      await page.getByRole('searchbox', { name: 'Search' }).fill('715');
      await page.waitForURL('**/specimens?search=715');
    });
    await test.step('Click on Specimen Link', async () => {
      await page.getByRole('link', { name: specimenTitle }).click();
    });
    await test.step('Verify Specimen Page', async () => {
      await expect(
        page.locator('h1', { hasText: specimenTitle })
      ).toBeVisible();
    });
  });
});

test.describe('Navigate Through Chained Pages', () => {
  test('Navigate Between Multiple Pages with BackLink', async ({ page }) => {
    const agateTitle = /^Agate$/;
    const quartzTitle = /^Quartz$/;
    const blueLaceAgateTitle = /^Agate - Blue Lace$/;
    const agateBackLink = /^← Back to Agate$/;
    const quartzBackLink = /^← Back to Quartz$/;
    const blueLaceAgateBackLink = /^← Back to Agate Blue Lace$/;
    await test.step('Navigate to Mineral Page and search for Agate', async () => {
      await page
        .getByRole('main')
        .getByRole('link', { name: 'Minerals' })
        .click();
      await page.getByRole('searchbox', { name: 'Search' }).click();
      await page.getByRole('searchbox', { name: 'Search' }).fill('Agate');
      await page.getByRole('link', { name: agateTitle, exact: true }).click();
    });
    await test.step('Load Agate Page', async () => {
      await expect(page.locator('h1', { hasText: agateTitle })).toBeVisible();
      await expect(
        page.getByRole('link', { name: '← Back to Minerals' })
      ).toBeVisible();
    });
    await test.step('Navigate to Quartz Page', async () => {
      await page.getByRole('link', { name: quartzTitle }).click();
      await expect(page.locator('h1', { hasText: quartzTitle })).toBeVisible();
      await expect(
        page.getByRole('link', { name: agateBackLink })
      ).toBeVisible();
    });
    await test.step('Return to Agate Page', async () => {
      await page.getByRole('link', { name: agateBackLink }).click();
      await expect(page.locator('h1', { hasText: agateTitle })).toBeVisible();
      await expect(
        page.getByRole('link', { name: quartzBackLink })
      ).toBeVisible();
    });
    await test.step('Navigate to Blue Lace Agate Page', async () => {
      await page
        .getByRole('link', { name: blueLaceAgateTitle, exact: true })
        .click();
      await expect(
        page.locator('h1', { hasText: blueLaceAgateTitle })
      ).toBeVisible();
      await expect(
        page.getByRole('link', { name: agateBackLink })
      ).toBeVisible();
    });
    await test.step('Return to Agate Page', async () => {
      await page.getByRole('link', { name: agateBackLink }).click();
      await expect(page.locator('h1', { hasText: agateTitle })).toBeVisible();
      await expect(
        page.getByRole('link', { name: blueLaceAgateBackLink })
      ).toBeVisible();
    });
  });

  test('Backlink Between Mineral and Specimen', async ({ page }) => {
    const specimenHeading = /^Conichalcite - #714$/;
    const specimenBackLink = /^← Back to Conichalcite 714$/;
    const mineralHeading = /^Conichalcite$/;
    const mineralBackLink = /^← Back to Conichalcite$/;

    await test.step('Load Specimens Page and search for specimen', async () => {
      await page.goto('./specimens');
      await page.getByRole('searchbox', { name: 'Search' }).click();
      await page.getByRole('searchbox', { name: 'Search' }).fill('714');
      await page.getByRole('link', { name: specimenHeading }).click();
    });
    await test.step('Load Specimen Page for Conichalcite 714', async () => {
      await expect(
        page.getByRole('link', { name: '← Back to Specimens' })
      ).toBeVisible();
      await expect(
        page.locator('h1', { hasText: specimenHeading })
      ).toBeVisible();
    });
    await test.step('Navigate to Conichalcite Mineral Page', async () => {
      await page
        .locator('dl')
        .filter({ hasText: 'Classifications:' })
        .getByRole('link')
        .click();
      await expect(
        page.getByRole('link', { name: specimenBackLink })
      ).toBeVisible();
      await expect(
        page.locator('h1', { hasText: mineralHeading })
      ).toBeVisible();
    });
    await test.step('Navigate back to Specimen Page for Conichalcite 714 by backlink', async () => {
      await page.getByRole('link', { name: specimenBackLink }).click();
      await expect(
        page.getByRole('link', { name: mineralBackLink, exact: true })
      ).toBeVisible();
      await expect(
        page.locator('h1', { hasText: specimenHeading })
      ).toBeVisible();
    });
    await test.step('Navigate to Conichalcite Mineral Page by backlink', async () => {
      await page.getByRole('link', { name: mineralBackLink }).click();
      await expect(
        page.locator('h1', { hasText: mineralHeading })
      ).toBeVisible();
    });
  });
});
