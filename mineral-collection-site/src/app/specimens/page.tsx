import { Suspense } from "react";
import styles from "./styles.module.css";
import LoadingSpinner from "../_shared/components/loadingSpinner/loadingSpinner";
import SpecimenResults from "./_components/specimenResults/specimenResults";
import SpecimenFilters from "./_components/specimenFilters/specimenFilters";
import React from "react";
import { getSpecimens } from "../_shared/services/specimenService";

export default async function SpecimensPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: number | string | string[] | undefined }>
}) {
  const params = await searchParams;

  if (params.page) {
    params.page = parseInt(params.page as string);
  }
  if (params.pageSize) {
    params.pageSize = parseInt(params.pageSize as string);
  }

  const specimens = getSpecimens(params);

  return (
    <>
      <h1 className={styles.title}>Specimens</h1>
      <div className={styles.content}>
        <SpecimenFilters />
        <div className={styles.results}>
          <Suspense fallback={<LoadingSpinner />}>
            <SpecimenResults specimens={specimens} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
