import Image from 'next/image';
import { PropsWithChildren } from 'react';

import { urlFor } from '../../utils/imageService';
import styles from './styles.module.css';

interface ImageHeaderProps {
  title: string;
  alt?: string;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  image?: any;
  staticImageUrl?: string;
}

export default async function ImageHeader(
  props: PropsWithChildren<ImageHeaderProps>
) {
  const title = props.title;
  const alt = props.alt;

  const width = 1080;
  const height = 1080;

  let imageUrl;

  if (props.staticImageUrl) {
    imageUrl = props.staticImageUrl;
  } else {
    imageUrl =
      (props.image?.asset?._ref
        ? urlFor(props.image, width, height)?.url()
        : '') || 'https://placehold.co/500x500/png';
  }

  return (
    <div className={styles.infoBlock}>
      <Image
        src={imageUrl}
        alt={alt || ''}
        className={styles.previewImage}
        height={height}
        width={width}
        priority
        placeholder='blur'
        blurDataURL='/blur.png'
      />

      <div className={styles.primaryDetails}>
        {<h1 className={styles.title}>{title}</h1>}
        {props.children}
      </div>
    </div>
  );
}
