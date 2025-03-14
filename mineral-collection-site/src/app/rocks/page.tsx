import { Suspense } from "react";
import LoadingSpinner from "../_shared/components/loadingSpinner/loadingSpinner";
import RocksPageResults from "./_components/results/results";
import styles from "./styles.module.css";

export default async function RocksPage() {
  return (
    <>
      <h1 className={styles.title}>Rocks</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <RocksPageResults />
      </Suspense>
    </>
  );
}
