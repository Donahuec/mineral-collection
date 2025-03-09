import Link from "next/link";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/live";
import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { Specimen } from "@/sanity/types";
import ResultCard from "../_shared/components/resultCard/resultCard";
import styles from "./styles.module.css";
import ResultGrid from "../_shared/components/resultGrid/resultGrid";

const SPECIMENS_QUERY = defineQuery(`*[
  _type == "specimen"
  && defined(slug.current) && defined(previewImage) && numericId > $lastId
]{_id,  name, numericId, slug, previewImage}|order(numericId asc)`);

const { projectId, dataset } = client.config();
function urlFor(specimen: Specimen) {
  const source = specimen.previewImage;
  return projectId && dataset && source
      ? imageUrlBuilder({ projectId, dataset }).image(source).width(600).height(600).url()
      : "https://placehold.co/300x300/png";
}

export default async function SpecimensPage() {
  const { data: specimens } = await sanityFetch({ query: SPECIMENS_QUERY, params: { lastId: 0 } });
  

  return (
    <main>
      <h1>Specimens</h1>
      <ResultGrid>
        {specimens.map((specimen: any) => (
          <ResultCard
            key={specimen._id}
            title={`${specimen.name} - #${specimen.numericId}` || "Missing Title"}
            imageUrl={urlFor(specimen)}
            link={`/specimens/${specimen?.slug?.current}`}
          />
        ))}
      </ResultGrid>
    </main>
  );
}
