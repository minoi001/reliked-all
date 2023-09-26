import { useState } from "react";
import {
  Configure,
  Hits,
  InstantSearch,
  Pagination,
} from "react-instantsearch";
import { indexNames, searchClient } from "../../algoliaConfig";
import Link from "next/link";
import CollectionFilters from "../../components/Filters/CollectionFilters";
import Head from "next/head";
import { indexToRoute, routeToIndex } from "../_app";

export default function Collections() {
  const [collectionType, setCollectionType] = useState("vendor");
  async function updateCollections(collectionType) {
    setCollectionType(collectionType);
  }

  const searchParameters = {
    filters: `meta.custom_fields.collection_type:'${collectionType}'`,
  };

  return (
    <div className="mx-auto my-4 max-w-7xl px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Collections</title>
      </Head>
      <div className="sm:px-12 align-middle p-2 w-full bg-white shadow-lg">
        <h1 className={`font-h p-4 text-3xl text-center`}>
          Shop by {collectionHeader(collectionType)}
        </h1>

        <InstantSearch
          searchClient={searchClient}
          indexName={indexNames.collections}
          insights={true} //TODO: Replace by cookie consent
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
              // hitsPerPage={24}
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
        <img src={hit.image} alt={hit.handle} className="aspect-1" />
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
