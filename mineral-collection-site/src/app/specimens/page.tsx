import { Suspense } from "react";
import styles from "./styles.module.css";
import LoadingSpinner from "../_shared/components/loadingSpinner/loadingSpinner";
import SpecimenResults from "./_components/specimenResults/specimenResults";
import SpecimenFilters from "./_components/specimenFilters/specimenFilters";
import React from "react";

export default async function SpecimensPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: number | string | string[] | undefined }>
}) {
  return (
    <>
      <h1 className={styles.title}>Specimens</h1>
      <div className={styles.filters}>
        <SpecimenFilters />
      </div>
      <div className={styles.content}>

        <div className={styles.results}>
          <Suspense fallback={<LoadingSpinner />}>
            <SpecimenResults searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
