import { client } from "@/sanity/client";
import { sanityFetch } from "@/sanity/live";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { defineQuery } from "next-sanity";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./styles.module.css";
import ImageHeader from "@/app/_shared/components/imageHeader/imageHeader";
import { Rock, ROCK_QUERYResult } from "@/sanity/types";
import ResultGrid from "@/app/_shared/components/resultGrid/resultGrid";
import ResultCard from "@/app/_shared/components/resultCard/resultCard";

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

const { projectId, dataset } = client.config();
/* eslint-disable  @typescript-eslint/no-explicit-any */
const urlFor = (source: any) =>
  projectId && dataset && source
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

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
      <div>
        <Link href="/rocks">← Back to Rocks</Link>
      </div>
      <ImageHeader title={rock.name || ""} imageUrl={imageUrl} alt={rock.name || "Rock"}>
      </ImageHeader>

      <ResultGrid>
        {rock.specimens?.map((specimen) => (
          <ResultCard
            key={specimen._id}
            title={specimen.name || "Missing Title"}
            imageUrl={urlFor(specimen.previewImage)?.url() || "https://placehold.co/300x300/png"}
            link={`/specimens/${specimen?.slug?.current}`}
          />
        ))}
      </ResultGrid>
    </main>
  );
}
