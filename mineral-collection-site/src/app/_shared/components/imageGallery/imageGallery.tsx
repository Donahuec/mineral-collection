
"use client";
import styles from "./styles.module.css";
import ImageGalleryItem from "./imageGalleryItem/imageGalleryItem";

interface ImageGalleryProps {
    images: any[];
    previewWidth?: number;
    previewHeight?: number;
}

export default function ImageGallery({ images, previewWidth = 300, previewHeight = 300 }: ImageGalleryProps) {
    return <ul className={styles.imageGrid}>
        {images && images.length > 0 &&
            images?.map((image) => (
                <ImageGalleryItem image={image} previewWidth={previewWidth} previewHeight={previewHeight} key={image._key} />
            ))}
    </ul>
};

