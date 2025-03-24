'use client';
import { X } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react';
import { Button, Input, SearchField } from 'react-aria-components';

import { updateQueryString } from '@/app/_shared/utils/urlService';

import styles from './searchFilter.module.css';

export default function SearchFilter({
  placeholder = 'Search...',
}: {
  placeholder?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = React.useState(
    searchParams.get('search') ? searchParams.get('search') : ''
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      return updateQueryString(name, value, searchParams);
    },
    [searchParams]
  );

  function updateSearch(newSearch: string) {
    setSearch(newSearch);
    router.push(pathname + '?' + createQueryString('search', newSearch));
  }

  return (
    <SearchField
      className={styles.search}
      value={search as string}
      onChange={updateSearch}
      aria-label='Search'>
      <Input className={styles.input} placeholder={placeholder} />
      <Button className={styles.button}>
        <X size={16} />
      </Button>
    </SearchField>
  );
}
