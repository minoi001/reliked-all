import { useEffect, useState } from "react";
import { getCollections } from "../../algoliaConfig";
import Link from "next/link";
import CollectionFilters from "../../components/Filters/CollectionFilters";
import Head from "next/head";
import Image from "next/image";

export default function Collections() {
  const [collectionType, setCollectionType] = useState("vendor");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [maxPage, setMaxPage] = useState(0);
  async function updateCollections(collectionType) {
    setData([]);
    setCollectionType(collectionType);
  }

  function loadMore() {
    if (page < maxPage - 1) setPage(page + 1);
  }

  useEffect(() => {
    const fetchData = async () => {
      const { hits, nbPages } = await getCollections(collectionType, page);
      setData(data.concat(hits));
      setMaxPage(nbPages);
    };
    fetchData();
  }, [collectionType, page]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Collections</title>
      </Head>
      <div className="sm:px-12 align-middle p-2 w-full bg-white shadow-lg">
        <div className="flex justify-center align-middle">
          <div className="inline-flex py-4 text-center">
            <h1 className={`font-h text-3xl text-center`}>Shop by</h1>

            <CollectionFilters
              updateCollections={updateCollections}
              collectionType={collectionType}
            />
          </div>
        </div>
        {/*//TODO: Re-add the search bar*/}
        <div
          className={`
            grid grid-cols-2 ${
              collectionType === "vendor"
                ? "gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
                : ""
            }`}
        >
          {data.map((collection) => (
            <Hit hit={collection} key={collection.id} />
          ))}
        </div>
        {page < maxPage - 1 && (
          <div className={"w-full text-center p-4"}>
            <button
              className={
                "font-h text-2xl w-40 justify-center text-white bg-rose"
              }
              onClick={loadMore}
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Hit({ hit }) {
  return (
    <Link href={`collections/${hit.handle}`}>
      {hit.meta?.custom_fields?.collection_type?.includes("Vendor") && (
        <Image
          src={hit.image}
          alt={hit.handle.trim()}
          className="aspect-1"
          width="400"
          height="400"
        />
      )}
      {hit.meta?.custom_fields?.collection_type?.includes("Vendor") ? (
        <p>{hit.title}</p>
      ) : (
        <p className="text-2xl">{hit.title}</p>
      )}
    </Link>
  );
}

function capitaliseFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
export const collectionHeader = (collectionType) => {
  switch (collectionType) {
    case "vendor":
      return "Influencer";

    default:
      return capitaliseFirstLetter(collectionType);
  }
};
