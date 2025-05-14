import { defineQuery, PortableText } from 'next-sanity';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import BackLink from '@/app/_shared/components/backLink/backLink';
import ImageHeader from '@/app/_shared/components/imageHeader/imageHeader';
import Property from '@/app/_shared/components/propertyList/property/property';
import PropertyList from '@/app/_shared/components/propertyList/propertyList';
import { ResultGridGroup } from '@/app/_shared/components/resultGrid/resultGrid';
import { getMineralDescendants } from '@/app/_shared/services/mineralService';
import { getBackLink } from '@/app/_shared/services/navigationHelpersService';
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

  const descendents = await getMineralDescendants(mineral._id, 1);

  const { referrerPath, referrerTitle } = await getBackLink(
    '/minerals',
    'Minerals',
    mineral.slug!.current!
  );

  return (
    <>
      <BackLink title={referrerTitle} href={referrerPath} />
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
        <ResultGridGroup
          title='Parents'
          items={mineral.parents}
          urlBase='minerals'
        />
      )}

      {descendents.length > 0 && (
        <ResultGridGroup
          title='Descendents'
          items={descendents}
          urlBase='minerals'
        />
      )}

      {mineral.specimens?.length > 0 && (
        <ResultGridGroup
          title='Specimens'
          items={mineral.specimens}
          urlBase='specimens'
        />
      )}
    </>
  );
}
