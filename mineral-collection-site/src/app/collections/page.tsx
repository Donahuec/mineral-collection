import GridListPage from '@/app/_shared/components/gridListPage/gridListPage';

import CollectionFilters from './_components/collectionFilters/collectionFilters';
import CollectionResults from './_components/collectionResults/collectionResults';

export default async function CollectionsPage({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: number | string | string[] | undefined;
  }>;
}) {
  return (
    <GridListPage
      title='Collections'
      searchPlaceholder='Classroom Mineral Kit...'>
      <CollectionFilters />
      <CollectionResults searchParams={searchParams} />
    </GridListPage>
  );
}
