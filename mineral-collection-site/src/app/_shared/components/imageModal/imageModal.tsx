
"use client";
import Image from "next/image";
import styles from "./styles.module.css";
import { Button, Dialog, DialogTrigger, Modal, ModalOverlay } from 'react-aria-components';
import { urlFor } from "@/app/_shared/utils/urlService";
import { PropsWithChildren, useState } from "react";

interface ImageModalProps {
    image: any;

    maxWidth?: number;
    maxHeight?: number;
    minWidth?: number;
    minHeight?: number;
}

export default function ImageModal(props: PropsWithChildren<ImageModalProps>) {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <DialogTrigger>
            {props.children}
            <ModalOverlay className={styles.modalOverlay}>
                <Modal className={styles.modal}>
                    <Dialog className={styles.modalDialog}>
                        {!imageLoaded && <div className={styles.loader}></div>}
                        <Image
                            src={urlFor(props.image)?.url() || "https://placehold.co/300x300/png"}
                            alt=""
                            width={1000}
                            height={500}
                            className={styles.modalImage}
                            onLoad={(e) => {
                                setImageLoaded(true);
                            }} />
                        <Button slot="close" className={styles.closeButton}>
                            X
                        </Button>
                    </Dialog>
                </Modal>
            </ModalOverlay>

        </DialogTrigger>
    );
}

