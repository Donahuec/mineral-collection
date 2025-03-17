import React, { Suspense } from 'react';

import LoadingSpinner from '../_shared/components/loadingSpinner/loadingSpinner';
import Paginator from '../_shared/components/paginator/paginator';
import SpecimenFilters from '../specimens/_components/specimenFilters/specimenFilters';
import SpecimenResults from '../specimens/_components/specimenResults/specimenResults';
import styles from './styles.module.css';

export default async function FavoritesPage({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: number | string | string[] | undefined;
  }>;
}) {
  const params = await searchParams;
  params['favorites'] = 'true';

  return (
    <>
      <h1 className={styles.title}>Favorite Specimens</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <SpecimenFilters />
        <SpecimenResults
          searchParams={new Promise((resolve) => resolve(params))}
        />
        <div className={styles.paginator}>
          <Paginator />
        </div>
      </Suspense>
    </>
  );
}
