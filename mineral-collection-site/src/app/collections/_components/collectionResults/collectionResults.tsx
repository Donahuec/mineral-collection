import ResultCard from '@/app/_shared/components/resultGrid/resultCard/resultCard';
import ResultGrid from '@/app/_shared/components/resultGrid/resultGrid';
import { getCollections } from '@/app/_shared/services/collectionService';
import { urlFor } from '@/app/_shared/utils/imageService';

export default async function CollectionResults({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: number | string | string[] | undefined;
  }>;
}) {
  const params = await searchParams;

  if (params.page) {
    params.page = parseInt(params.page as string);
  }
  if (params.pageSize) {
    params.pageSize = parseInt(params.pageSize as string);
  }
  const collections = await getCollections(params);
  return (
    <ResultGrid>
      {collections.map((collection) => (
        <ResultCard
          key={collection._id}
          title={collection.name || 'Missing Title'}
          imageUrl={
            urlFor(collection.previewImage, 600, 600)?.url() ||
            'https://placehold.co/300x300/png'
          }
          link={`/collections/${collection?.slug?.current}`}
        />
      ))}
    </ResultGrid>
  );
}
