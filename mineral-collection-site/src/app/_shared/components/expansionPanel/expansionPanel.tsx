import {
  Button,
  Disclosure,
  DisclosurePanel,
  DisclosureProps,
  Heading,
} from 'react-aria-components';

import styles from './expansionPanel.module.css';

interface ExpansionPanelProps extends Omit<DisclosureProps, 'children'> {
  title?: string;
  children?: React.ReactNode;
}

export default function ExpansionPanel({
  title,
  children,
  ...props
}: ExpansionPanelProps) {
  return (
    <Disclosure {...props} className={styles.disclosure}>
      <Heading>
        <Button slot='trigger' className={styles.disclosureButton}>
          <svg viewBox='0 0 24 24' className={styles.disclosureButtonIcon}>
            <path d='m8.25 4.5 7.5 7.5-7.5 7.5' />
          </svg>
          <span className={styles.disclosureButtonText}>{title}</span>
        </Button>
      </Heading>
      <DisclosurePanel className={styles.disclosurePanel}>
        {children}
      </DisclosurePanel>
    </Disclosure>
  );
}
