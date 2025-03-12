import Link from "next/link";
import ImageHeader from "./_shared/components/imageHeader/imageHeader";
import styles from "./styles.module.css";
export default async function IndexPage() {
  return (
    <main>
      <ImageHeader title="Mineral Collection" imageUrl="/preview.jpeg" alt="">
        <div className={styles.headerContent}>
          <Link href={`/specimens`} className={styles.link}>
            <h2>Specimens</h2>
            <div className={styles.linkUnderline} />
          </Link>
          <Link href={`/minerals`} className={styles.link}>
            <h2>Minerals</h2>
            <div className={styles.linkUnderline} />
          </Link>
          <Link href={`/rocks`} className={styles.link}>
            <h2>Rocks</h2>
            <div className={styles.linkUnderline} />
          </Link>
        </div>
      </ImageHeader>
    </main>
  );
}
