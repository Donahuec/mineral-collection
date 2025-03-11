import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/live";
import ResultCard from "../_shared/components/resultGrid/resultCard/resultCard";
import styles from "./styles.module.css";
import ResultGrid from "../_shared/components/resultGrid/resultGrid";
import { urlFor } from "../_shared/utils/urlService";

const SPECIMENS_QUERY = defineQuery(`*[
  _type == "specimen"
  && defined(slug.current) && defined(previewImage) && numericId > $lastId
]{_id,  name, numericId, slug, previewImage}|order(numericId asc)`);

export default async function SpecimensPage() {
  const { data: specimens } = await sanityFetch({ query: SPECIMENS_QUERY, params: { lastId: 0 } });
  return (
    <main>
      <h1 className={styles.title}>Specimens</h1>
      <ResultGrid>
        {specimens.map((specimen) => (
          <ResultCard
            key={specimen._id}
            title={`${specimen.name} - #${specimen.numericId}` || "Missing Title"}
            imageUrl={urlFor(specimen.previewImage, 600, 600)?.url() || "https://placehold.co/300x300/png"}
            link={`/specimens/${specimen?.slug?.current}`}
          />
        ))}
      </ResultGrid>
    </main>
  );
}
