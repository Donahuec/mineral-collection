'use client';
import Image from 'next/image';
import React from 'react';
import { Button } from 'react-aria-components';

import ImageModal from '@/app/_shared/components/imageModal/imageModal';
import { urlFor } from '@/app/_shared/utils/imageService';

import styles from './styles.module.css';

interface ImageGalleryItemProps {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  image: any;
  previewWidth?: number;
  previewHeight?: number;
  index?: number;
}

export default function ImageGalleryItem({
  image,
  previewWidth = 300,
  previewHeight = 300,
  index = 0,
}: ImageGalleryItemProps) {
  return (
    <ImageModal image={image} maxWidth={1000} maxHeight={500} index={index}>
      <Button className={styles.imageButton}>
        <Image
          src={
            urlFor(image, previewWidth * 2, previewHeight * 2)?.url() ||
            'https://placehold.co/300x300/png'
          }
          alt=''
          className={styles.image}
          width={previewWidth}
          height={previewHeight}
        />
      </Button>
    </ImageModal>
  );
}
