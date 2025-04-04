import { defineQuery, PortableText } from 'next-sanity';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import BackLink from '@/app/_shared/components/backLink/backLink';
import ImageGallery from '@/app/_shared/components/imageGallery/imageGallery';
import ImageHeader from '@/app/_shared/components/imageHeader/imageHeader';
import Property from '@/app/_shared/components/propertyList/property/property';
import PropertyList from '@/app/_shared/components/propertyList/propertyList';
import {
  specimenShapes,
  specimenSizes,
} from '@/app/_shared/constants/constants';
import { urlFor } from '@/app/_shared/utils/imageService';
import { sanityFetch } from '@/sanity/live';
import { SPECIMEN_QUERYResult } from '@/sanity/types';

import styles from './styles.module.css';

const SPECIMEN_QUERY = defineQuery(`*[
    _type == "specimen" &&
    slug.current == $slug
  ][0]{
  ...,
  minerals[]->{name, _id, slug, previewImage},
  rocks[]->{name, _id, slug, previewImage}
}`);

function sizeDisplayValue(size: string | undefined) {
  if (!size) return '---';
  const sizeDisplayValue = specimenSizes.find((s) => s.value === size);
  return sizeDisplayValue ? sizeDisplayValue.title : size;
}

function shapeDisplayValue(shape: string | undefined) {
  if (!shape) return '---';
  const shapeDisplayValue = specimenShapes.find((s) => s.value === shape);
  return shapeDisplayValue ? shapeDisplayValue.title : shape;
}

export default async function SpecimenPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const result = await sanityFetch({
    query: SPECIMEN_QUERY,
    params: await params,
  });
  const specimen = result?.data as SPECIMEN_QUERYResult;
  if (!specimen) {
    notFound();
  }
  const imageUrl = specimen.previewImage
    ? urlFor(specimen.previewImage)?.url()
    : undefined;

  return (
    <>
      <BackLink title='Back to Specimens' href='/specimens' />
      <ImageHeader
        title={`${specimen.name} - #${specimen.numericId}`}
        imageUrl={imageUrl}
        alt={specimen.name || 'Specimen'}>
        <PropertyList>
          <Property title='Classifications'>
            <ul className={styles.minerals}>
              {specimen.minerals &&
                specimen.minerals?.map((mineral) => (
                  <li key={mineral._id}>
                    <Link
                      key={mineral.slug?.current}
                      href={`/minerals/${mineral.slug?.current}`}>
                      {mineral.name}
                    </Link>
                  </li>
                ))}
              {specimen.rocks &&
                specimen.rocks?.map((rock) => (
                  <li key={rock._id}>
                    <Link
                      key={rock.slug?.current}
                      href={`/rocks/${rock.slug?.current}`}>
                      {rock.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </Property>
          {specimen.origin && (
            <Property title='Origin'>{specimen.origin || '---'}</Property>
          )}
          {specimen.shortDescription && (
            <Property title='Description'>
              {specimen.shortDescription || '---'}
            </Property>
          )}
          {specimen.sizeCategory && (
            <Property title='Size Category'>
              {sizeDisplayValue(specimen.sizeCategory) || '---'}
            </Property>
          )}
          {specimen.sizeDescription && specimen.sizeDescription.length > 0 ? (
            <Property title='Size'>
              {specimen.sizeDescription.map((size) => `${size}cm`).join(' x ')}
            </Property>
          ) : (
            specimen.size && (
              <Property title='Size'>
                {specimen.size ? `${specimen.size}cm` : '---'}
              </Property>
            )
          )}
          {specimen.weight && (
            <Property title='Weight'>{`${specimen.weight} grams`}</Property>
          )}
          {specimen.shapeCategory ? (
            <Property title='Shape'>
              {specimen.shapeCategory
                .map((shape) => shapeDisplayValue(shape))
                .join(', ')}
            </Property>
          ) : (
            <Property title='Shape'>{specimen.shape || '---'}</Property>
          )}
          {specimen.hesitantId && (
            <Property title='Hesitant Id'>
              {specimen.hesitantId?.toString()}
            </Property>
          )}
          {specimen.artificiallyModified && (
            <Property title='Artificially Modified'>
              {specimen.artificiallyModified?.toString()}
            </Property>
          )}
          {specimen.manMade && (
            <Property title='Man Made'>{specimen.manMade?.toString()}</Property>
          )}

          {specimen.favorite && (
            <Property title='Favorite'>
              {specimen.favorite?.toString()}
            </Property>
          )}
        </PropertyList>
      </ImageHeader>

      {specimen.description && specimen.description.length > 0 && (
        <div className={styles.notes}>
          <h2 className={styles.sectionTitle}>Description</h2>
          <div>
            <PortableText value={specimen.description} />
          </div>
        </div>
      )}
      <div className={styles.additionalProperties}>
        <div className={styles.metadataSection}>
          <h2 className={styles.sectionTitle}>Details</h2>
          <PropertyList spacing={0.5}>
            <Property title='Shape'>{specimen.shape || '---'}</Property>
            {specimen.colors && (
              <Property title='Colors'>{specimen.colors.join(', ')}</Property>
            )}
            {specimen.tags && (
              <Property title='Tags'>{specimen.tags.join(', ')}</Property>
            )}
            {specimen.lowInterest && (
              <Property title='Low Interest'>
                {specimen.lowInterest?.toString() || '---'}
              </Property>
            )}
            <Property title='Created At'>
              {new Date(specimen._createdAt).toLocaleTimeString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              }) || '---'}
            </Property>
            <Property title='Updated At'>
              {new Date(specimen._updatedAt).toLocaleTimeString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              }) || '---'}
            </Property>
          </PropertyList>
        </div>
        <div className={styles.metadataSection}>
          <h2 className={styles.sectionTitle}>Acquisition</h2>
          <PropertyList spacing={0.5}>
            <Property title='Price'>
              {specimen.price !== undefined
                ? `$${specimen.price} (${specimen.exactPrice ? 'Exact' : 'Estimate'})`
                : 'Unknown'}
            </Property>
            {specimen.purchaseDate && (
              <Property title='Purchase Date'>
                {new Date(specimen.purchaseDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Property>
            )}
            {specimen.purchaseSource && (
              <Property title='Purchase Source'>
                {specimen.purchaseSource}
              </Property>
            )}
            {specimen.purchaseListing && (
              <Property title='Purchase Listing'>
                <Link href={specimen.purchaseListing}>
                  {specimen.purchaseListing}
                </Link>
              </Property>
            )}
          </PropertyList>
        </div>
      </div>
      {specimen.provenance && specimen.provenance.length > 0 && (
        <div className={styles.notes}>
          <h2 className={styles.sectionTitle}>Provenance</h2>
          <div>
            <PortableText value={specimen.provenance} />
          </div>
        </div>
      )}

      {specimen.notes && specimen.notes.length > 0 && (
        <div className={styles.notes}>
          <h2 className={styles.sectionTitle}>Notes</h2>
          <div>
            <PortableText value={specimen.notes} />
          </div>
        </div>
      )}
      {specimen.images && specimen.images.length > 0 && (
        <ImageGallery images={specimen.images} />
      )}
    </>
  );
}
