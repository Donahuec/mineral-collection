import ResultCard from "@/app/_shared/components/resultGrid/resultCard/resultCard";
import ResultGrid from "@/app/_shared/components/resultGrid/resultGrid";
import { urlFor } from "@/app/_shared/utils/imageService";
import { sanityFetch } from "@/sanity/live";
import { defineQuery } from "next-sanity";

const MINERALS_QUERY = defineQuery(`*[
  _type == "mineral"
  && defined(slug.current) 
  && count(*[_type == "specimen" && references(^._id)]) > 0
]{_id, name, slug, previewImage}|order(name asc)`);

export default async function MineralsPageResults() {
  const { data: minerals } = await sanityFetch({ query: MINERALS_QUERY });
  return (
    <ResultGrid>
      {minerals.map((mineral) => (
        <ResultCard
          key={mineral._id}
          title={mineral.name || "Missing Title"}
          imageUrl={
            urlFor(mineral.previewImage, 600, 600)?.url() ||
            "https://placehold.co/300x300/png"
          }
          link={`/minerals/${mineral?.slug?.current}`}
        />
      ))}
    </ResultGrid>
  );
}
