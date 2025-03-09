
import { PropsWithChildren } from "react";
import Image from "next/image";
import styles from "./styles.module.css";

interface imageHeaderProps {
    title: string;
    alt?: string;
    imageUrl?: string;
}

export default async function imageHeader(props: PropsWithChildren<imageHeaderProps>) {
    let title = props.title;
    let alt = props.alt;
    let imageUrl = props.imageUrl || "https://placehold.co/550x410/png";
    return <div className={styles.infoBlock}>
    <Image
      src={imageUrl || "https://placehold.co/550x410/png"}
      alt={alt || ""}
      className={styles.previewImage}
      height="410"
      width="550"
    />
    <div className={styles.primaryDetails}>
      {<h1 className={styles.title}>{title}</h1>}
      {props.children}
    </div>
  </div>
};

