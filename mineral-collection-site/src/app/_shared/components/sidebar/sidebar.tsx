import { Dialog, Modal, ModalOverlay } from 'react-aria-components';

import styles from './sidebar.module.css';

export default function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <ModalOverlay className={styles.modalOverlay} isDismissable>
      <Modal className={styles.sidebar}>
        <Dialog>{children}</Dialog>
      </Modal>
    </ModalOverlay>
  );
}
