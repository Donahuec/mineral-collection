'use client';
import React from 'react';

import ImageGalleryItem from './imageGalleryItem/imageGalleryItem';
import styles from './styles.module.css';

interface ImageGalleryProps {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  images: any[];
  previewWidth?: number;
  previewHeight?: number;
}

export interface ImageGalleryContent {
  images: any[];
}

export const ImageGalleryContext = React.createContext<ImageGalleryContent>({
  images: [],
});

export default function ImageGallery({
  images,
  previewWidth = 300,
  previewHeight = 300,
}: ImageGalleryProps) {
  return (
    <ImageGalleryContext.Provider
      value={{
        images,
      }}>
      <ul className={styles.imageGrid}>
        {images &&
          images.length > 0 &&
          images?.map((image, index) => (
            <ImageGalleryItem
              image={image}
              previewWidth={previewWidth}
              previewHeight={previewHeight}
              index={index}
              key={image._key}
            />
          ))}
      </ul>
    </ImageGalleryContext.Provider>
  );
}
