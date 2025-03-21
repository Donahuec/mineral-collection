import { sanityFetch } from "@/sanity/live";
import { defineQuery, PortableText } from "next-sanity";
import Link from "next/link";
import { notFound } from "next/navigation";
import ImageHeader from "@/app/_shared/components/imageHeader/imageHeader";
import { MINERAL_QUERYResult } from "@/sanity/types";
import ResultGrid from "@/app/_shared/components/resultGrid/resultGrid";
import ResultCard from "@/app/_shared/components/resultGrid/resultCard/resultCard";
import { urlFor } from "@/app/_shared/utils/imageService";
import PropertyList from "@/app/_shared/components/propertyList/propertyList";
import Property from "@/app/_shared/components/propertyList/property/property";
import BackLink from "@/app/_shared/components/backLink/backLink";

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
    <>
      <BackLink title="Back to Minerals" href="/minerals" />
      <ImageHeader
        title={mineral.name || ""}
        imageUrl={imageUrl}
        alt={mineral.name || "Mineral"}>
        <PropertyList>
          <Property title="Scientific Name">
            {mineral.scientificName || "---"}
          </Property>
          <Property title="Alt Names">
            {mineral.altNames?.join(", ") || "---"}
          </Property>
          {mineral.mindatUrl && (
            <Property title="Mindat">
              <Link href={mineral.mindatUrl} target="blank">
                {mineral.mindatUrl}
              </Link>
            </Property>
          )}
          <Property title="Colors">{mineral.color?.colorDescription}</Property>
        </PropertyList>
      </ImageHeader>
      <div>
        {mineral.notes && mineral.notes.length > 0 && (
          <div>
            <PortableText value={mineral.notes} />
          </div>
        )}
      </div>
      <ResultGrid>
        {mineral.specimens?.map((specimen) => (
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
    </>
  );
}
