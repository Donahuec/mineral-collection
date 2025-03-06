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
  && defined(slug.current)
]{_id,  name, slug, previewImage}|order(name desc)`);

const { projectId, dataset } = client.config();
function urlFor(specimen: Specimen) {
  const source = specimen.previewImage;
  if (!source) return "https://placehold.co/300x300/png";
  let imageUrl =
    projectId && dataset
      ? imageUrlBuilder({ projectId, dataset }).image(source)
      : null;
  return imageUrl?.width(300).height(300).url();
}

export default async function SpecimensPage() {
  const { data: specimens } = await sanityFetch({ query: SPECIMENS_QUERY });

  return (
    <main>
      <h1>Specimens</h1>
      <ResultGrid>
        {specimens.map((specimen: Specimen) => (
          <ResultCard
            key={specimen._id}
            title={specimen.name || "Missing Title"}
            imageUrl={urlFor(specimen) || "https://placehold.co/300x300/png"}
            link={`/specimens/${specimen?.slug?.current}`}
          />
        ))}
      </ResultGrid>
    </main>
  );
}
