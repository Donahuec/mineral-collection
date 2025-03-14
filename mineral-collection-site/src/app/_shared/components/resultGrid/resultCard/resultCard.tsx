// react component to display an image and title that is clickable to go to the supplied link
import Link from "next/link";
import Image from "next/image";
import styles from "./styles.module.css";

type ResultCardProps = {
  title: string;
  imageUrl: string;
  link: string;
};

export default function ResultCard({
  title,
  imageUrl,
  link,
}: ResultCardProps) {
  return (
    <li className={styles.card}>
      <Link href={link}>
        <div className={styles.container}>
          <Image
            src={imageUrl}
            alt={title}
            className={styles.image}
            width={300}
            height={300}
          />
          <div className={styles.divider} />
          <div className={styles.content}>
            <div className={styles.title}>
              <h2>{title}</h2>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}
