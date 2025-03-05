import Link from "next/link";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/live";
import { Mineral } from "@/sanity/types";

const MINERALS_QUERY = defineQuery(`*[
  _type == "mineral"
  && defined(slug.current)
]{_id, name, slug}|order(name desc)`);

export default async function MineralsPage() {
  const { data: specimens } = await sanityFetch({ query: MINERALS_QUERY });

  return (
    <main>
      <h1>Minerals</h1>
      <ul>
        {specimens.map((mineral: Mineral) => (
          <li key={mineral._id}>
            <Link href={`/minerals/${mineral?.slug?.current}`}>
              <h2>{mineral?.name}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
