import { defineQuery, PortableText } from 'next-sanity';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import BackLink from '@/app/_shared/components/backLink/backLink';
import ImageHeader from '@/app/_shared/components/imageHeader/imageHeader';
import Property from '@/app/_shared/components/propertyList/property/property';
import PropertyList from '@/app/_shared/components/propertyList/propertyList';
import ResultCard from '@/app/_shared/components/resultGrid/resultCard/resultCard';
import ResultGrid from '@/app/_shared/components/resultGrid/resultGrid';
import { getMineralDescendents } from '@/app/_shared/services/mineralService';
import { urlFor } from '@/app/_shared/utils/imageService';
import { sanityFetch } from '@/sanity/live';
import { MINERAL_QUERYResult } from '@/sanity/types';

import styles from './styles.module.css';

const MINERAL_QUERY = defineQuery(`*[
    _type == "mineral" &&
    slug.current == $slug
  ][0]{
  ...,
  'specimens': *[_type == "specimen" && references(^._id)]{
    _id,
    name,
    slug,
    previewImage
},
'parents': [
parent->{_id,
    name,
    slug,
    previewImage},
parent->parent->{_id,
    name,
    slug,
    previewImage},
parent->parent->parent->{_id,
    name,
    slug,
    previewImage}
]
}`);

export default async function MineralPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const result = await sanityFetch({
    query: MINERAL_QUERY,
    params: await params,
  });
  const mineral = result?.data as MINERAL_QUERYResult;
  if (!mineral) {
    notFound();
  }

  const descendents = await getMineralDescendents(mineral._id, 1);

  return (
    <>
      <BackLink
        title='Minerals'
        href='/minerals'
        useDynamic
        currentSlug={mineral.slug?.current}
      />
      <ImageHeader
        title={mineral.name || ''}
        image={mineral.previewImage}
        alt={mineral.name || 'Mineral'}>
        <PropertyList>
          <Property title='Scientific Name'>
            {mineral.scientificName || '---'}
          </Property>
          <Property title='Alt Names'>
            {mineral.altNames?.join(', ') || '---'}
          </Property>
          {mineral.mindatUrl && (
            <Property title='Mindat'>
              <Link href={mineral.mindatUrl} target='blank'>
                {mineral.mindatUrl}
              </Link>
            </Property>
          )}
          <Property title='Colors'>{mineral.color?.colorDescription}</Property>
        </PropertyList>
      </ImageHeader>
      {mineral.notes && mineral.notes.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Notes</h2>
          <PortableText value={mineral.notes} />
        </div>
      )}
      {mineral.parent && (
        <div className={styles.gridSection}>
          <h2 className={styles.gridTitle}>Parents</h2>
          <ResultGrid>
            {mineral.parents.map(
              (parent) =>
                parent && (
                  <ResultCard
                    key={parent._id}
                    title={parent.name || 'Missing Title'}
                    imageUrl={
                      urlFor(parent.previewImage, 600, 600)?.url() ||
                      'https://placehold.co/300x300/png'
                    }
                    link={`/minerals/${parent?.slug?.current}`}
                  />
                )
            )}
          </ResultGrid>
        </div>
      )}

      {descendents.length > 0 && (
        <div className={styles.gridSection}>
          <h2 className={styles.gridTitle}>Descendents</h2>
          <ResultGrid>
            {descendents.map((descendent) => (
              <ResultCard
                key={descendent._id}
                title={descendent.name || 'Missing Title'}
                imageUrl={
                  urlFor(descendent.previewImage, 600, 600)?.url() ||
                  'https://placehold.co/300x300/png'
                }
                link={`/minerals/${descendent?.slug?.current}`}
              />
            ))}
          </ResultGrid>
        </div>
      )}

      {mineral.specimens?.length > 0 && (
        <div className={styles.gridSection}>
          <h2 className={styles.gridTitle}>Specimens</h2>
          <ResultGrid>
            {mineral.specimens?.map((specimen) => (
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
        </div>
      )}
    </>
  );
}
