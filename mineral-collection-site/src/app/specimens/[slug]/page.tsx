import { sanityFetch } from "@/sanity/live";
import { SPECIMEN_QUERYResult } from "@/sanity/types";
import { defineQuery, PortableText } from "next-sanity";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./styles.module.css";
import ImageHeader from "@/app/_shared/components/imageHeader/imageHeader";
import { urlFor } from "@/app/_shared/utils/urlService";
import Property from "@/app/_shared/components/propertyList/property/property";
import PropertyList from "@/app/_shared/components/propertyList/propertyList";
import BackLink from "@/app/_shared/components/backLink/backLink";
import ImageGallery from "@/app/_shared/components/imageGallery/imageGallery";

const SPECIMEN_QUERY = defineQuery(`*[
    _type == "specimen" &&
    slug.current == $slug
  ][0]{
  ...,
  minerals[]->{name, _id, slug, previewImage},
  rocks[]->{name, _id, slug, previewImage}
}`);

export default async function SpecimenPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const result = await sanityFetch({
    query: SPECIMEN_QUERY,
    params: await params,
  });
  const specimen = result?.data as SPECIMEN_QUERYResult;
  if (!specimen) {
    notFound();
  }
  const imageUrl = specimen.previewImage
    ? urlFor(specimen.previewImage)?.url()
    : undefined;

  return (
    <main className={styles.container}>
      <BackLink title="Back to Specimens" href="/specimens" />
      <ImageHeader title={`${specimen.name} - #${specimen.numericId}`} imageUrl={imageUrl} alt={specimen.name || "Specimen"}>
        <PropertyList>
          <Property title="Classifications">
            <ul className={styles.minerals}>
              {specimen.minerals &&
                specimen.minerals?.map((mineral) => (
                  <li
                    key={mineral._id}>
                    <Link
                      key={mineral.slug?.current}
                      href={`/minerals/${mineral.slug?.current}`}
                    >
                      {mineral.name}
                    </Link>
                  </li>
                ))}
              {specimen.rocks &&
                specimen.rocks?.map((rock) => (
                  <li
                    key={rock._id}>
                    <Link
                      key={rock.slug?.current}
                      href={`/rocks/${rock.slug?.current}`}
                    >
                      {rock.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </Property>
          {specimen.origin &&
            <Property title="Origin">
              {specimen.origin || '---'}
            </Property>
          }
          {specimen.sizeCategory &&
            <Property title="Size Category">
              {specimen.sizeCategory || '---'}
            </Property>
          }
          {specimen.size &&
            <Property title="Size">
              {`${specimen.size} centimeters`}
            </Property>
          }
          {specimen.weight &&
            <Property title="Weight">
              {`${specimen.weight} grams`}
            </Property>
          }
        </PropertyList>
      </ImageHeader>
      <div className={styles.additionalProperties}>
        <div className={styles.metadataSection}>
          <PropertyList spacing={.5}>
            <Property title="Created At">
              {specimen._createdAt || '---'}
            </Property>
            <Property title="Updated At">
              {specimen._updatedAt || '---'}
            </Property>
            <Property title="Hesitant Id">
              {specimen.hesitantId?.toString() || '---'}
            </Property>
            <Property title="Shape">
              {specimen.shape || '---'}
            </Property>
            <Property title="Colors">
              {specimen.colors || '---'}
            </Property>
            <Property title="Artificially Modified">
              {specimen.artificiallyModified?.toString() || '---'}
            </Property>
            <Property title="Man Made">
              {specimen.manMade?.toString() || '---'}
            </Property>
            <Property title="Tags">
              {specimen.tags || '---'}
            </Property>
          </PropertyList>
        </div>
        <div className={styles.metadataSection}>
          <PropertyList spacing={.5}>
            <Property title="Price">
              {specimen.price || '---'}
            </Property>
            <Property title="Exact Price">
              {specimen.exactPrice?.toString() || '---'}
            </Property>
            <Property title="Purchase Date">
              {specimen.purchaseDate || '---'}
            </Property>
            <Property title="Purchase Source">
              {specimen.purchaseSource || '---'}
            </Property>
            <Property title="Purchase Listing">
              {specimen.purchaseListing || '---'}
            </Property>
          </PropertyList>
        </div>
      </div>
      <div className={styles.notes}>
        {specimen.notes && specimen.notes.length > 0 && (
          <div>
            <PortableText value={specimen.notes} />
          </div>
        )}
      </div>
      {specimen.images && specimen.images.length > 0 &&
          <ImageGallery images={specimen.images} />}
    </main>
  );
}
