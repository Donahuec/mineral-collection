import { PropsWithChildren, Suspense } from 'react';

import Paginator from '@/app/_shared/components/filterComponents/paginator/paginator';
import SearchFilter from '@/app/_shared/components/filterComponents/searchFilter/searchFilter';
import LoadingSpinner from '@/app/_shared/components/loadingSpinner/loadingSpinner';

import styles from './gridListPage.module.css';

interface GridListPageProps {
  title: string;
  searchPlaceholder?: string;
}

export default function GridListPage({
  title,
  searchPlaceholder,
  children,
}: PropsWithChildren<GridListPageProps>) {
  return (
    <>
      <h1 className={styles.title}>{title}</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <div className={styles.searchWrapper}>
          <SearchFilter placeholder={searchPlaceholder} />
        </div>
        {children}
        <div className={styles.paginator}>
          <Paginator />
        </div>
      </Suspense>
    </>
  );
}
