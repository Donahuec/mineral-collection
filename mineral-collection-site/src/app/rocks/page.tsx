import GridListPage from '@/app/_shared/components/gridListPage/gridListPage';

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
      <RockFilters />
      <RockResults searchParams={searchParams} />
    </GridListPage>
  );
}
