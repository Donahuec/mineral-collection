import Link from "next/link";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/live";
import { Specimen } from "@/sanity/types";

const SPECIMENS_QUERY = defineQuery(`*[
  _type == "specimen"
  && defined(slug.current)
]{_id, name, slug}|order(name desc)`);

export default async function IndexPage() {
  const { data: specimens } = await sanityFetch({ query: SPECIMENS_QUERY });

  return (
    <main className="flex bg-gray-100 min-h-screen flex-col p-24 gap-12">
      <h1 className="text-4xl font-bold tracking-tighter">Specimens</h1>
      <ul className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {specimens.map((specimen: Specimen) => (
          <li className="bg-white p-4 rounded-lg" key={specimen._id}>
            <Link
              className="hover:underline"
              href={`/specimens/${specimen?.slug?.current}`}>
              <h2 className="text-xl font-semibold">{specimen?.name}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
