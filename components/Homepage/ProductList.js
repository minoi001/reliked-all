import { useState } from "react";
import ProductCard from "../Products/ProductCard";
import { Configure, Hits, Pagination } from "react-instantsearch";
import ProductFilters from "../Filters/ProductFilters";
import SlideOut from "../SlideOut";

import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: "italic",
  weight: "700",
});
const ProductList = ({ query }) => {
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);

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
        {/*<Results>*/}
        <h1 className={`${playfair.className} text-4xl text-center p-4`}>
          Results for {searchParameters.query}
        </h1>
        <Configure {...searchParameters} />
        <Hits hitComponent={ProductCard} />
        {/*</Results>*/}
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
            hitsPerPage={24}
            showLast={true}
          />
        </div>
      </div>
    </div>
  );
};
//
// const Results = connectStateResults(
//   ({ searchState, searchResults, children }) =>
//     searchResults && searchResults.nbHits !== 0 ? (
//       children
//     ) : (
//       <div>No results have been found for {searchState.query}.</div>
//     )
// );

export default ProductList;
