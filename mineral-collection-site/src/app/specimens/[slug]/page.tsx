import { client } from "@/sanity/client";
import { sanityFetch } from "@/sanity/live";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { defineQuery, PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { spec } from "node:test/reporters";

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

export default async function EventPage({
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
    <main className="container mx-auto grid gap-12 p-12">
      <div className="mb-4">
        <Link href="/">← Back to Specimens</Link>
      </div>
      <div className="grid items-top gap-12 sm:grid-cols-2">
        <Image
          src={imageUrl || "https://placehold.co/550x310/png"}
          alt={specimen.name || "Specimen"}
          className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
          height="310"
          width="550"
        />
        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-4">
            {specimen.name ? (
              <h1 className="text-4xl font-bold tracking-tighter mb-8">
                {specimen.name}
              </h1>
            ) : null}
            {specimen.notes && specimen.notes.length > 0 && (
              <div className="prose max-w-none">
                <PortableText value={specimen.notes} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
