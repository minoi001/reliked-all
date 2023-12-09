import { useEffect, useState } from "react";
import ProductCard from "../Products/ProductCard";
import {
  Configure,
  Hits,
  Pagination,
  useInstantSearch,
} from "react-instantsearch";
import ProductFilters from "../Filters/ProductFilters";
import SlideOut from "../SlideOut";
import { getProducts } from "../../algoliaConfig";

const ProductList = ({ query }) => {
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [maxPage, setMaxPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { hits, nbPages } = await getProducts(query, page);
      setData(data.concat(hits));
      setMaxPage(nbPages);
    };
    fetchData();
  }, [query, page]);

  function loadMore() {
    if (page < maxPage - 1) setPage(page + 1);
  }

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
          <div className={"ais-Hits-list"}>
            {data.map((product) => (
              <ProductCard hit={{ hit: product }} key={product.id} />
            ))}
          </div>
          {page < maxPage - 1 && (
            <button
              className={"font-h text-2xl w-full justify-center"}
              onClick={loadMore}
            >
              Load More
            </button>
          )}
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
