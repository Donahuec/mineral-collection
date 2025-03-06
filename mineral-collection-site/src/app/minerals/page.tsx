import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/live";
import { Mineral } from "@/sanity/types";
import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import ResultCard from "../_shared/components/resultCard/resultCard";
import styles from "./styles.module.css";
import ResultGrid from "../_shared/components/resultGrid/resultGrid";

const MINERALS_QUERY = defineQuery(`*[
  _type == "mineral"
  && defined(slug.current)
]{_id, name, slug, previewImage}|order(name desc)`);

const { projectId, dataset } = client.config();
function urlFor(mineral: Mineral) {
  const source = mineral.previewImage;
  if (!source) return "https://placehold.co/300x300/png";
  let imageUrl =
    projectId && dataset
      ? imageUrlBuilder({ projectId, dataset }).image(source)
      : null;
  return imageUrl?.width(300).height(300).url();
}

export default async function MineralsPage() {
  const { data: minerals } = await sanityFetch({ query: MINERALS_QUERY });
  return (
    <main>
      <h1>Minerals</h1>
      <ResultGrid>
      {minerals.map((mineral: Mineral) => (
          <ResultCard
            key={mineral._id}
            title={mineral.name || "Missing Title"}
            imageUrl={urlFor(mineral) || "https://placehold.co/300x300/png"}
            link={`/minerals/${mineral?.slug?.current}`}
          />
        ))}
      </ResultGrid>
    </main>
  );
}
