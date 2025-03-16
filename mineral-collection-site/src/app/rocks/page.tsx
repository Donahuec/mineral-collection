import { Suspense } from 'react';

import LoadingSpinner from '../_shared/components/loadingSpinner/loadingSpinner';
import Paginator from '../_shared/components/paginator/paginator';
import RockFilters from './_components/rockFilters/rockFilters';
import RockResults from './_components/rockResults/rockResults';
import styles from './styles.module.css';

export default async function RocksPage({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: number | string | string[] | undefined;
  }>;
}) {
  return (
    <>
      <h1 className={styles.title}>Rocks</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <RockFilters />
        <RockResults searchParams={searchParams} />
        <div className={styles.paginator}>
          <Paginator />
        </div>
      </Suspense>
    </>
  );
}
