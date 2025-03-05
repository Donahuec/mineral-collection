import { client } from "@/sanity/client";
import { sanityFetch } from "@/sanity/live";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { defineQuery, PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const MINERAL_QUERY = defineQuery(`*[
    _type == "mineral" &&
    slug.current == $slug
  ][0]{
  ...
}`);

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export default async function MineralPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { data: mineral } = await sanityFetch({
    query: MINERAL_QUERY,
    params: await params,
  });
  if (!mineral) {
    notFound();
  }
  const imageUrl = mineral.previewImage
    ? urlFor(mineral.previewImage)?.width(550).height(310).url()
    : null;

  return (
    <main>
      <div>
        <Link href="/minerals">← Back to Minerals</Link>
      </div>
      <div>
        <Image
          src={imageUrl || "https://placehold.co/550x310/png"}
          alt={mineral.name || "Mineral"}
          height="310"
          width="550"
        />
        <div>
          {mineral.name ? <h1>{mineral.name}</h1> : null}
          {mineral.notes && mineral.notes.length > 0 && (
            <div>
              <PortableText value={mineral.notes} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
