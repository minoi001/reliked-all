import { useState } from "react";
import { SearchBox } from 'react-instantsearch';
import { collectionHeader } from "../../pages/collections";

function CollectionFilters({ updateCollections, collectionType }) {
  return (
    <div className="inline pb-4 flex justify-between ">
      <Dropdown
        updateCollections={updateCollections}
        collectionType={collectionType}
      />
      <SearchBox />
    </div>
  );
}

function Dropdown({ updateCollections, collectionType }) {
  const [isOpen, setIsOpen] = useState(false);
  const bgColour = (type) => {
    return collectionType === type ? "bg-taupe" : "bg-offWhite hover:bg-cream";
  };
  return (
    <div className="flex flex-wrap justify-center items-center space-y-1 lg:flex-nowrap">
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
            className="-mr-1 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute z-10 mt-2 w-56 origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-labelledby="menu-button"
        >
          <ul className="py-1" role="none">
            <li
              className={`text-almostBlack block px-4 py-2 text-sm ${bgColour(
                "vendor"
              )}`}
              role="menuitem"
              onClick={() => updateCollections("vendor")}
            >
              Influencers
            </li>
            <li
              className={`text-almostBlack block px-4 py-2 text-sm ${bgColour(
                "brand"
              )}`}
              role="menuitem"
              onClick={() => updateCollections("brand")}
            >
              Brands
            </li>
            <li
              className={`text-almostBlack block px-4 py-2 text-sm ${bgColour(
                "size"
              )}`}
              role="menuitem"
              onClick={() => updateCollections("size")}
            >
              Sizes
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default CollectionFilters;
