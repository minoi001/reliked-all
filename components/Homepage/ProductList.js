import ProductCard from "../Products/ProductCard";
import {
  Hits,
  Pagination,
  RangeInput,
  RefinementList,
  connectStateResults,
} from "react-instantsearch-dom";
import { useState } from "react";

const ProductList = () => {
  return (
    <div className="bg-white">
      <div>
        <Filters />`{" "}
      </div>

      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <Results>
          <Hits hitComponent={ProductCard} />
        </Results>
        <Pagination />
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
    <div className="grid grid-cols-3 md:grid-cols-5 bg-gray-200 p-4">
      <div>
        <button className="flex" onClick={() => setShowVendor(!showVendor)}>
          Vendor <ChevronDown />
        </button>
        {showVendor && <RefinementList attribute="vendor" />}
      </div>
      <div>
        <button className="flex" onClick={() => setShowPrice(!showPrice)}>
          Price <ChevronDown />
        </button>
        {showPrice && <RangeInput attribute="price" />}
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
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
    />
  </svg>
);

export default ProductList;
