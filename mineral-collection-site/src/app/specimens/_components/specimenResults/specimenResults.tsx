import ResultCard from "@/app/_shared/components/resultGrid/resultCard/resultCard";
import ResultGrid from "@/app/_shared/components/resultGrid/resultGrid";
import { urlFor } from "@/app/_shared/utils/imageService";
import { SPECIMENS_QUERYResult } from "@/sanity/types";
import { use } from "react";

export default function SpecimenResults({ specimens }: { specimens: Promise<SPECIMENS_QUERYResult> }) {
  const allSpecimens = use(specimens);
  return (
    <ResultGrid>
      {allSpecimens.map((specimen) => (
        <ResultCard
          key={specimen._id}
          title={
            `${specimen.name} - #${specimen.numericId}` || "Missing Title"
          }
          imageUrl={
            urlFor(specimen.previewImage, 600, 600)?.url() ||
            "https://placehold.co/300x300/png"
          }
          link={`/specimens/${specimen?.slug?.current}`}
        />
      ))}
    </ResultGrid>
  );
}
