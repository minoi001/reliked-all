import {
  useRefinementList,
  Highlight,
  ClearRefinements,
} from "react-instantsearch";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "../AlgoliaDropdownMenu";

const RefinementList = ({
  attribute,
  items,
  isFromSearch,
  refine,
  format,
  title,
}) => {
  const dropdownsRef = useRef(null);
  const handleClickOutside = (event) => {
    if (dropdownsRef.current && !dropdownsRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const [isRefined, setIsRefined] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const refinedItems = items.filter((item) => item.isRefined);
    setIsRefined(refinedItems.length > 0);
    // Add event listener when the component mounts
    document.addEventListener("click", handleClickOutside);
    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [items, setIsRefined]);

  const handleRefine = (value) => {
    refine(value);
  };

  return (
    <div ref={dropdownsRef}>
      <div
        type="button"
        className={`m-1 text-black ${
          isRefined ? "bg-taupe" : "bg-white"
        } hover:bg-cream hover:text-white font-medium text-sm py-2.5 p-4 text-center inline-flex justify-between rounded-none border border-cream ${
          format === "row" ? "" : "w-full"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        {isRefined ? (
          <div className={"px-1"}>
            <ClearRefinements
              includedAttributes={[attribute]}
              translations={{
                resetButtonText: "✕",
              }}
            />
          </div>
        ) : (
          <ChevronDown />
        )}
      </div>
      {isOpen && (
        <ul
          className={`${
            format === "row" ? "absolute" : ""
          } bg-cream rounded-none p-4 overflow-auto min-h-min m-1 mt-0`}
        >
          {items.map((item) => {
            return (
              <li
                key={item.label}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={item.isRefined}
                    onChange={() => handleRefine(item.value)}
                    className="h-4 w-4 bg-taupe focus:ring-rose cursor-pointer"
                    style={{ backgroundColor: item.isRefined ? "#EC516B" : "" }}
                  />
                  <span
                    style={{ fontWeight: item.isRefined ? "bold" : "" }}
                    className="cursor-pointer"
                  >
                    {isFromSearch ? (
                      <Highlight
                        attribute="label"
                        hit={item}
                        className="cursor-pointer"
                      />
                    ) : (
                      getItemLabel(item)
                    )}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

function getItemLabel(item) {
  if (item && item.label) {
    if (item.label.includes(" - ")) {
      return item.label.split(" - ")[1];
    } else {
      return item.label;
    }
  }

  return "";
}

export const CustomRefinementList = (props) => {
  const refinementBox = useRefinementList(props);
  return (
    <RefinementList
      {...refinementBox}
      format={props.format}
      title={props.title}
      attribute={props.attribute}
    />
  );
};
