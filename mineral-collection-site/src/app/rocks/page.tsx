import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/live";
import { Mineral, Rock } from "@/sanity/types";
import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import ResultCard from "../_shared/components/resultCard/resultCard";
import styles from "./styles.module.css";
import ResultGrid from "../_shared/components/resultGrid/resultGrid";

const ROCKS_QUERY = defineQuery(`*[
  _type == "rock"
  && defined(slug.current) 
  && count(*[_type == "specimen" && references(^._id)]) > 0
]{_id, name, slug, previewImage}|order(name asc)`);

const { projectId, dataset } = client.config();
function urlFor(rock: Rock) {
  const source = rock.previewImage;
  if (!source) return "https://placehold.co/300x300/png";
  let imageUrl =
    projectId && dataset
      ? imageUrlBuilder({ projectId, dataset }).image(source)
      : null;
  return imageUrl?.width(600).height(600).url();
}

export default async function RocksPage() {
  const { data: rocks } = await sanityFetch({ query: ROCKS_QUERY });
  return (
    <main>
      <h1 className={styles.title}>Rocks</h1>
      <ResultGrid>
      {rocks.map((rock: any) => (
          <ResultCard
            key={rock._id}
            title={rock.name || "Missing Title"}
            imageUrl={urlFor(rock) || "https://placehold.co/300x300/png"}
            link={`/rocks/${rock?.slug?.current}`}
          />
        ))}
      </ResultGrid>
    </main>
  );
}
