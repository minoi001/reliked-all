import { getCollections } from "../../lib/shopify";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";

export default function Collections({ vendorsCollections }) {
  const [vendorCollections, setVendorCollections] = useState([]);
  const [brandCollections, setBrandCollections] = useState([]);
  const [sizeCollections, setSizeCollections] = useState([]);
  const [collectionsTypeDisplayed, setCollectionsTypeDisplayed] =
    useState("Vendor");
  // Filters: all, women, men, beauty, luxury ... metafields
  const [collectionsDisplayed, setCollectionDisplayed] =
    useState(vendorsCollections);

  async function updateCollections(collectionType) {
    setCollectionsTypeDisplayed(collectionType);
    if (collectionType === "Vendor") {
      setCollectionDisplayed(vendorCollections);
    } else if (collectionType === "Brand") {
      setCollectionDisplayed(brandCollections);
    } else if (collectionType === "Size") {
      setCollectionDisplayed(sizeCollections);
    }
    const collectionsByType = await getCollections(collectionType);
    setCollectionDisplayed(collectionsByType);
  }

  useEffect(() => {
    async function getAllCollections() {
      const vendorCollectionsReq = await getCollections("Vendor");
      setVendorCollections(vendorCollectionsReq);
      const brandCollectionsReq = await getCollections("Brand");
      setBrandCollections(brandCollectionsReq);
      const sizeCollectionsReq = await getCollections("Size");
      setSizeCollections(sizeCollectionsReq);
    }
    getAllCollections();
  }, []);

  return (
    <div className="shadow-lg mx-4 my-1 lg:mx-12 lg:my-6">
      <div className="grid px-6 sm:px-12 place-items-center align-middle p-2 w-full bg-white">
        <h1 className="p-2">Shop by</h1>
        <div className="inline pb-4">
          <button
            className={
              collectionsTypeDisplayed === "Vendor"
                ? "m-1 text-white bg-almostBlack hover:bg-black font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
                : "m-1 text-black bg-cream hover:bg-taupe hover:text-white font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
            }
            onClick={() => updateCollections("Vendor")}
          >
            Influencers
          </button>
          <button
            className={
              collectionsTypeDisplayed === "Brand"
                ? "m-1 text-white bg-almostBlack hover:bg-black font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
                : "m-1 text-black bg-cream hover:bg-taupe hover:text-white font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
            }
            onClick={() => updateCollections("Brand")}
          >
            Brands
          </button>
          <button
            className={
              collectionsTypeDisplayed === "Size"
                ? "m-1 text-white bg-almostBlack hover:bg-black font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
                : "m-1 text-black bg-cream hover:bg-taupe hover:text-white font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
            }
            onClick={() => updateCollections("Size")}
          >
            Sizes
          </button>
        </div>
        {/* <Dropdown className="pb-12" updateCollections={updateCollections} /> */}
        <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-6 xl:gap-x-8 z-0">
          {collectionsDisplayed.map((collection, i) => {
            return (
              <Link key={i} href={`collections/${collection.node.handle}`}>
                <img src={collection?.node?.image?.src} />
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
