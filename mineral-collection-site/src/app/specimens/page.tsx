import { Suspense } from 'react';
import styles from './styles.module.css';
import LoadingSpinner from '../_shared/components/loadingSpinner/loadingSpinner';
import SpecimenResults from './_components/specimenResults/specimenResults';
import SpecimenFilters from './_components/specimenFilters/specimenFilters';
import React from 'react';
import Paginator from '../_shared/components/paginator/paginator';

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
      <SpecimenFilters />
      <Suspense fallback={<LoadingSpinner />}>
        <SpecimenResults searchParams={searchParams} />
      </Suspense>
      <div className={styles.paginator}>
        <Paginator />
      </div>
    </>
  );
}
