'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react';
import { Label } from 'react-aria-components';

import FilterSidebar, {
  FilterDivider,
  FilterFooter,
  FilterGroup,
} from '@/app/_shared/components/filterComponents/filterSidebar/filterSidebar';
import PageSizeFilter from '@/app/_shared/components/filterComponents/pageSizeFilter/pageSizeFilter';
import Paginator from '@/app/_shared/components/filterComponents/paginator/paginator';
import CheckboxWrapper from '@/app/_shared/components/formComponents/checkboxWrapper/checkboxWrapper';
import RadioGroupWrapper, {
  RadioWrapper,
} from '@/app/_shared/components/formComponents/radioGroupWrapper/radioGroupWrapper';
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
  const [showLowInterest, setShowLowInterest] = React.useState(
    params.get('showLowInterest') === 'true' ? true : false
  );
  const [showArtificial, setShowArtificial] = React.useState(
    params.get('showArtificial') === 'true' ? true : false
  );
  const [showManMade, setShowManMade] = React.useState(
    params.get('showManMade') === 'true' ? true : false
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

  function updateShowLowInterest(newShowLowInterest: boolean) {
    setShowLowInterest(newShowLowInterest);
    router.push(
      pathname +
        '?' +
        createQueryString('showLowInterest', newShowLowInterest.toString())
    );
  }
  function updateShowArtificial(newShowArtificial: boolean) {
    setShowArtificial(newShowArtificial);
    router.push(
      pathname +
        '?' +
        createQueryString('showArtificial', newShowArtificial.toString())
    );
  }
  function updateShowManMade(newShowManMade: boolean) {
    setShowManMade(newShowManMade);
    router.push(
      pathname +
        '?' +
        createQueryString('showManMade', newShowManMade.toString())
    );
  }
  function updateManMade(newManMade: boolean) {
    setManMade(newManMade);
    router.push(
      pathname + '?' + createQueryString('manMade', newManMade.toString())
    );
  }
  function updateArtificiallyModified(newArtificiallyModified: boolean) {
    setArtificiallyModified(newArtificiallyModified);
    router.push(
      pathname +
        '?' +
        createQueryString(
          'artificiallyModified',
          newArtificiallyModified.toString()
        )
    );
  }
  function updateLowInterest(newLowInterest: boolean) {
    setLowInterest(newLowInterest);
    router.push(
      pathname +
        '?' +
        createQueryString('lowInterest', newLowInterest.toString())
    );
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
        <div className={styles.checkboxGroup}>
          <Label>Show</Label>
          <CheckboxWrapper
            isSelected={showLowInterest}
            onChange={updateShowLowInterest}>
            Show Low Interest
          </CheckboxWrapper>
          <CheckboxWrapper
            isSelected={showArtificial}
            onChange={updateShowArtificial}>
            Show Artificial
          </CheckboxWrapper>
          <CheckboxWrapper
            isSelected={showManMade}
            onChange={updateShowManMade}>
            Show Man Made
          </CheckboxWrapper>
        </div>
        <div className={styles.checkboxGroup}>
          <Label>Filter By</Label>
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
        </div>
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
