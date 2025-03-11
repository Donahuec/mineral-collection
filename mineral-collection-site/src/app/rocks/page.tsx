import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/live";
import ResultCard from "../_shared/components/resultGrid/resultCard/resultCard";
import styles from "./styles.module.css";
import ResultGrid from "../_shared/components/resultGrid/resultGrid";
import { urlFor } from "../_shared/utils/imageService";

const ROCKS_QUERY = defineQuery(`*[
  _type == "rock"
  && defined(slug.current) 
  && count(*[_type == "specimen" && references(^._id)]) > 0
]{_id, name, slug, previewImage}|order(name asc)`);

export default async function RocksPage() {
  const { data: rocks } = await sanityFetch({ query: ROCKS_QUERY });
  return (
    <main>
      <h1 className={styles.title}>Rocks</h1>
      <ResultGrid>
      {rocks.map((rock) => (
          <ResultCard
            key={rock._id}
            title={rock.name || "Missing Title"}
            imageUrl={urlFor(rock.previewImage, 600, 600)?.url() || "https://placehold.co/300x300/png"}
            link={`/rocks/${rock?.slug?.current}`}
          />
        ))}
      </ResultGrid>
    </main>
  );
}
