import { client } from "@/sanity/client";
import { sanityFetch } from "@/sanity/live";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { defineQuery, PortableText } from "next-sanity";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./styles.module.css";
import ImageHeader from "@/app/_shared/components/imageHeader/imageHeader";
import { MINERAL_QUERYResult } from "@/sanity/types";
import ResultGrid from "@/app/_shared/components/resultGrid/resultGrid";
import ResultCard from "@/app/_shared/components/resultCard/resultCard";

const MINERAL_QUERY = defineQuery(`*[
    _type == "mineral" &&
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
const urlFor = (source: SanityImageSource | null) =>
  projectId && dataset && source
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export default async function MineralPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const result = await sanityFetch({
    query: MINERAL_QUERY,
    params: await params,
  });

  const mineral = result?.data as MINERAL_QUERYResult;
  if (!mineral) {
    notFound();
  }
  const imageUrl = mineral.previewImage
    ? urlFor(mineral.previewImage)?.url()
    : undefined;

  return (
    <main className={styles.container}>
      <div>
        <Link href="/minerals">← Back to Minerals</Link>
      </div>
      <ImageHeader title={mineral.name || ""} imageUrl={imageUrl} alt={mineral.name || "Mineral"}>
        <dl>
          <dt>Scientific Name</dt>
          <dd>{mineral.scientificName}</dd>
          <dt>Alt Names</dt>
          <dd>{mineral.altNames}</dd>
          <dt>Mindat Url</dt>
          <dd>{mineral.mindatUrl}</dd>
          <dt>Colors</dt>
          <dd>{mineral.color?.colorDescription}</dd>
        </dl>
      </ImageHeader>
      <div>
        {mineral.notes && mineral.notes.length > 0 && (
          <div>
            <PortableText value={mineral.notes} />
          </div>
        )}
      </div>
      <ResultGrid>
        {(mineral).specimens?.map((specimen) => (
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
