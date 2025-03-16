import { ListFilterPlus, X } from 'lucide-react';
import { Button, DialogTrigger, Heading } from 'react-aria-components';

import iconButtonStyles from '@/app/_shared/styles/iconButton.module.css';

import Sidebar from '../sidebar/sidebar';
import styles from './filterSidebar.module.css';

export default function FilterSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DialogTrigger>
      <Button className={styles.sidebarButton} aria-label='Open Filters'>
        <ListFilterPlus size={24} />
      </Button>
      <Sidebar>
        <div className={styles.filterHead}>
          <Heading slot='title' level={2} className={styles.filterTitle}>
            Filters
          </Heading>
          <Button
            slot='close'
            className={`${styles.closeButton} ${iconButtonStyles.iconButton}`}>
            <X />
          </Button>
        </div>
        {children}
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
