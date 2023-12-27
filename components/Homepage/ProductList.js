import { useState } from "react";
import { Configure, InfiniteHits, useInstantSearch } from "react-instantsearch";
import ProductCard from "../Products/ProductCard";
import ProductFilters from "../Filters/ProductFilters";
import SlideOut from "../SlideOut";
import { Loading } from "../Loading";

const ProductList = ({ query }) => {
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  function toggleSlideover() {
    setIsSlideOverOpen(!isSlideOverOpen);
  }
  const searchParameters = {
    query: query.get("q") || "",
  };

  return (
    <>
      <div className="flex flex-row justify-between">
        <ProductFilters toggleSlideover={toggleSlideover} />
        <SlideOut
          isSlideOverOpen={isSlideOverOpen}
          toggleSlideover={toggleSlideover}
        />
      </div>
      <>
        <Loading />
        <Configure {...searchParameters} />
        <NoResultsBoundary fallback={<NoResults />}>
          <InfiniteHits
            hitComponent={(hit) => <ProductCard hit={hit.hit} />}
            showPrevious={false}
            translations={{
              showMoreButtonText: "Load more",
            }}
          />
        </NoResultsBoundary>
      </>
    </>
  );
};

function NoResultsBoundary({ children, fallback }) {
  const { results } = useInstantSearch();

  // The `__isArtificial` flag makes sure not to display the No Results message
  // when no hits have been returned.
  if (!results.__isArtificial && results.nbHits === 0) {
    return (
      <>
        {fallback}
        <div hidden>{children}</div>
      </>
    );
  }

  return children;
}

function NoResults() {
  const { indexUiState } = useInstantSearch();

  return (
    <div>
      <h1 className={`font-h text-2xl text-center p-4`}>
        No results have been found for <q>{indexUiState.query}</q>
      </h1>
    </div>
  );
}

export default ProductList;
