import { client } from "@/sanity/client";
import { sanityFetch } from "@/sanity/live";
import { Specimen } from "@/sanity/types";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { defineQuery, PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./styles.module.css";

const SPECIMEN_QUERY = defineQuery(`*[
    _type == "specimen" &&
    slug.current == $slug
  ][0]{
  ...,
  minerals->{name, slug, previewImage}
}`);

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export default async function SpecimenPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const result = await sanityFetch({
    query: SPECIMEN_QUERY,
    params: await params,
  });
  const specimen = result?.data as Specimen;
  if (!specimen) {
    notFound();
  }
  const imageUrl = specimen.previewImage
    ? urlFor(specimen.previewImage)?.url()
    : null;

  return (
    <main className={styles.container}>
      <div>
        <Link href="/specimens">← Back to Specimens</Link>
      </div>
      <div className={styles.infoBlock}>
        <Image
          src={imageUrl || "https://placehold.co/550x310/png"}
          alt={specimen.name || "Specimen"}
          className={styles.previewImage}
          height="300"
          width="400"
        />
        <div className={styles.primaryDetails}>
          {<h1 className={styles.title}>{specimen.name} {specimen.numericId && (<>- #{specimen.numericId}</>)}</h1>}
        </div>
      </div>
      {specimen.notes && specimen.notes.length > 0 && (
        <div>
          <PortableText value={specimen.notes} />
        </div>
      )}
    </main>
  );
}
