import { useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

function CollectionFilters({ updateCollections, collectionType }) {
  // const [searchQuery, setSearchQuery] = useState("");

  return (
    // <div className="flex flex-wrap justify-center items-center space-y-1 lg:flex-nowrap">
    <div className="inline pb-4 flex justify-between ">
      <Dropdown
        updateCollections={updateCollections}
        collectionType={collectionType}
      />

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
      {/*  Instead of having a second search bar here, what do you think about having the main search bar at the top return results re: the collections*/}
      {/*<button className="m-1 text-black bg-offWhite hover:bg-cream hover:text-almostBlack font-medium text-sm px-4 py-2.5 text-center inline-flex items-center cursor-default focus-within:bg-cream">*/}
      {/*  <div className="inline">*/}
      {/*    <MagnifyingGlassIcon className="text-black w-4 h-4 inline -mt-0.5" />*/}
      {/*    <input*/}
      {/*      placeholder="Search..."*/}
      {/*      value={searchQuery}*/}
      {/*      className="text-black hover:text-almostBlack font-medium text-sm text-left pl-2 w-auto inline-block focus:outline-none bg-inherit"*/}
      {/*      onChange={(e) => setSearchQuery(e.target.value)}*/}
      {/*    />*/}
      {/*    {searchQuery && (*/}
      {/*      <XMarkIcon*/}
      {/*        className="text-black w-4 h-4 inline -mt-0.5"*/}
      {/*        onClick={() => setSearchQuery("")}*/}
      {/*      />*/}
      {/*    )}*/}
      {/*  </div>*/}
      {/*</button>*/}
    </div>
  );
}

function Dropdown({ updateCollections, collectionType }) {
  const [isOpen, setIsOpen] = useState(false);
  const bgColour = (type) => {
    return collectionType === type ? "bg-taupe" : "bg-offWhite hover:bg-cream";
  };
  return (
    <div className="relative inline-block left">
      <div>
        <button
          type="button"
          className="inline-flex w-40 justify-center gap-x-1.5 bg-offWhite px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-beige"
          id="menu-button"
          onClick={() => setIsOpen(!isOpen)}
        >
          Shop by
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
