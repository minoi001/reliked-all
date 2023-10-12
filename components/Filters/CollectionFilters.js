import { useState } from "react";
import { collectionHeader } from "../../pages/collections";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

function CollectionFilters({ updateCollections, collectionType }) {
  return (
    <div className="inline flex justify-end items-center">
      <Dropdown
        updateCollections={updateCollections}
        collectionType={collectionType}
      />
    </div>
  );
}

function Dropdown({ updateCollections, collectionType }) {
  const [isOpen, setIsOpen] = useState(false);

  const bgColour = (type) => {
    return collectionType === type ? "bg-taupe" : "bg-offWhite hover:bg-cream";
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    updateCollections(option);
    setIsOpen(false);
  };

  return (
    <div className="relative text-center">
      <button
        onClick={handleToggle}
        className="inline-flex font-h text-3xl pl-1 items-center text-rose"
      >
        {collectionType === "vendor"
          ? "Influencers"
          : collectionType === "brand"
          ? "Brands"
          : "Sizes"}
        <ChevronDownIcon className="flex w-5 h-5 p-1" />
      </button>

      <p className="text-center">
        Can we please make this text and the title above centered
      </p>

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
              onClick={() => handleOptionClick("vendor")}
            >
              Influencers
            </li>
            <li
              className={`text-almostBlack block px-4 py-2 text-sm ${bgColour(
                "brand"
              )}`}
              role="menuitem"
              onClick={() => handleOptionClick("brand")}
            >
              Brands
            </li>
            <li
              className={`text-almostBlack block px-4 py-2 text-sm ${bgColour(
                "size"
              )}`}
              role="menuitem"
              onClick={() => handleOptionClick("size")}
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
