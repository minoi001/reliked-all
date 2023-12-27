import { useState } from "react";
import { Configure, InfiniteHits, useInstantSearch } from "react-instantsearch";
import ProductCard from "../Products/ProductCard";
import ProductFilters from "../Filters/ProductFilters";
import SlideOut from "../SlideOut";

const ProductList = ({ query }) => {
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const { results, status } = useInstantSearch();
  console.log("status", status);
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
          <InfiniteHits
            hitComponent={(hit) => <ProductCard hit={hit.hit} />}
            showPrevious={false}
            translations={{
              showMoreButtonText: "Load more",
            }}
          />
        </>
      ) : status === "loading" ? (
        <h1 className={`font-h text-4xl text-center p-4`}>Loading...</h1>
      ) : (
        <h1 className={`font-h text-4xl text-center p-4`}>
          No results have been found for {query.get("q")}
        </h1>
      )}
    </div>
  );
};

export default ProductList;
