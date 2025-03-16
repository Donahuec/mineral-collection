import { Suspense } from 'react';

import LoadingSpinner from '../_shared/components/loadingSpinner/loadingSpinner';
import Paginator from '../_shared/components/paginator/paginator';
import MineralFilters from './_components/mineralFilters/mineralFilters';
import MineralResults from './_components/mineralResults/mineralResults';
import styles from './styles.module.css';

export default async function MineralsPage({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: number | string | string[] | undefined;
  }>;
}) {
  return (
    <>
      <h1 className={styles.title}>Minerals</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <MineralFilters />
        <MineralResults searchParams={searchParams} />
        <div className={styles.paginator}>
          <Paginator />
        </div>
      </Suspense>
    </>
  );
}
