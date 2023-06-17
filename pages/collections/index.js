import Link from "next/link";
import { useState } from "react";
import { Configure, Hits, InstantSearch } from "react-instantsearch-dom";
import { indexNames, searchClient } from "../../algoliaConfig";

export default function Collections({ vendorsCollections }) {
  // Filters: all, women, men, beauty, luxury ... metafields
  const [collectionType, setCollectionType] = useState("vendor");
  async function updateCollections(collectionType) {
    setCollectionType(collectionType);
  }

  const searchParameters = {
    query: "",
    filters: `meta.custom_fields.collection_type:'${collectionType}'`,
  };

  return (
    <>
      <Dropdown updateCollections={updateCollections} />
      <InstantSearch
        searchClient={searchClient}
        indexName={indexNames.collections}
      >
        <Configure {...searchParameters} />
        <Hits hitComponent={Hit} />
      </InstantSearch>
    </>
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

function Dropdown({ updateCollections }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  return (
    <div className="relative">
      <button
        id="dropdownDefaultButton"
        className="text-white bg-rose hover:bg-pink-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center  items-center"
        type="button"
        onClick={toggleOpen}
      >
        Shop By
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
      {isOpen && (
        <div
          id="dropdown"
          className="absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            <li className="hover:bg-gray-600">
              <button
                className=" px-4 py-2 text-left w-full"
                onClick={() => updateCollections("Vendor")}
              >
                Influencer
              </button>
            </li>
            <li className="hover:bg-gray-600">
              <button
                className=" px-4 py-2 text-left w-full"
                onClick={() => updateCollections("Brand")}
              >
                Brand
              </button>
            </li>
            <li className="hover:bg-gray-600">
              <button
                className=" px-4 py-2 text-left w-full"
                onClick={() => updateCollections("Size")}
              >
                Size
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
