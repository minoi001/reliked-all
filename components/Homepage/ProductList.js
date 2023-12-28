import { useContext, useEffect, useState } from "react";
import { Configure, InfiniteHits, useInstantSearch } from "react-instantsearch";
import ProductCard from "../Products/ProductCard";
import ProductFilters from "../Filters/ProductFilters";
import SlideOut from "../SlideOut";
import { Loading } from "../Loading";
import { ProductContext } from "../../context/productContext";

const ProductList = ({ query }) => {
  const { scrollPosition, setScrollPosition } = useContext(ProductContext);
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);

  useEffect(() => {
    console.log("scrolling to ", scrollPosition);
    window.scrollTo(0, scrollPosition);
  }, [scrollPosition]);

  function toggleSlideover() {
    setIsSlideOverOpen(!isSlideOverOpen);
  }
  const searchParameters = {
    query: query.get("q") || "",
  };
  const handleHitClick = () => {
    console.log("setting scroll position ", window.scrollY);
    setScrollPosition(window.scrollY);
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
            onClick={handleHitClick}
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
