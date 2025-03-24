import { PropsWithChildren, Suspense } from 'react';

import Paginator from '../filterComponents/paginator/paginator';
import SearchFilter from '../filterComponents/searchFilter/searchFilter';
import LoadingSpinner from '../loadingSpinner/loadingSpinner';
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
      <div className={styles.searchWrapper}>
        <SearchFilter placeholder={searchPlaceholder} />
      </div>
      <Suspense fallback={<LoadingSpinner />}>
        {children}
        <div className={styles.paginator}>
          <Paginator />
        </div>
      </Suspense>
    </>
  );
}
