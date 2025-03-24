'use client';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react';
import { Button } from 'react-aria-components';

import iconButtonStyles from '@/app/_shared/styles/iconButton.module.css';
import { updateQueryString } from '@/app/_shared/utils/urlService';

import styles from './paginator.module.css';

export default function Paginator() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [page, setPage] = React.useState(
    searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 1
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      return updateQueryString(name, value, searchParams);
    },
    [searchParams]
  );

  function updatePage(forward: boolean) {
    const newPage = forward ? page + 1 : page - 1;
    setPage(newPage);
    router.push(pathname + '?' + createQueryString('page', newPage.toString()));
  }

  return (
    <div className={styles.paginator}>
      <Button
        onPress={() => updatePage(false)}
        isDisabled={page <= 1}
        className={`${styles.paginatorButton} ${iconButtonStyles.iconButton}`}>
        <ArrowLeft className={styles.icon} />
      </Button>
      <span>Page {page}</span>
      <Button
        onPress={() => updatePage(true)}
        className={`${styles.paginatorButton} ${iconButtonStyles.iconButton}`}>
        <ArrowRight size={24} className={styles.icon} />
      </Button>
    </div>
  );
}
