'use client';
import { X } from 'lucide-react';
import Image from 'next/image';
import {
  JSX,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  Button,
  Dialog,
  DialogTrigger,
  Modal,
  ModalOverlay,
} from 'react-aria-components';

import LoadingSpinner from '@/app/_shared/components/loadingSpinner/loadingSpinner';
import { getImageDimensions, urlFor } from '@/app/_shared/utils/imageService';

import {
  ImageGalleryContent,
  ImageGalleryContext,
} from '../imageGallery/imageGallery';
import styles from './styles.module.css';

interface ImageModalProps {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  image: any;
  index: number;
  maxWidth?: number;
  maxHeight?: number;
  minWidth?: number;
  minHeight?: number;
}

export default function ImageModal(props: PropsWithChildren<ImageModalProps>) {
  const { images } = useContext<ImageGalleryContent>(ImageGalleryContext);
  const { width, height } = getImageDimensions(props.image);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentModal, setCurrentModal] = useState(false);
  const [imageNode, setImageNode] = useState<JSX.Element | null>(null);
  const [currentIndex, setCurrentIndex] = useState(props.index);

  useEffect(() => {
    if (!currentModal) return;
    setImageNode(
      <Image
        src={
          urlFor(images[currentIndex])?.url() ||
          'https://placehold.co/300x300/png'
        }
        alt=''
        width={width}
        height={height}
        className={styles.modalImage}
        onLoad={() => {
          setImageLoaded(true);
        }}
      />
    );
  }, [currentIndex, currentModal, height, images, width]);

  const handleNextImage = useCallback(() => {
    setImageLoaded(false);
    const nextIndex = currentIndex + 1;
    if (nextIndex >= images.length) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(nextIndex);
    }
  }, [currentIndex, images.length]);

  const handlePreviousImage = useCallback(() => {
    setImageLoaded(false);
    const previousIndex = currentIndex - 1;
    if (previousIndex < 0) {
      setCurrentIndex(images.length - 1);
    } else {
      setCurrentIndex(previousIndex);
    }
  }, [currentIndex, images.length]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      //if (!currentModal) return;
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        handleNextImage();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        handlePreviousImage();
      }
    };

    if (currentModal) {
      window.addEventListener('keydown', handleKeyPress);
    } else {
      window.removeEventListener('keydown', handleKeyPress);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentModal, handleNextImage, handlePreviousImage]);

  function handleModalOpen(isOpen: boolean) {
    if (isOpen) {
      setImageNode(null);
      setCurrentModal(true);
      setCurrentIndex(props.index);
    } else {
      setCurrentModal(false);
    }
  }

  return (
    <DialogTrigger
      onOpenChange={(isOpen: boolean) => {
        handleModalOpen(isOpen);
      }}>
      {props.children}
      <ModalOverlay className={styles.modalOverlay} isDismissable>
        <Modal className={styles.modal}>
          <Dialog className={styles.modalDialog}>
            {imageNode}
            {!imageLoaded && <LoadingSpinner />}
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
