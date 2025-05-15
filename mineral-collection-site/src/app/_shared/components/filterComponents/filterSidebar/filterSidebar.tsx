import { ListFilterPlus, X } from 'lucide-react';
import { Button, DialogTrigger, Heading } from 'react-aria-components';

import Sidebar from '@/app/_shared/components/sidebar/sidebar';
import iconButtonStyles from '@/app/_shared/styles/iconButton.module.css';

import styles from './filterSidebar.module.css';

export default function FilterSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DialogTrigger>
      <Button
        className={styles.sidebarButton}
        aria-label='Open Filters'
        data-testid='open-filters'>
        <ListFilterPlus size={24} />
      </Button>
      <Sidebar>
        <div className={styles.filterHead}>
          <Heading slot='title' level={2} className={styles.filterTitle}>
            Filters
          </Heading>
          <Button
            slot='close'
            className={`${styles.closeButton} ${iconButtonStyles.iconButton}`}
            data-testid='close-filters'
            aria-label='Close Filters'>
            <X />
          </Button>
        </div>
        <div className={styles.filters}>{children}</div>
      </Sidebar>
    </DialogTrigger>
  );
}

export function FilterGroup({ children }: { children: React.ReactNode }) {
  return <div className={styles.filterGroup}>{children}</div>;
}

export function FilterDivider() {
  return <div className={styles.filterDivider} />;
}

export function FilterFooter({ children }: { children: React.ReactNode }) {
  return <div className={styles.filterFooter}>{children}</div>;
}
