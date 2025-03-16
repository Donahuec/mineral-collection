

import ResultCard from '@/app/_shared/components/resultGrid/resultCard/resultCard';
import ResultGrid from '@/app/_shared/components/resultGrid/resultGrid';
import { getMinerals } from '@/app/_shared/services/mineralService';
import { urlFor } from '@/app/_shared/utils/imageService';

export default async function MineralResults({
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
  const minerals = await getMinerals(params);
  return (
    <ResultGrid>
      {minerals.map((mineral) => (
        <ResultCard
          key={mineral._id}
          title={mineral.name || 'Missing Title'}
          imageUrl={
            urlFor(mineral.previewImage, 600, 600)?.url() ||
            'https://placehold.co/300x300/png'
          }
          link={`/minerals/${mineral?.slug?.current}`}
        />
      ))}
    </ResultGrid>
  );
}
