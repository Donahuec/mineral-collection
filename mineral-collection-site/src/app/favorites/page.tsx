import React, { Suspense } from 'react';

import GridListPage from '../_shared/components/gridListPage/gridListPage';
import LoadingSpinner from '../_shared/components/loadingSpinner/loadingSpinner';
import SpecimenFilters from '../specimens/_components/specimenFilters/specimenFilters';
import SpecimenResults from '../specimens/_components/specimenResults/specimenResults';

export default async function FavoritesPage({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: number | string | string[] | undefined;
  }>;
}) {
  const params = await searchParams;
  params['favorites'] = 'true';

  return (
    <GridListPage title='Favorite Specimens' searchPlaceholder='Amethyst...'>
      <Suspense fallback={<LoadingSpinner />}>
        <SpecimenFilters />
        <SpecimenResults
          searchParams={new Promise((resolve) => resolve(params))}
        />
      </Suspense>
    </GridListPage>
  );
}
