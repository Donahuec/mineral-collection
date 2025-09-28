import { defineQuery, PortableText } from 'next-sanity';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import BackLink from '@/app/_shared/components/backLink/backLink';
import ImageGallery from '@/app/_shared/components/imageGallery/imageGallery';
import ImageHeader from '@/app/_shared/components/imageHeader/imageHeader';
import Property from '@/app/_shared/components/propertyList/property/property';
import PropertyList from '@/app/_shared/components/propertyList/propertyList';
import { ResultGridGroup } from '@/app/_shared/components/resultGrid/resultGrid';
import { getBackLink } from '@/app/_shared/services/navigationHelpersService';
import { sanityFetch } from '@/sanity/live';
import { COLLECTION_QUERYResult } from '@/sanity/types';

import styles from './styles.module.css';

const COLLECTION_QUERY = defineQuery(`*[
    _type == "collection" &&
    slug.current == $slug
  ][0]{
  ...,
  specimens[]->{ _id, name, slug, previewImage }
}`);

function getCurrencyString(price: number) {
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const result = await sanityFetch({
    query: COLLECTION_QUERY,
    params: await params,
  });

  const collection = result?.data as COLLECTION_QUERYResult;
  if (!collection) {
    notFound();
  }

  const { referrerPath, referrerTitle } = await getBackLink(
    '/collections',
    'Collections',
    collection.slug!.current!
  );

  return (
    <>
      <BackLink title={referrerTitle} href={referrerPath} />
      <ImageHeader
        title={collection.name || ''}
        image={collection.previewImage}
        alt={collection.name || 'collection image'}>
        <PropertyList>
          <Property title='Description'>
            {collection.shortDescription || '---'}
          </Property>
          <Property title='Source'>{collection.source || '---'}</Property>
          {collection.sourceUrl && (
            <Property title='Source URL'>
              <Link href={collection.sourceUrl} target='_blank'>
                {collection.sourceUrl}
              </Link>
            </Property>
          )}
          {collection.aquiredDate && (
            <Property title='Acquired'>
              {new Date(collection.aquiredDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Property>
          )}
          {collection.price !== undefined && (
            <Property title='Price'>
              {`${getCurrencyString(collection.price)}`}
            </Property>
          )}
        </PropertyList>
      </ImageHeader>

      {collection.notes && collection.notes.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Notes</h2>
          <PortableText value={collection.notes} />
        </div>
      )}

      {collection.specimens && collection.specimens.length > 0 && (
        <ResultGridGroup
          title='Specimens'
          items={collection.specimens}
          urlBase='specimens'
        />
      )}

      {collection.images && collection.images.length > 0 && (
        <div className={styles.imageSection}>
          <h2 className={styles.imageSectionTitle}>Images</h2>
          <ImageGallery images={collection.images} />
        </div>
      )}
    </>
  );
}
