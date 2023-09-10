import React from "react";
import { useSortBy } from "react-instantsearch";

function CustomSortBy(props) {
  const { currentRefinement, options, refine } = useSortBy(props);
  function handleClick(option) {
    refine(option.value);
  }

  return (
    <>
      <ul className="absolute bg-cream rounded-none py-4 overflow-auto min-h-min">
        {options.map((option, i) => {
          return (
            <li
              key={i}
              className={`flex items-center space-x-2 px-4 py-2 ${
                option.value === currentRefinement ? "bg-taupe" : "bg-cream"
              }`}
              onClick={() => handleClick(option)}
            >
              {option.label}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default CustomSortBy;
