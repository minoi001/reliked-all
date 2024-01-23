import { useContext, useEffect, useState } from "react";
import { Configure, Hits, useInstantSearch } from "react-instantsearch";
import ProductCard from "../Products/ProductCard";
import ProductFilters from "../Filters/ProductFilters";
import SlideOut from "../SlideOut";
import { Loading } from "../Loading";
import { ProductContext } from "../../context/productContext";
import { CustomPagination } from "../Pagination";
import { useSearchParams } from "next/navigation";

const ProductList = () => {
  const query = useSearchParams();
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
    page: +query.get("page") - 1 || 0,
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
          <Hits
            hitComponent={(hit) => (
              <ProductCard
                hit={hit.hit}
                setScrollPosition={setScrollPosition}
              />
            )}
          />
        </NoResultsBoundary>
        <CustomPagination />
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
