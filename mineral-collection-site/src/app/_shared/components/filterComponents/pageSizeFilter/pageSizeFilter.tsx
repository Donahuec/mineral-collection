'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react';

import NumberFieldWrapper from '@/app/_shared/components/formComponents/numberFieldWrapper/numberFieldWrapper';
import { DEFAULT_PAGE_SIZE } from '@/app/_shared/constants/constants';
import { updateQueryString } from '@/app/_shared/utils/urlService';

export default function PageSizeFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [pageSize, setPageSize] = React.useState(
    searchParams.get('pageSize')
      ? parseInt(searchParams.get('pageSize') as string)
      : DEFAULT_PAGE_SIZE
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      return updateQueryString(name, value, searchParams);
    },
    [searchParams]
  );

  function updatePageSize(newPageSize: number) {
    setPageSize(newPageSize);
    router.push(
      pathname + '?' + createQueryString('pageSize', newPageSize.toString())
    );
  }

  return (
    <NumberFieldWrapper
      label='Page Size'
      minValue={1}
      step={1}
      value={pageSize}
      onChange={updatePageSize}></NumberFieldWrapper>
  );
}
