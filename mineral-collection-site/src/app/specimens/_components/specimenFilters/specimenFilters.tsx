'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react';

import FilterSidebar, {
  FilterDivider,
  FilterFooter,
  FilterGroup,
} from '@/app/_shared/components/filterComponents/filterSidebar/filterSidebar';
import PageSizeFilter from '@/app/_shared/components/filterComponents/pageSizeFilter/pageSizeFilter';
import Paginator from '@/app/_shared/components/filterComponents/paginator/paginator';
import CheckboxWrapper, {
  CheckboxGroupWrapper,
} from '@/app/_shared/components/formComponents/checkboxWrapper/checkboxWrapper';
import RadioGroupWrapper, {
  RadioWrapper,
} from '@/app/_shared/components/formComponents/radioGroupWrapper/radioGroupWrapper';
import {
  updateQueryString,
  updateQueryStrings,
} from '@/app/_shared/utils/urlService';

const INTEREST_VALUES = [
  { name: 'hideLowInterest', value: 'false' },
  { name: 'hideManMade', value: 'false' },
  { name: 'hideArtificiallyModified', value: 'false' },
];

export default function SpecimenFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams.toString());
  const [sortBy, setSortBy] = React.useState<string>(
    params.get('sortBy') || 'numericId'
  );
  const [sortOrder, setSortOrder] = React.useState(
    params.get('sortOrder') || 'desc'
  );
  const [hideLowInterest, setHideLowInterest] = React.useState(
    params.get('hideLowInterest') === 'false' ? false : true
  );
  const [hideArtificial, setHideArtificial] = React.useState(
    params.get('hideArtificial') === 'false' ? false : true
  );
  const [hideManMade, setHideManMade] = React.useState(
    params.get('hideManMade') === 'false' ? false : true
  );
  const [manMade, setManMade] = React.useState(
    params.get('manMade') === 'true' ? true : false
  );
  const [artificiallyModified, setArtificiallyModified] = React.useState(
    params.get('artificiallyModified') === 'true' ? true : false
  );
  const [lowInterest, setLowInterest] = React.useState(
    params.get('lowInterest') === 'true' ? true : false
  );

  const createQueryString = useCallback(
    (params: { name: string; value: string }[]) => {
      return updateQueryStrings(params, searchParams);
    },
    [searchParams]
  );

  const createQueryStringSingle = useCallback(
    (name: string, value: string) => {
      return updateQueryString(name, value, searchParams);
    },
    [searchParams]
  );

  function updateSortBy(newSortBy: string) {
    setSortBy(newSortBy);
    router.push(pathname + '?' + createQueryStringSingle('sortBy', newSortBy));
  }

  function updateSortOrder(newSortOrder: string) {
    setSortOrder(newSortOrder);
    router.push(
      pathname + '?' + createQueryStringSingle('sortOrder', newSortOrder)
    );
  }

  function updateHideLowInterest(newHideLowInterest: boolean) {
    setHideLowInterest(newHideLowInterest);
    router.push(
      pathname +
        '?' +
        createQueryStringSingle(
          'hideLowInterest',
          newHideLowInterest.toString()
        )
    );
  }
  function updateHideArtificial(newHideArtificial: boolean) {
    setHideArtificial(newHideArtificial);
    router.push(
      pathname +
        '?' +
        createQueryStringSingle('hideArtificial', newHideArtificial.toString())
    );
  }
  function updateHideManMade(newHideManMade: boolean) {
    setHideManMade(newHideManMade);
    router.push(
      pathname +
        '?' +
        createQueryStringSingle('hideManMade', newHideManMade.toString())
    );
  }

  function showLowInterestValuesWhenFiltered() {
    setHideArtificial(false);
    setHideManMade(false);
    setHideLowInterest(false);
  }

  function updateManMade(newManMade: boolean) {
    let updateValues = [{ name: 'manMade', value: newManMade.toString() }];
    if (newManMade) {
      showLowInterestValuesWhenFiltered();
      updateValues = [...updateValues, ...INTEREST_VALUES];
    }
    setManMade(newManMade);
    router.push(pathname + '?' + createQueryString(updateValues));
  }
  function updateArtificiallyModified(newArtificiallyModified: boolean) {
    let updateValues = [
      {
        name: 'artificiallyModified',
        value: newArtificiallyModified.toString(),
      },
    ];
    if (newArtificiallyModified) {
      showLowInterestValuesWhenFiltered();
      updateValues = [...updateValues, ...INTEREST_VALUES];
    }
    setArtificiallyModified(newArtificiallyModified);
    router.push(pathname + '?' + createQueryString(updateValues));
  }
  function updateLowInterest(newLowInterest: boolean) {
    let updateValues = [
      { name: 'lowInterest', value: newLowInterest.toString() },
    ];
    if (newLowInterest) {
      showLowInterestValuesWhenFiltered();
      updateValues = [...updateValues, ...INTEREST_VALUES];
    }
    setLowInterest(newLowInterest);
    router.push(pathname + '?' + createQueryString(updateValues));
  }

  return (
    <FilterSidebar>
      <FilterGroup>
        <RadioGroupWrapper
          name='sortBy'
          value={sortBy}
          label='Sort By'
          onChange={updateSortBy}>
          <RadioWrapper value='numericId'>Id</RadioWrapper>
          <RadioWrapper value='name'>Name</RadioWrapper>
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
        <CheckboxGroupWrapper label='Hide'>
          <CheckboxWrapper
            isSelected={hideLowInterest}
            onChange={updateHideLowInterest}>
            Hide Low Interest
          </CheckboxWrapper>
          <CheckboxWrapper
            isSelected={hideArtificial}
            onChange={updateHideArtificial}>
            Hide Artificial
          </CheckboxWrapper>
          <CheckboxWrapper
            isSelected={hideManMade}
            onChange={updateHideManMade}>
            Hide Man Made
          </CheckboxWrapper>
        </CheckboxGroupWrapper>
        <CheckboxGroupWrapper label='Filter By'>
          <CheckboxWrapper isSelected={manMade} onChange={updateManMade}>
            Man Made
          </CheckboxWrapper>
          <CheckboxWrapper
            isSelected={artificiallyModified}
            onChange={updateArtificiallyModified}>
            Artificially Modified
          </CheckboxWrapper>
          <CheckboxWrapper
            isSelected={lowInterest}
            onChange={updateLowInterest}>
            Low Interest
          </CheckboxWrapper>
        </CheckboxGroupWrapper>
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
