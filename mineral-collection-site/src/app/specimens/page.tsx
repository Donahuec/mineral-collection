import GridListPage from '../_shared/components/gridListPage/gridListPage';
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
      <SpecimenFilters />
      <SpecimenResults searchParams={searchParams} />
    </GridListPage>
  );
}
