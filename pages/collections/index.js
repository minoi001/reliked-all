import { getCollections } from "../../lib/shopify";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Collections({ influencersCollections }) {
  const [searchQuery, setSearchQuery] = useState("");

  const [influencerCollections, setInfluencerCollections] = useState([]);
  const [brandCollections, setBrandCollections] = useState([]);
  const [sizeCollections, setSizeCollections] = useState([]);
  const [collectionsTypeDisplayed, setCollectionsTypeDisplayed] =
    useState("Influencer");
  // Filters: all, women, men, beauty, luxury ... metafields
  const [collectionsDisplayed, setCollectionDisplayed] = useState(
    influencersCollections
  );

  async function updateCollections(collectionType) {
    setCollectionsTypeDisplayed(collectionType);
    let collectionsByType = "";
    if (collectionType === "Influencer") {
      setCollectionDisplayed(influencerCollections);
      collectionsByType = await getCollections("Vendor");
    } else if (collectionType === "Brand") {
      setCollectionDisplayed(brandCollections);
      collectionsByType = await getCollections("Brand");
    } else if (collectionType === "Size") {
      setCollectionDisplayed(sizeCollections);
      collectionsByType = await getCollections("Size");
    }
    setCollectionDisplayed(collectionsByType);
  }

  useEffect(() => {
    async function getAllCollections() {
      const influencerCollectionsReq = await getCollections("Vendor");
      setInfluencerCollections(influencerCollectionsReq);
      const brandCollectionsReq = await getCollections("Brand");
      setBrandCollections(brandCollectionsReq);
      const sizeCollectionsReq = await getCollections("Size");
      setSizeCollections(sizeCollectionsReq);
    }
    getAllCollections();
  }, []);

  return (
    <div className="mx-auto my-4 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid px-6 sm:px-12 place-items-center align-middle p-2 w-full bg-white shadow-lg">
        <h1 className="p-4 text-3xl">Shop by {collectionsTypeDisplayed}</h1>
        <div className="inline pb-4 items-center m-auto">
          <div className="lg:inline place-items-center align-middle">
            {/* Want these to be centred on mobile as well  */}
            <button
              className={
                collectionsTypeDisplayed === "Influencer"
                  ? "m-1 text-white bg-almostBlack hover:bg-black font-medium text-sm px-4 py-2.5 text-center inline-flex items-center"
                  : "m-1 text-black bg-cream hover:bg-taupe hover:text-white font-medium text-sm px-4 py-2.5 text-center inline-flex items-center"
              }
              onClick={() => updateCollections("Influencer")}
            >
              Influencers
            </button>
            <button
              className={
                collectionsTypeDisplayed === "Brand"
                  ? "m-1 text-white bg-almostBlack hover:bg-black font-medium text-sm px-4 py-2.5 text-center inline-flex items-center"
                  : "m-1 text-black bg-cream hover:bg-taupe hover:text-white font-medium text-sm px-4 py-2.5 text-center inline-flex items-center"
              }
              onClick={() => updateCollections("Brand")}
            >
              Brands
            </button>
            <button
              className={
                collectionsTypeDisplayed === "Size"
                  ? "m-1 text-white bg-almostBlack hover:bg-black font-medium text-sm px-4 py-2.5 text-center inline-flex items-center"
                  : "m-1 text-black bg-cream hover:bg-taupe hover:text-white font-medium text-sm px-4 py-2.5 text-center inline-flex items-center"
              }
              onClick={() => updateCollections("Size")}
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
        {/* <Dropdown className="pb-12" updateCollections={updateCollections} /> */}
        <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-6 xl:gap-x-8 static">
          {collectionsDisplayed.map((collection, i) => {
            return (
              <Link key={i} href={`collections/${collection.node.handle}`}>
                <Image
                  className="static object-cover"
                  src={collection?.node?.image?.src}
                  width="600"
                  height="600"
                  alt={collection?.node?.title}
                />
                <p>{collection?.node?.title}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const influencersCollections = await getCollections("Vendor");
  return {
    props: { influencersCollections },
  };
}

function Dropdown({ updateCollections }) {
  return (
    <>
      <button
        id="dropdownDefaultButton"
        className="text-white bg-rose hover:bg-pink-800 font-medium text-sm px-4 py-2.5 text-center inline-flex items-center "
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
        className="hidden bg-white divide-y divide-gray-100 shadow w-44 dark:bg-gray-700"
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          <li className="hover:bg-gray-600">
            <button
              className=" px-4 py-2 text-left w-full"
              onClick={() => updateCollections("Influencer")}
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
