import { client } from "@/sanity/client";
import { sanityFetch } from "@/sanity/live";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { defineQuery, PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const SPECIMEN_QUERY = defineQuery(`*[
    _type == "specimen" &&
    slug.current == $slug
  ][0]{
  ...,
  minerals->
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
  const { data: specimen } = await sanityFetch({
    query: SPECIMEN_QUERY,
    params: await params,
  });
  if (!specimen) {
    notFound();
  }
  const imageUrl = specimen.previewImage
    ? urlFor(specimen.previewImage)?.width(550).height(310).url()
    : null;

  return (
    <main>
      <div>
        <Link href="/specimens">← Back to Specimens</Link>
      </div>
      <div>
        <Image
          src={imageUrl || "https://placehold.co/550x310/png"}
          alt={specimen.name || "Specimen"}
          height="310"
          width="550"
        />
        <div>
          {specimen.name ? <h1>{specimen.name}</h1> : null}
          {specimen.notes && specimen.notes.length > 0 && (
            <div>
              <PortableText value={specimen.notes} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
