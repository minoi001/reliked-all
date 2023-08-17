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
        <h1 className={`${playfair.className} text-4xl text-center p-4`}>
          Results for {searchParameters.query}
        </h1>
        <Configure {...searchParameters} />
        <Hits hitComponent={ProductCard} />
        <div className="py-12 md:p-12">
          <Pagination
            translations={{
              previousPageItemText: "Previous",
              nextPageItemText: "Next",
              firstPageItemText: "First",
              lastPageItemText: "Last",
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

export default ProductList;
