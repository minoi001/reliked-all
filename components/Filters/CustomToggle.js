import { connectToggleRefinement } from "react-instantsearch-dom";

const ToggleRefinement = ({
  currentRefinement,
  label,
  count,
  refine,
  createURL,
}) => (
  <label className="flex items-center cursor-pointer justify-center">
    <span className="mr-2">{label}</span>
    <div
      className={`w-16 h-8 rounded-full ${
        currentRefinement ? "bg-teal-500" : "bg-red-500"
      }`}
      onClick={(event) => {
        event.preventDefault();
        refine(!currentRefinement);
      }}
    >
      <div
        className={`w-6 h-6 bg-white rounded-full shadow-md transform duration-300 ease-in-out ${
          currentRefinement ? "translate-x-8" : "translate-x-1"
        }`}
      />
    </div>
    <span className="ml-2">
      {/*  Not working yet! */}
      {currentRefinement ? `(${count.checked})` : `(${count.unchecked})`}
    </span>
  </label>
);

export const CustomToggleRefinement = connectToggleRefinement(ToggleRefinement);
