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
  const { results } = useInstantSearch();

  function toggleSlideover() {
    setIsSlideOverOpen(!isSlideOverOpen);
  }
  const searchParameters = {
    query: query.get("q") || "",
  };

  return (
    <div>
      <div className="flex flex-row justify-between">
        <ProductFilters toggleSlideover={toggleSlideover} />
        <SlideOut
          isSlideOverOpen={isSlideOverOpen}
          toggleSlideover={toggleSlideover}
        />
      </div>
      {results.hits.length > 0 ? (
        <>
          <Configure {...searchParameters} />
          <Hits
            hitComponent={(hit) => (
              <ProductCard
                hit={hit}
                collection={collection}
                collectionInfo={collectionInfo}
              />
            )}
          />
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
  );
};

export default ProductList;
