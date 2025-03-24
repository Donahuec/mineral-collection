'use client';
import { Minus, Plus } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react';
import { Button, Group, Input, Label, NumberField } from 'react-aria-components';

import FilterSidebar, {
  FilterDivider, FilterFooter, FilterGroup
} from '@/app/_shared/components/filterSidebar/filterSidebar';
import Paginator from '@/app/_shared/components/paginator/paginator';
import RadioGroupWrapper, {
  RadioWrapper
} from '@/app/_shared/components/radioGroupWrapper/radioGroupWrapper';
import { DEFAULT_PAGE_SIZE } from '@/app/_shared/constants/constants';
import iconButtonStyles from '@/app/_shared/styles/iconButton.module.css';
import { updateQueryString } from '@/app/_shared/utils/urlService';

import styles from './specimenFilters.module.css';

export default function SpecimenFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams.toString());
  const [sortBy, setSortBy] = React.useState<string>(
    params.get('sortBy') || 'numericId'
  );
  const [sortOrder, setSortOrder] = React.useState(
    params.get('sortOrder') || 'asc'
  );
  const [pageSize, setPageSize] = React.useState(
    params.get('pageSize')
      ? parseInt(params.get('pageSize') as string)
      : DEFAULT_PAGE_SIZE
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      return updateQueryString(name, value, searchParams);
    },
    [searchParams]
  );

  function updateSortBy(newSortBy: string) {
    setSortBy(newSortBy);
    router.push(pathname + '?' + createQueryString('sortBy', newSortBy));
  }

  function updateSortOrder(newSortOrder: string) {
    setSortOrder(newSortOrder);
    router.push(pathname + '?' + createQueryString('sortOrder', newSortOrder));
  }

  function updatePageSize(newPageSize: number) {
    setPageSize(newPageSize);
    router.push(
      pathname + '?' + createQueryString('pageSize', newPageSize.toString())
    );
  }

  return (
    <FilterSidebar>
      <div className={styles.filters}>
        <FilterGroup>
          <RadioGroupWrapper
            name='sortBy'
            value={sortBy}
            label='Sort By'
            onChange={updateSortBy}>
            <RadioWrapper value='name'>Name</RadioWrapper>
            <RadioWrapper value='numericId'>NumericId</RadioWrapper>
          </RadioGroupWrapper>
          <RadioGroupWrapper
            name='sortOrder'
            value={sortOrder}
            label='Sort Order'
            onChange={updateSortOrder}>
            <RadioWrapper value='asc'>Asc</RadioWrapper>
            <RadioWrapper value='desc'>Desc</RadioWrapper>
          </RadioGroupWrapper>
        </FilterGroup>
        <FilterDivider />
        <FilterGroup>
          <NumberField
            minValue={1}
            step={1}
            value={pageSize}
            onChange={updatePageSize}
            className={styles.pageSize}>
            <Label className={styles.pageSizeLabel}>Page Size</Label>
            <Group className={styles.pageSizeGroup}>
              <Button
                slot='decrement'
                className={`${iconButtonStyles.iconButton} ${styles.pageSizeButton}`}>
                <Minus />
              </Button>
              <Input className={styles.pageSizeInput} />
              <Button
                slot='increment'
                className={`${iconButtonStyles.iconButton} ${styles.pageSizeButton}`}>
                <Plus />
              </Button>
            </Group>
          </NumberField>
        </FilterGroup>
        <FilterFooter>
          <Paginator />
        </FilterFooter>
      </div>
    </FilterSidebar>
  );
}
