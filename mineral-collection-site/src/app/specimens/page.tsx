import React, { Suspense } from 'react';

import Paginator from '../_shared/components/filterComponents/paginator/paginator';
import LoadingSpinner from '../_shared/components/loadingSpinner/loadingSpinner';
import SpecimenFilters from './_components/specimenFilters/specimenFilters';
import SpecimenResults from './_components/specimenResults/specimenResults';
import styles from './styles.module.css';

export default async function SpecimensPage({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: number | string | string[] | undefined;
  }>;
}) {
  return (
    <>
      <h1 className={styles.title}>Specimens</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <SpecimenFilters />
        <SpecimenResults searchParams={searchParams} />
        <div className={styles.paginator}>
          <Paginator />
        </div>
      </Suspense>
    </>
  );
}
