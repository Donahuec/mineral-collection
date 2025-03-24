import GridListPage from '@/app/_shared/components/gridListPage/gridListPage';

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
      <MineralFilters />
      <MineralResults searchParams={searchParams} />
    </GridListPage>
  );
}
