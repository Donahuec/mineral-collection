"use client";
import Image from "next/image";
import styles from "./styles.module.css";
import {
  Button,
  Dialog,
  DialogTrigger,
  Modal,
  ModalOverlay,
} from "react-aria-components";
import { urlFor, getImageDimensions } from "@/app/_shared/utils/imageService";
import { PropsWithChildren, useState } from "react";
import LoadingSpinner from "../loadingSpinner/loadingSpinner";

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
                urlFor(props.image)?.url() || "https://placehold.co/300x300/png"
              }
              alt=""
              width={width}
              height={height}
              className={styles.modalImage}
              onLoad={() => {
                setImageLoaded(true);
              }}
            />
            <Button slot="close" className={styles.closeButton}>
              X
            </Button>
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  );
}
