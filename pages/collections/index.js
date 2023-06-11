import { getCollections } from "../../lib/shopify";
import Link from "next/link";
import { useState } from "react";

export default function Collections({ vendorsCollections }) {
  // Filters: all, women, men, beauty, luxury ... metafields
  const [collectionsDisplayed, setCollectionDisplayed] =
    useState(vendorsCollections);
  async function updateCollections(collectionType) {
    const collectionsByType = await getCollections(collectionType);
    setCollectionDisplayed(collectionsByType);
  }

  return (
    <>
      <Dropdown updateCollections={updateCollections} />
      <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 z-0">
        {collectionsDisplayed.map((collection, i) => {
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
  const vendorsCollections = await getCollections("Vendor");
  return {
    props: { vendorsCollections },
  };
}

function Dropdown({ updateCollections }) {
  return (
    <>
      <button
        id="dropdownDefaultButton"
        className="text-white bg-rose hover:bg-pink-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center "
        type="button"
        onClick={() => {
          const dropdown = document.getElementById("dropdown");
          dropdown.classList.toggle("hidden");
        }}
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
      <div
        id="dropdown"
        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
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
    </>
  );
}
