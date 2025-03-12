import { sanityFetch } from "@/sanity/live";
import { defineQuery } from "next-sanity";
import { notFound } from "next/navigation";
import styles from "./styles.module.css";
import ImageHeader from "@/app/_shared/components/imageHeader/imageHeader";
import { ROCK_QUERYResult } from "@/sanity/types";
import ResultGrid from "@/app/_shared/components/resultGrid/resultGrid";
import ResultCard from "@/app/_shared/components/resultGrid/resultCard/resultCard";
import { urlFor } from "@/app/_shared/utils/imageService";
import BackLink from "@/app/_shared/components/backLink/backLink";

const ROCK_QUERY = defineQuery(`*[
    _type == "rock" &&
    slug.current == $slug
  ][0]{
  ...,
  'specimens': *[_type == "specimen" && references(^._id)]{
    _id,
    name,
    slug,
    previewImage
}
}`);

export default async function RockPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const result = await sanityFetch({
    query: ROCK_QUERY,
    params: await params,
  });

  const rock = result?.data as ROCK_QUERYResult;
  if (!rock) {
    notFound();
  }
  const imageUrl = rock.previewImage
    ? urlFor(rock.previewImage)?.url()
    : undefined;

  return (
    <main className={styles.container}>
      <BackLink title="Back to Rocks" href="/rocks" />
      <ImageHeader
        title={rock.name || ""}
        imageUrl={imageUrl}
        alt={rock.name || "Rock"}></ImageHeader>

      <ResultGrid>
        {rock.specimens?.map((specimen) => (
          <ResultCard
            key={specimen._id}
            title={specimen.name || "Missing Title"}
            imageUrl={
              urlFor(specimen.previewImage, 600, 600)?.url() ||
              "https://placehold.co/300x300/png"
            }
            link={`/specimens/${specimen?.slug?.current}`}
          />
        ))}
      </ResultGrid>
    </main>
  );
}
