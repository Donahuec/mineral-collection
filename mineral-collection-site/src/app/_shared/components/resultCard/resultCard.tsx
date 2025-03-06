// react component to display an image and title that is clickable to go to the supplied link

import Link from "next/link";
import Image from "next/image";
import { FC } from "react";
import styles from "./styles.module.css";

type ResultCardProps = {
  title: string;
  imageUrl: string;
  link: string;
};

const ResultCard: FC<ResultCardProps> = ({ title, imageUrl, link }) => (
  <li className={styles.card}>
    <Link href={link}>
      <Image
        src={imageUrl || "https://placehold.co/300x300/png"}
        alt={title}
        className={styles.image}
        width={300}
        height={300}
      />
      <div className={styles.content}>
        <div className={styles.title}>
          <h2>{title}</h2>
        </div>
      </div>
    </Link>
  </li>
);

export default ResultCard;
