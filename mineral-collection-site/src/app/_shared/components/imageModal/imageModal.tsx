'use client';
import { X } from 'lucide-react';
import Image from 'next/image';
import { PropsWithChildren, useState } from 'react';
import { Button, Dialog, DialogTrigger, Modal, ModalOverlay } from 'react-aria-components';

import LoadingSpinner from '@/app/_shared/components/loadingSpinner/loadingSpinner';
import { getImageDimensions, urlFor } from '@/app/_shared/utils/imageService';

import styles from './styles.module.css';

interface ImageModalProps {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  image: any;
  maxWidth?: number;
  maxHeight?: number;
  minWidth?: number;
  minHeight?: number;
}

export default function ImageModal(props: PropsWithChildren<ImageModalProps>) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { width, height } = getImageDimensions(props.image);
  return (
    <DialogTrigger>
      {props.children}
      <ModalOverlay className={styles.modalOverlay} isDismissable>
        <Modal className={styles.modal}>
          <Dialog className={styles.modalDialog}>
            {!imageLoaded && <LoadingSpinner />}
            <Image
              src={
                urlFor(props.image)?.url() || 'https://placehold.co/300x300/png'
              }
              alt=''
              width={width}
              height={height}
              className={styles.modalImage}
              onLoad={() => {
                setImageLoaded(true);
              }}
            />
            <Button
              slot='close'
              className={styles.closeButton}
              aria-label='Close'>
              <X size={16} />
            </Button>
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  );
}
