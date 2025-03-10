import Link from "next/link";
import ImageHeader from "./_shared/components/imageHeader/imageHeader";
export default async function IndexPage() {
  return (
    <main>
      <ImageHeader title="Mineral Collection" imageUrl="/preview.jpeg" alt="">
        <Link href={`/specimens`}>
          <h2>Specimens</h2>
        </Link>
        <Link href={`/minerals`}>
          <h2>Minerals</h2>
        </Link>
        <Link href={`/rocks`}>
          <h2>Rocks</h2>
        </Link>
      </ImageHeader>
    </main>
  );
}
