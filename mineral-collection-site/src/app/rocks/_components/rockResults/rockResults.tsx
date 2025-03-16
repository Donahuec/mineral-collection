import ResultCard from '@/app/_shared/components/resultGrid/resultCard/resultCard';
import ResultGrid from '@/app/_shared/components/resultGrid/resultGrid';
import { getRocks } from '@/app/_shared/services/rockService';
import { urlFor } from '@/app/_shared/utils/imageService';

export default async function RockResults({
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
  const rocks = await getRocks(params);
  return (
    <ResultGrid>
      {rocks.map((rock) => (
        <ResultCard
          key={rock._id}
          title={rock.name || 'Missing Title'}
          imageUrl={
            urlFor(rock.previewImage, 600, 600)?.url() ||
            'https://placehold.co/300x300/png'
          }
          link={`/rocks/${rock?.slug?.current}`}
        />
      ))}
    </ResultGrid>
  );
}
