import React from "react";
import { useSortBy } from "react-instantsearch";

function CustomSortBy(props) {
  const { currentRefinement, options, refine } = useSortBy(props);

  return (
    <>
      <ul className="absolute bg-cream rounded-none p-4 overflow-auto min-h-min">
        {options.map((option, i) => {
          return (
            <li
              key={i}
              className="flex items-center space-x-2"
              onClick={() => refine(option.value)}
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
