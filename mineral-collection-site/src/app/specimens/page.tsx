import Link from "next/link";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/live";
import { Specimen } from "@/sanity/types";

const SPECIMENS_QUERY = defineQuery(`*[
  _type == "specimen"
  && defined(slug.current)
]{_id, name, slug}|order(name desc)`);

export default async function SpecimensPage() {
  const { data: specimens } = await sanityFetch({ query: SPECIMENS_QUERY });

  return (
    <main>
      <h1>Specimens</h1>
      <ul>
        {specimens.map((specimen: Specimen) => (
          <li key={specimen._id}>
            <Link href={`/specimens/${specimen?.slug?.current}`}>
              <h2>{specimen?.name}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
