import { PropsWithChildren } from 'react';

import { urlFor } from '@/app/_shared/utils/imageService';

import ResultCard from './resultCard/resultCard';
import styles from './styles.module.css';

interface ResultGridProps {
  size?: number;
}

interface ResultGridGroupProps {
  title: string;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  items: any[];
  urlBase: string;
}

export default function ResultGrid(props: PropsWithChildren<ResultGridProps>) {
  return (
    <div className={styles.container}>
      <ul className={styles.grid}>{props.children}</ul>
    </div>
  );
}

export function ResultGridGroup(
  props: PropsWithChildren<ResultGridGroupProps>
) {
  return (
    <div className={styles.gridSection}>
      <h2 className={styles.gridTitle}>{props.title}</h2>
      <ResultGrid>
        {props.items.map(
          (item) =>
            item && (
              <ResultCard
                key={item._id}
                title={item.name || 'Missing Title'}
                imageUrl={
                  urlFor(item.previewImage, 600, 600)?.url() ||
                  'https://placehold.co/300x300/png'
                }
                link={`/${props.urlBase}/${item?.slug?.current}`}
              />
            )
        )}
      </ResultGrid>
    </div>
  );
}
