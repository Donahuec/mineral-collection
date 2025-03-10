import { sanityFetch } from "@/sanity/live";
import { SPECIMEN_QUERYResult } from "@/sanity/types";
import { defineQuery, PortableText } from "next-sanity";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./styles.module.css";
import ImageHeader from "@/app/_shared/components/imageHeader/imageHeader";
import { title } from "process";
import Image from "next/image";
import { urlFor } from "@/app/_shared/utils/urlService";

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
      <div>
        <Link href="/specimens">← Back to Specimens</Link>
      </div>
      <ImageHeader title={`${specimen.name} - #${specimen.numericId}`} imageUrl={imageUrl} alt={specimen.name || "Specimen"}>
        <dl className={styles.primaryProperties}>
          <div className={styles.property}>
            <dt className={styles.label}>Classifications:</dt>
            <dd>
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
            </dd>
          </div>
          {specimen.origin &&
            <div className={styles.property}>
              <dt className={styles.label}>Origin:</dt>
              <dd>{specimen.origin || '---'}</dd>
            </div>
          }
          {specimen.sizeCategory &&
            <div className={styles.property}>
              <dt className={styles.label}>Size Category:</dt>
              <dd>{specimen.sizeCategory || '---'}</dd>
            </div>
          }

          {specimen.size &&
            <div className={styles.property}>
              <dt className={styles.label}>Size:</dt>
              <dd>
                {`${specimen.size} centimeters`}
              </dd>
            </div>
          }
          {specimen.weight &&
            <div className={styles.property}>
              <dt className={styles.label}>Weight:</dt>
              <dd>{`${specimen.weight} grams`}</dd>
            </div>
          }
        </dl>
      </ImageHeader>
      <div className={styles.additionalProperties}>
        <div className={styles.metadataSection}>
          <dl className={styles.properties}>
            <div className={styles.property}>
              <dt className={styles.label}>Created At:</dt>
              <dd>{specimen._createdAt || '---'}</dd>
            </div>
            <div className={styles.property}>
              <dt className={styles.label}>Updated At:</dt>
              <dd>{specimen._createdAt || '---'}</dd>
            </div>
            <div className={styles.property}>
              <dt className={styles.label}>Hesitant Id:</dt>
              <dd>{specimen.hesitantId?.toString() || '---'}</dd>
            </div>
            <div className={styles.property}>
              <dt className={styles.label}>Shape:</dt>
              <dd>{specimen.shape || '---'}</dd>
            </div>

            <div className={styles.property}>
              <dt className={styles.label}>Colors:</dt>
              <dd>{specimen.colors || '---'}</dd>
            </div>

            <div className={styles.property}>
              <dt className={styles.label}>Artificially Modified:</dt>
              <dd>{specimen.artificiallyModified?.toString() || '---'}</dd>
            </div>
            <div className={styles.property}>
              <dt className={styles.label}>Man Made:</dt>
              <dd>{specimen.manMade?.toString() || '---'}</dd>
            </div>
          </dl>
        </div>
        <div className={styles.metadataSection}>
          <dl>
            <div className={styles.property}>
              <dt className={styles.label}>Price:</dt>
              <dd>{specimen.price || '---'}</dd>
            </div>
            <div className={styles.property}>
              <dt className={styles.label}>Exact Price:</dt>
              <dd>{specimen.exactPrice?.toString() || '---'}</dd>
            </div>
            <div className={styles.property}>
              <dt className={styles.label}>Purchase Date:</dt>
              <dd>{specimen.purchaseDate || '---'}</dd>
            </div>
            <div className={styles.property}>
              <dt className={styles.label}>Purchase Source:</dt>
              <dd>{specimen.purchaseSource || '---'}</dd>
            </div>
            <div className={styles.property}>
              <dt className={styles.label}>Purchase Listing:</dt>
              <dd>{specimen.purchaseListing || '---'}</dd>
            </div>
            <div className={styles.property}>
              <dt className={styles.label}>Tags:</dt>
              <dd>{specimen.tags || '---'}</dd>
            </div>
          </dl>
        </div>
      </div>
      <div className={styles.notes}>
        {specimen.notes && specimen.notes.length > 0 && (
          <div>
            <PortableText value={specimen.notes} />
          </div>
        )}
      </div>
      <div className={styles.imageGrid}>
        {specimen.images && specimen.images.length > 0 &&
          specimen.images?.map((image) => (
            <Image
              src={urlFor(image, 600, 600)?.url() || "https://placehold.co/300x300/png"}
              alt={title}
              className={styles.image}
              width={300}
              height={300}
              key={image._key}
            />
          ))}
      </div>

    </main>
  );
}
