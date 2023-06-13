import ProductCard from "../Products/ProductCard";
import {
  Hits,
  Pagination,
  RangeInput,
  RefinementList,
  connectStateResults,
} from "react-instantsearch-dom";
import { useState } from "react";
import MiniDropdownMenu from "../MiniDropdownMenu";
import AlgoliaDropdownMenu from "../AlgoliaDropdownMenu";

const ProductList = () => {
  return (
    <div className="mx-auto my-4 max-w-7xl px-4 sm:px-6 lg:px-8 ">
      <div className="grid px-6 sm:px-12 place-items-center align-middle p-2 w-full bg-white shadow-lg">
        <Filters />`{" "}
        <Results>
          <Hits hitComponent={ProductCard} />
        </Results>
        <div className="p-12">
          <Pagination />
        </div>
      </div>
    </div>
  );
};

const Results = connectStateResults(
  ({ searchState, searchResults, children }) =>
    searchResults && searchResults.nbHits !== 0 ? (
      children
    ) : (
      <div>No results have been found for {searchState.query}.</div>
    )
);

const Filters = () => {
  const [showVendor, setShowVendor] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  return (
    // Need to keep the filters applied to the search results when the dropdown menu is closed/minimized
    // Also need to add a fixed heigh to the dropdown menus and add a scroll, preferably with an apply button fixed at the bottom of the dropdown menu which closes it
    // styling on algolia dropdown menu needs to be full width of the refinements/range inputs
    <div>
      <h1 className="p-4 text-3xl">Search Results</h1>
      <div className="inline pb-4">
        <div className="inline-flex">
          {AlgoliaDropdownMenu(
            "Influencer",
            <ChevronDown />,
            <RefinementList attribute="vendor" className="w-full m-2" />
          )}
        </div>
        <div className="inline-flex">
          {AlgoliaDropdownMenu(
            "Price",
            <ChevronDown />,
            <RangeInput attribute="price" className="w-full m-2" />
          )}
        </div>
      </div>
    </div>
  );
};

const ChevronDown = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    className="w-4 h-4 self-center"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
    />
  </svg>
);

export default ProductList;
