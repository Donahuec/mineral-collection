import React from 'react';

import GridListPage from '../_shared/components/gridListPage/gridListPage';
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
      <SpecimenFilters />
      <SpecimenResults
        searchParams={new Promise((resolve) => resolve(params))}
      />
    </GridListPage>
  );
}
