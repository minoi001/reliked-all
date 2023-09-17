import { useToggleRefinement } from "react-instantsearch";
import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, Cross } from "../AlgoliaDropdownMenu";

export const CustomToggleRefinement = (props) => {
  const dropdownsRef = useRef(null);
  const handleClickOutside = (event) => {
    if (dropdownsRef.current && !dropdownsRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  const { value, refine } = useToggleRefinement({
    attribute: "inventory_available",
  });

  const [isRefined, setIsRefined] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    // Add event listener when the component mounts
    document.addEventListener("click", handleClickOutside);
    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    refine(value);
    console.log("value", value);
    setIsRefined(!value.isRefined);
  };
  const onClick = () => {
    refine(false);
    setIsRefined(false);
  };

  return (
    <div ref={dropdownsRef}>
      <button
        type="button"
        className={`m-1 text-black ${
          isRefined ? "bg-taupe" : "bg-white"
        } hover:bg-cream hover:text-white font-medium text-sm py-2.5 p-4 text-center inline-flex justify-between rounded-none border border-cream ${
          props.format === "row" ? "" : "w-full"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {props.title}
        {isRefined ? (
          <div onClick={onClick}>
            <Cross />
          </div>
        ) : (
          <ChevronDown />
        )}
      </button>
      {isOpen && (
        <div
          className={`${
            props.format === "row" ? "absolute" : ""
          } bg-cream rounded-none p-4 overflow-auto min-h-min w-130px m-1 mt-0`}
        >
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={value}
              onChange={handleToggle}
              className="h-4 w-4 bg-taupe focus:ring-rose flex items-center space-x-2"
              style={{
                backgroundColor: value.isRefined ? "#EC516B" : "",
              }}
            />
            <span
              className="ml-3 font-medium"
              style={{ fontWeight: value.isRefined ? "bold" : "" }}
            >
              In stock
            </span>
          </label>
        </div>
      )}
    </div>
  );
};
