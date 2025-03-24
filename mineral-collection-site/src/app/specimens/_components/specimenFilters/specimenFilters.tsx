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
import { updateQueryString } from '@/app/_shared/utils/urlService';

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

  return (
    <FilterSidebar>
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
        <PageSizeFilter />
      </FilterGroup>
      <FilterFooter>
        <FilterGroup>
          <Paginator />
        </FilterGroup>
      </FilterFooter>
    </FilterSidebar>
  );
}
