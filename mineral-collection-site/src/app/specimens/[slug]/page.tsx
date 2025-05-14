import {
  Brush,
  CircleArrowDown,
  CircleHelp,
  Factory,
  Star,
} from 'lucide-react';
import { defineQuery, PortableText } from 'next-sanity';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import BackLink from '@/app/_shared/components/backLink/backLink';
import ImageGallery from '@/app/_shared/components/imageGallery/imageGallery';
import ImageHeader from '@/app/_shared/components/imageHeader/imageHeader';
import Property from '@/app/_shared/components/propertyList/property/property';
import PropertyList from '@/app/_shared/components/propertyList/propertyList';
import { ResultGridGroup } from '@/app/_shared/components/resultGrid/resultGrid';
import {
  specimenShapes,
  specimenSizes,
} from '@/app/_shared/constants/constants';
import { getBackLink } from '@/app/_shared/services/navigationHelpersService';
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

function getCurrencyString(price: number) {
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
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

  const { referrerPath, referrerTitle } = await getBackLink(
    '/specimens',
    'Specimens',
    specimen.slug!.current!
  );

  return (
    <>
      <BackLink title={referrerTitle} href={referrerPath} />
      <ImageHeader
        title={`${specimen.name} - #${specimen.numericId}`}
        image={specimen.previewImage}
        alt={specimen.name || 'Specimen'}>
        <div className={styles.iconSet}>
          {specimen.favorite && (
            <span className={styles.iconGroup}>
              <Star /> Favorite
            </span>
          )}
          {specimen.manMade && (
            <span className={styles.iconGroup}>
              <Factory /> Man Made
            </span>
          )}
          {specimen.artificiallyModified && (
            <span className={styles.iconGroup}>
              <Brush /> Artificially Modified
            </span>
          )}
          {specimen.hesitantId && (
            <span className={styles.iconGroup}>
              <CircleHelp /> Hesitant Id
            </span>
          )}
          {specimen.lowInterest && (
            <span className={styles.iconGroup}>
              <CircleArrowDown /> Low Interest
            </span>
          )}
        </div>
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
            {specimen.shape && (
              <Property title='Shape'>{specimen.shape}</Property>
            )}
            {specimen.tags && (
              <Property title='Tags'>{specimen.tags.join(', ')}</Property>
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
                ? `${getCurrencyString(specimen.price)} (${specimen.exactPrice ? 'Exact' : 'Estimate'})`
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
      {specimen.minerals && specimen.minerals.length > 0 && (
        <ResultGridGroup
          title='Minerals'
          urlBase='minerals'
          items={specimen.minerals}
        />
      )}
      {specimen.rocks && specimen.rocks.length > 0 && (
        <ResultGridGroup title='Rocks' urlBase='rocks' items={specimen.rocks} />
      )}
      {specimen.images && specimen.images.length > 0 && (
        <div className={styles.imageSection}>
          <h2 className={styles.imageSectionTitle}>Images</h2>
          <ImageGallery images={specimen.images} />
        </div>
      )}
    </>
  );
}
