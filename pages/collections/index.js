import { getCollections } from "../../lib/shopify";
import Link from "next/link";

export default function Collections({ collections }) {
  return (
    <>
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">
        Shop by Influencer
      </h1>
      <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 z-0">
        {collections.map((collection, i) => {
          return (
            <Link key={i} href={`collections/${collection.node.handle}`}>
              <img src={collection?.node?.image?.src} />
              <p>{collection?.node?.title}</p>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const collections = await getCollections();
  console.log("//collec", collections);
  return {
    props: { collections },
  };
}
