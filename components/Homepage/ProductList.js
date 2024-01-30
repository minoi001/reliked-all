import { useContext, useEffect, useState } from "react";
import { Configure, Hits, useInstantSearch } from "react-instantsearch";
import ProductCard from "../Products/ProductCard";
import ProductFilters from "../Filters/ProductFilters";
import SlideOut from "../SlideOut";
import { Loading } from "../Loading";
import { ProductContext } from "../../context/productContext";
import { CustomPagination } from "../Pagination";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

const ProductList = ({ paramsQuery }) => {
  const { scrollPosition, setScrollPosition } = useContext(ProductContext);
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [searchParameters, setSearchParameters] = useState({});

  //get page number from url
  const router = useRouter();
  const { query } = router;
  const pageNumber = Number(query.page) || 0;

  useEffect(() => {
    window.scrollTo(0, scrollPosition);
    setSearchParameters({
      query: query.q ? query.q : "",
      page: pageNumber ? pageNumber - 1 : 0,
    });
  }, [query]);

  function toggleSlideover() {
    setIsSlideOverOpen(!isSlideOverOpen);
  }

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
        <CustomPagination setScrollPosition={setScrollPosition} />
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
