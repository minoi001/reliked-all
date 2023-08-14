import { useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

function CollectionFilters({ updateCollections, collectionType }) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-wrap justify-center items-center space-y-1 lg:flex-nowrap pb-3">
      <button
        className={`m-1 text-${
          collectionType === "vendor" ? "white" : "black"
        } bg-${
          collectionType === "vendor" ? "almostBlack" : "cream"
        } hover:bg-${
          collectionType === "vendor" ? "black" : "taupe"
        } font-medium text-sm px-4 py-2.5 text-center inline-flex items-center`}
        onClick={() => updateCollections("vendor")}
      >
        Influencers
      </button>
      <button
        className={`m-1 text-${
          collectionType === "brand" ? "white" : "black"
        } bg-${collectionType === "brand" ? "almostBlack" : "cream"} hover:bg-${
          collectionType === "brand" ? "black" : "taupe"
        } font-medium text-sm px-4 py-2.5 text-center inline-flex items-center`}
        onClick={() => updateCollections("brand")}
      >
        Brands
      </button>
      <button
        className={`m-1 text-${
          collectionType === "size" ? "white" : "black"
        } bg-${collectionType === "size" ? "almostBlack" : "cream"} hover:bg-${
          collectionType === "size" ? "black" : "taupe"
        } font-medium text-sm px-4 py-2.5 text-center inline-flex items-center`}
        onClick={() => updateCollections("size")}
      >
        Sizes
      </button>
      <div className="flex flex-wrap justify-center items-center space-x-1">
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
          {searchQuery && (
            <XMarkIcon
              className="text-black w-4 h-4 inline -mt-0.5"
              onClick={() => setSearchQuery("")}
            />
          )}
        </div>
      </button>
    </div>
  );
}

export default CollectionFilters;
