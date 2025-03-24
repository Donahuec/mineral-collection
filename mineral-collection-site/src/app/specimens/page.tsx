import { Suspense } from 'react';

import GridListPage from '../_shared/components/gridListPage/gridListPage';
import LoadingSpinner from '../_shared/components/loadingSpinner/loadingSpinner';
import SpecimenFilters from './_components/specimenFilters/specimenFilters';
import SpecimenResults from './_components/specimenResults/specimenResults';

export default async function SpecimensPage({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: number | string | string[] | undefined;
  }>;
}) {
  return (
    <GridListPage title='Specimens' searchPlaceholder='Amethyst...'>
      <Suspense fallback={<LoadingSpinner />}>
        <SpecimenFilters />
        <SpecimenResults searchParams={searchParams} />
      </Suspense>
    </GridListPage>
  );
}
