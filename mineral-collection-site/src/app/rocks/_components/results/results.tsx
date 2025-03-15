import ResultCard from "@/app/_shared/components/resultGrid/resultCard/resultCard";
import ResultGrid from "@/app/_shared/components/resultGrid/resultGrid";
import { urlFor } from "@/app/_shared/utils/imageService";
import { sanityFetch } from "@/sanity/live";
import { defineQuery } from "next-sanity";

const ROCKS_QUERY = defineQuery(`*[
  _type == "rock"
  && defined(slug.current) 
  && count(*[_type == "specimen" && references(^._id)]) > 0
]{_id, name, slug, previewImage}|order(name asc)`);

export default async function RocksPageResults() {
  const { data: rocks } = await sanityFetch({ query: ROCKS_QUERY });
  return (
    <ResultGrid>
      {rocks.map((rock) => (
        <ResultCard
          key={rock._id}
          title={rock.name || "Missing Title"}
          imageUrl={
            urlFor(rock.previewImage, 600, 600)?.url() ||
            "https://placehold.co/300x300/png"
          }
          link={`/rocks/${rock?.slug?.current}`}
        />
      ))}
    </ResultGrid>
  );
}
