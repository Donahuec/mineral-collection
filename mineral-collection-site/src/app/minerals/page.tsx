import { Suspense } from 'react';

import GridListPage from '../_shared/components/gridListPage/gridListPage';
import LoadingSpinner from '../_shared/components/loadingSpinner/loadingSpinner';
import MineralFilters from './_components/mineralFilters/mineralFilters';
import MineralResults from './_components/mineralResults/mineralResults';

export default async function MineralsPage({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: number | string | string[] | undefined;
  }>;
}) {
  return (
    <GridListPage title='Minerals' searchPlaceholder='Amethyst...'>
      <Suspense fallback={<LoadingSpinner />}>
        <MineralFilters />
        <MineralResults searchParams={searchParams} />
      </Suspense>
    </GridListPage>
  );
}
