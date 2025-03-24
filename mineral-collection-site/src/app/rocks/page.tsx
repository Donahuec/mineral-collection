import { Suspense } from 'react';

import GridListPage from '../_shared/components/gridListPage/gridListPage';
import LoadingSpinner from '../_shared/components/loadingSpinner/loadingSpinner';
import RockFilters from './_components/rockFilters/rockFilters';
import RockResults from './_components/rockResults/rockResults';

export default async function RocksPage({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: number | string | string[] | undefined;
  }>;
}) {
  return (
    <GridListPage title='Rocks' searchPlaceholder='Basalt...'>
      <Suspense fallback={<LoadingSpinner />}>
        <RockFilters />
        <RockResults searchParams={searchParams} />
      </Suspense>
    </GridListPage>
  );
}
