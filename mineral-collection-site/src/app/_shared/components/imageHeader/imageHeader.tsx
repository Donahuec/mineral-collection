
import { PropsWithChildren } from "react";
import Image from "next/image";
import styles from "./styles.module.css";

interface imageHeaderProps {
    title: string;
    alt?: string;
    imageUrl?: string;
}

export default async function imageHeader(props: PropsWithChildren<imageHeaderProps>) {
    const title = props.title;
    const alt = props.alt;
    const imageUrl = props.imageUrl || "https://placehold.co/550x410/png";
    return <div className={styles.infoBlock}>
    <Image
      src={imageUrl || "https://placehold.co/550x410/png"}
      alt={alt || ""}
      className={styles.previewImage}
      height="410"
      width="550"
      priority
    />
    <div className={styles.primaryDetails}>
      {<h1 className={styles.title}>{title}</h1>}
      {props.children}
    </div>
  </div>
};

