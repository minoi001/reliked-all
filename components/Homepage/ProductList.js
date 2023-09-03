import { useState } from "react";
import ProductCard from "../Products/ProductCard";
import {
  Configure,
  Hits,
  Pagination,
  useInstantSearch,
} from "react-instantsearch";
import ProductFilters from "../Filters/ProductFilters";
import SlideOut from "../SlideOut";

const ProductList = ({ query }) => {
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const { results, indexUiState } = useInstantSearch();

  function toggleSlideover() {
    setIsSlideOverOpen(!isSlideOverOpen);
  }
  const searchParameters = {
    query: query.get("q") || "",
  };

  return (
    <div className="mx-auto my-4 max-w-7xl px-4 sm:px-6 lg:px-8 ">
      <div className="sm:px-12 align-middle p-2 w-full bg-white shadow-lg">
        <div className="flex flex-row justify-between">
          <ProductFilters toggleSlideover={toggleSlideover} />
          <SlideOut
            isSlideOverOpen={isSlideOverOpen}
            toggleSlideover={toggleSlideover}
          />
        </div>
        {results.hits.length > 0 ? (
          <>
            <h1 className={`font-h text-4xl text-center p-4`}>
              Results for {searchParameters.query}
            </h1>
            <Configure {...searchParameters} />
            <Hits hitComponent={ProductCard} />
            <div className="py-12 md:p-12">
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
                showLast={true}
              />
            </div>
          </>
        ) : (
          <h1 className={`font-h text-4xl text-center p-4`}>
            No results have been found for {`''`}
          </h1>
        )}
      </div>
    </div>
  );
};

export default ProductList;
