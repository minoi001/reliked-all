import React, { useEffect, useRef, useState } from "react";
import { useSortBy } from "react-instantsearch";
import { ChevronDown, Cross } from "../AlgoliaDropdownMenu";

function CustomSortBy(props) {
  const dropdownsRef = useRef(null);
  const handleClickOutside = (event) => {
    if (dropdownsRef.current && !dropdownsRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const { currentRefinement, options, refine } = useSortBy(props);
  function handleClick(option) {
    refine(option.value);
  }
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div ref={dropdownsRef}>
      <button
        type="button"
        className={`m-1 text-black  hover:bg-cream hover:text-white font-medium text-sm py-2.5 p-4 text-center inline-flex items-center rounded-none border border-cream`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {props.title}
        <ChevronDown />
      </button>
      {isOpen && (
        <ul className="absolute bg-cream rounded-none py-4 overflow-auto min-h-min">
          {options.map((option, i) => {
            return (
              <li
                key={i}
                className={`flex items-center space-x-2 px-4 py-2 cursor-pointer ${
                  option.value === currentRefinement ? "bg-taupe" : "bg-cream"
                }`}
                onClick={() => handleClick(option)}
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default CustomSortBy;
