import { getCollections } from "../../lib/shopify";

export default function Collections({ collections }) {
  return (
    <>
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">
        Shop by Influencer
      </h1>
      <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 z-0">
        {collections.map((collection, i) => (
          <div key={i}>
            <img src={collection?.node?.image?.src} />
            <p>{collection?.node?.title}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const collections = await getCollections();

  return {
    props: { collections },
  };
}
