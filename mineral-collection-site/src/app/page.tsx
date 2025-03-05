import Link from "next/link";
export default async function IndexPage() {
  return (
    <main>
      <h1>Mineral Collection</h1>
      <Link href={`/specimens`}>
        <h2>Specimens</h2>
      </Link>
      <Link href={`/minerals`}>
        <h2>Minerals</h2>
      </Link>
    </main>
  );
}
