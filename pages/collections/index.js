import { useState } from "react";
import { Configure, Hits, InstantSearch } from "react-instantsearch-dom";
import { indexNames, searchClient } from "../../algoliaConfig";
import Link from "next/link";
import CollectionFilters from "../../components/Filters/CollectionFilters";

export default function Collections() {
  const [collectionType, setCollectionType] = useState("vendor");
  async function updateCollections(collectionType) {
    setCollectionType(collectionType);
  }

  const searchParameters = {
    // query: "",
    filters: `meta.custom_fields.collection_type:'${collectionType}'`,
  };

  function capitaliseFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  const collectionHeader = (collectionType) => {
    switch (collectionType) {
      case "vendor":
        return "Influencer";

      default:
        return capitaliseFirstLetter(collectionType);
    }
  };

  return (
    <div className="mx-auto my-4 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid px-6 sm:px-12 align-middle p-2 w-full bg-white shadow-lg">
        <h1 className="p-4 text-3xl">
          Shop by {collectionHeader(collectionType)}
        </h1>
        <CollectionFilters
          updateCollections={updateCollections}
          collectionType={collectionType}
        />
        <InstantSearch
          searchClient={searchClient}
          indexName={indexNames.collections}
        >
          <Configure {...searchParameters} />
          <Hits hitComponent={Hit} />
        </InstantSearch>
      </div>
    </div>
  );
}

function Hit({ hit }) {
  return (
    <Link href={`collections/${hit.handle}`}>
      <img src={hit.image} />
      <p>{hit.title}</p>
    </Link>
  );
}
