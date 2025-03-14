import styles from "./styles.module.css";
import { Suspense } from "react";
import MineralsPageResults from "./_components/results/results";
import LoadingSpinner from "../_shared/components/loadingSpinner/loadingSpinner";

export default async function MineralsPage() {
  return (
    <>
      <h1 className={styles.title}>Minerals</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <MineralsPageResults />
      </Suspense>
    </>
  );
}
