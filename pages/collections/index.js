import { useState } from "react";
import {
  Configure,
  Hits,
  InstantSearch,
  Pagination,
  SearchBox,
} from "react-instantsearch-dom";
import { indexNames, searchClient } from "../../algoliaConfig";
import Link from "next/link";
import CollectionFilters from "../../components/Filters/CollectionFilters";
import { Search } from "../../components/Header/Search";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: "italic",
  weight: "700",
});
export default function Collections() {
  const [collectionType, setCollectionType] = useState("vendor");
  async function updateCollections(collectionType) {
    setCollectionType(collectionType);
  }

  const searchParameters = {
    // query: "",
    filters: `meta.custom_fields.collection_type:'${collectionType}'`,
  };

  return (
    <div className="mx-auto my-4 max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* <div className="grid px-6 sm:px-12 align-middle p-2 w-full bg-white shadow-lg"> */}
      <div className="sm:px-12 align-middle p-2 w-full bg-white shadow-lg">
        <h1 className={`${playfair.className} p-4 text-3xl text-center`}>
          Shop by {collectionHeader(collectionType)}
        </h1>

        <InstantSearch
          searchClient={searchClient}
          indexName={indexNames.collections}
        >
          <CollectionFilters
            updateCollections={updateCollections}
            collectionType={collectionType}
          />
          <Configure {...searchParameters} />
          <Hits hitComponent={Hit} />
          <div className="py-12 md:p-12">
            <Pagination
              translations={{
                previous: "Previous",
                next: "Next",
                first: "First",
                last: "Last",
                page(currentRefinement) {
                  return currentRefinement;
                },
              }}
              hitsPerPage={24}
              showLast={true}
            />
          </div>
        </InstantSearch>
      </div>
    </div>
  );
}

function Hit({ hit }) {
  return (
    <Link href={`collections/${hit.handle}`}>
      {hit.meta?.custom_fields?.collection_type?.includes("Vendor") && (
        <img src={hit.image} />
      )}
      <p>{hit.title}</p>
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
