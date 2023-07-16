import ProductCard from "../Products/ProductCard";
import {
  Configure,
  connectStateResults,
  Hits,
  Pagination,
} from "react-instantsearch-dom";
import ProductFilters from "../Filters/ProductFilters";

const ProductList = ({ query }) => {
  const searchParameters = {
    query: query.get("q") || "",
  };
  return (
    <div className="mx-auto my-4 max-w-7xl px-4 sm:px-6 lg:px-8 ">
      <div className="grid px-6 sm:px-12 align-middle p-2 w-full bg-white shadow-lg">
        <ProductFilters />
        <Results>
          <Configure {...searchParameters} />
          <Hits hitComponent={ProductCard} />
        </Results>
        <div className="p-12">
          <Pagination
            translations={{
              previous: "Previous",
              next: "Next",
              first: "First",
              last: "Last",
              page(currentRefinement) {
                return currentRefinement;
              },
            }}
            hitsPerPage={24}
            showLast={true}
          />
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

export default ProductList;
