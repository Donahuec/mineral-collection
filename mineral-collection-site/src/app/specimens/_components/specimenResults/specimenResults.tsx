import ResultCard from "@/app/_shared/components/resultGrid/resultCard/resultCard";
import ResultGrid from "@/app/_shared/components/resultGrid/resultGrid";
import { getSpecimens } from "@/app/_shared/services/specimenService";
import { urlFor } from "@/app/_shared/utils/imageService";

export default async function SpecimenResults({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: number | string | string[] | undefined }>
}) {
  const params = await searchParams;

  if (params.page) {
    params.page = parseInt(params.page as string);
  }
  if (params.pageSize) {
    params.pageSize = parseInt(params.pageSize as string);
  }
  const specimens = await getSpecimens(params);

  return (
    <ResultGrid>
      {specimens.map((specimen) => (
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
