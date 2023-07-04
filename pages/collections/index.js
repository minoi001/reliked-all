import { useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Configure, Hits, InstantSearch } from "react-instantsearch-dom";
import { indexNames, searchClient } from "../../algoliaConfig";
import Link from "next/link";

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

function CollectionFilters({ updateCollections, collectionType }) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="inline pb-4 items-center m-auto">
      <div className="lg:inline place-items-center align-middle">
        {/* Want these to be centred on mobile as well  */}
        <button
          className={
            collectionType === "vendor"
              ? "m-1 text-white bg-almostBlack hover:bg-black font-medium text-sm px-4 py-2.5 text-center inline-flex items-center"
              : "m-1 text-black bg-cream hover:bg-taupe hover:text-white font-medium text-sm px-4 py-2.5 text-center inline-flex items-center"
          }
          onClick={() => updateCollections("vendor")}
        >
          Influencers
        </button>
        <button
          className={
            collectionType === "brand"
              ? "m-1 text-white bg-almostBlack hover:bg-black font-medium text-sm px-4 py-2.5 text-center inline-flex items-center"
              : "m-1 text-black bg-cream hover:bg-taupe hover:text-white font-medium text-sm px-4 py-2.5 text-center inline-flex items-center"
          }
          onClick={() => updateCollections("brand")}
        >
          Brands
        </button>
        <button
          className={
            collectionType === "size"
              ? "m-1 text-white bg-almostBlack hover:bg-black font-medium text-sm px-4 py-2.5 text-center inline-flex items-center"
              : "m-1 text-black bg-cream hover:bg-taupe hover:text-white font-medium text-sm px-4 py-2.5 text-center inline-flex items-center"
          }
          onClick={() => updateCollections("size")}
        >
          Sizes
        </button>
      </div>
      <div className="lg:inline">
        <button className="m-1 text-black bg-offWhite hover:bg-cream hover:text-almostBlack font-medium text-sm px-4 py-2.5 text-center inline-flex items-center">
          Category
          <svg
            className="w-4 h-4 ml-2"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>
        <button className="m-1 text-black bg-offWhite hover:bg-cream hover:text-almostBlack font-medium text-sm px-4 py-2.5 text-center inline-flex items-center">
          Type
          <svg
            className="w-4 h-4 ml-2"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>
        <button className="m-1 text-black bg-offWhite hover:bg-cream hover:text-almostBlack font-medium text-sm px-4 py-2.5 text-center inline-flex items-center">
          Sort by
          <svg
            className="w-4 h-4 ml-2"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>
      </div>
      <button className="m-1 text-black bg-offWhite hover:bg-cream hover:text-almostBlack font-medium text-sm px-4 py-2.5 text-center inline-flex items-center cursor-default focus-within:bg-cream">
        <div className="inline">
          <MagnifyingGlassIcon className="text-black w-4 h-4 inline -mt-0.5" />
          <input
            placeholder="Search..."
            value={searchQuery}
            className="text-black hover:text-almostBlack font-medium text-sm text-left pl-2 w-auto inline-block focus:outline-none bg-inherit"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery ? (
            <XMarkIcon
              className="text-black w-4 h-4 inline -mt-0.5"
              onClick={() => setSearchQuery("")}
            />
          ) : (
            ""
          )}
        </div>
      </button>
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
