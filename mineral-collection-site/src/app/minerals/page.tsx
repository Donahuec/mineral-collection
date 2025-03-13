import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/live";
import ResultCard from "../_shared/components/resultGrid/resultCard/resultCard";
import styles from "./styles.module.css";
import ResultGrid from "../_shared/components/resultGrid/resultGrid";
import { urlFor } from "../_shared/utils/imageService";

const MINERALS_QUERY = defineQuery(`*[
  _type == "mineral"
  && defined(slug.current) 
  && count(*[_type == "specimen" && references(^._id)]) > 0
]{_id, name, slug, previewImage}|order(name asc)`);

export default async function MineralsPage() {
  const { data: minerals } = await sanityFetch({ query: MINERALS_QUERY });
  return (
    <>
      <h1 className={styles.title}>Minerals</h1>
      <ResultGrid>
        {minerals.map((mineral) => (
          <ResultCard
            key={mineral._id}
            title={mineral.name || "Missing Title"}
            imageUrl={
              urlFor(mineral.previewImage, 600, 600)?.url() ||
              "https://placehold.co/300x300/png"
            }
            link={`/minerals/${mineral?.slug?.current}`}
          />
        ))}
      </ResultGrid>
    </>
  );
}
