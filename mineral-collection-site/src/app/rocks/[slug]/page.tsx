import { defineQuery, PortableText } from 'next-sanity';
import { notFound } from 'next/navigation';

import BackLink from '@/app/_shared/components/backLink/backLink';
import ImageHeader from '@/app/_shared/components/imageHeader/imageHeader';
import { ResultGridGroup } from '@/app/_shared/components/resultGrid/resultGrid';
import { getRockDescendents } from '@/app/_shared/services/rockService';
import { sanityFetch } from '@/sanity/live';
import { ROCK_QUERYResult } from '@/sanity/types';

import styles from './styles.module.css';

const ROCK_QUERY = defineQuery(`*[
    _type == "rock" &&
    slug.current == $slug
  ][0]{
  ...,
  componentMinerals[]->{
    _id,
    name,
    slug,
    previewImage
  },
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

  const descendents = await getRockDescendents(rock._id, 1);

  return (
    <>
      <BackLink
        title='Rocks'
        href='/rocks'
        useDynamic
        currentSlug={rock.slug?.current}
      />
      <ImageHeader
        title={rock.name || ''}
        image={rock.previewImage}
        alt={rock.name || 'Rock'}>
        {rock.notes && rock.notes.length > 0 && (
          <div className={styles.notes}>
            <PortableText value={rock.notes} />
          </div>
        )}
      </ImageHeader>

      {rock.parent && (
        <ResultGridGroup title='Parents' items={rock.parents} urlBase='rocks' />
      )}

      {descendents.length > 0 && (
        <ResultGridGroup
          title='Descendents'
          items={descendents}
          urlBase='rocks'
        />
      )}

      {rock.componentMinerals && rock.componentMinerals.length > 0 && (
        <ResultGridGroup
          title='Components'
          items={rock.componentMinerals}
          urlBase='minerals'
        />
      )}

      {rock.specimens?.length > 0 && (
        <ResultGridGroup
          title='Specimens'
          items={rock.specimens}
          urlBase='specimens'
        />
      )}
    </>
  );
}
