'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react';

import FilterSidebar, {
  FilterDivider, FilterFooter, FilterGroup
} from '@/app/_shared/components/filterComponents/filterSidebar/filterSidebar';
import PageSizeFilter from '@/app/_shared/components/filterComponents/pageSizeFilter/pageSizeFilter';
import Paginator from '@/app/_shared/components/filterComponents/paginator/paginator';
import RadioGroupWrapper, {
  RadioWrapper
} from '@/app/_shared/components/formComponents/radioGroupWrapper/radioGroupWrapper';
import { ASCENDING, DEFAULT_SORT_ORDER, DESCENDING } from '@/app/_shared/constants/constants';
import { updateQueryString } from '@/app/_shared/utils/urlService';

export default function RockFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams.toString());
  const [sortOrder, setSortOrder] = React.useState(
    params.get('sortOrder') || DEFAULT_SORT_ORDER
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      return updateQueryString(name, value, searchParams);
    },
    [searchParams]
  );

  function updateSortOrder(newSortOrder: string) {
    setSortOrder(newSortOrder);
    router.push(pathname + '?' + createQueryString('sortOrder', newSortOrder));
  }

  return (
    <FilterSidebar>
      <FilterGroup>
        <RadioGroupWrapper
          name='sortOrder'
          value={sortOrder}
          label='Sort Order'
          onChange={updateSortOrder}>
          <RadioWrapper value={ASCENDING}>Asc</RadioWrapper>
          <RadioWrapper value={DESCENDING}>Desc</RadioWrapper>
        </RadioGroupWrapper>
      </FilterGroup>
      <FilterDivider />
      <FilterGroup>
        <PageSizeFilter />
      </FilterGroup>
      <FilterFooter>
        <Paginator />
      </FilterFooter>
    </FilterSidebar>
  );
}
