'use client';
import {
  Button,
  Dialog,
  DialogTrigger,
  Heading,
  Label,
  Modal,
  ModalOverlay,
  Radio,
  RadioGroup,
} from 'react-aria-components';
import styles from './specimenFilters.module.css';
import React, { useCallback } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { ListFilterPlus, X } from 'lucide-react';
import Paginator from '@/app/_shared/components/paginator/paginator';
import { updateQueryString } from '@/app/_shared/utils/urlService';
import iconButtonStyles from '@/app/_shared/styles/iconButton.module.css';

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
    <DialogTrigger>
      <Button className={styles.sidebarButton} aria-label='Open Filters'>
        <ListFilterPlus size={24} />
      </Button>
      <ModalOverlay className={styles.modalOverlay} isDismissable>
        <Modal className={styles.filters}>
          <Dialog>
            <div className={styles.filterHead}>
              <Heading slot='title' level={2} className={styles.title}>
                Filters
              </Heading>
              <Button
                slot='close'
                className={`${styles.closeButton} ${iconButtonStyles.iconButton}`}>
                <X />
              </Button>
            </div>
            <div className={styles.filterGroup}>
              <RadioGroup
                className={styles.radioGroup}
                name='sortBy'
                value={sortBy}
                onChange={updateSortBy}>
                <Label>Sort By</Label>
                <Radio className={styles.radio} value='name'>
                  Name
                </Radio>
                <Radio className={styles.radio} value='numericId'>
                  NumericId
                </Radio>
              </RadioGroup>
              <RadioGroup
                className={styles.radioGroup}
                name='sortOrder'
                value={sortOrder}
                onChange={updateSortOrder}>
                <Label>Sort Order</Label>
                <Radio className={styles.radio} value='asc'>
                  Asc
                </Radio>
                <Radio className={styles.radio} value='desc'>
                  Desc
                </Radio>
              </RadioGroup>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.filterGroup}>
              <Paginator />
            </div>
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  );
}
