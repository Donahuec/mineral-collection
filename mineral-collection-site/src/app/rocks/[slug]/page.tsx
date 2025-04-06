import { defineQuery } from 'next-sanity';
import { notFound } from 'next/navigation';

import BackLink from '@/app/_shared/components/backLink/backLink';
import ImageHeader from '@/app/_shared/components/imageHeader/imageHeader';
import ResultCard from '@/app/_shared/components/resultGrid/resultCard/resultCard';
import ResultGrid from '@/app/_shared/components/resultGrid/resultGrid';
import { urlFor } from '@/app/_shared/utils/imageService';
import { sanityFetch } from '@/sanity/live';
import { ROCK_QUERYResult } from '@/sanity/types';

const ROCK_QUERY = defineQuery(`*[
    _type == "rock" &&
    slug.current == $slug
  ][0]{
  ...,
  'specimens': *[_type == "specimen" && references(^._id)]{
    _id,
    name,
    slug,
    previewImage
}
}`);

export default async function RockPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const result = await sanityFetch({
    query: ROCK_QUERY,
    params: await params,
  });

  const rock = result?.data as ROCK_QUERYResult;
  if (!rock) {
    notFound();
  }

  return (
    <>
      <BackLink title='Back to Rocks' href='/rocks' />
      <ImageHeader
        title={rock.name || ''}
        image={rock.previewImage}
        alt={rock.name || 'Rock'}></ImageHeader>

      <ResultGrid>
        {rock.specimens?.map((specimen) => (
          <ResultCard
            key={specimen._id}
            title={specimen.name || 'Missing Title'}
            imageUrl={
              urlFor(specimen.previewImage, 600, 600)?.url() ||
              'https://placehold.co/300x300/png'
            }
            link={`/specimens/${specimen?.slug?.current}`}
          />
        ))}
      </ResultGrid>
    </>
  );
}
