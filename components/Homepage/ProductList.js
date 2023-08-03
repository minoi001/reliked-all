import { useEffect, useState } from "react";
import ProductCard from "../Products/ProductCard";
import {
  Configure,
  connectStateResults,
  Hits,
  Pagination,
} from "react-instantsearch-dom";
import ProductFilters from "../Filters/ProductFilters";
import AlgoliaDropdownMenu from "../AlgoliaDropdownMenu";
import { CustomRangeSlider } from "../Filters/CustomRangeSlider";
import { CustomRefinementList } from "../Filters/CustomRefinementList";
// import ProductFiltersSlideOut from "../Filters/ProductFiltersSlideOut";

// useEffect(() => {
//   const width = window.innerWidth;
// }, [])
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: "italic",
  weight: "700",
});
const ProductList = ({ query }) => {
  const [width, setWidth] = useState(null);
  const [isOpenTwo, setisOpenTwo] = useState(false);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  function toggleSlideover() {
    console.log(!isOpenTwo);
    setisOpenTwo(!isOpenTwo);
  }

  const handleAlgoliaDropdownClick = (event) => {
    // Prevent the click event from propagating to the parent div
    event.stopPropagation();
    // Your other handling logic for the AlgoliaDropdownMenu click
  };

  const searchParameters = {
    query: query.get("q") || "",
  };

  const ConditionalWrapper = ({ condition, wrapper, children }) => {
    condition ? wrapper(children) : children;
  };

  return (
    <div className="mx-auto my-4 max-w-7xl px-4 sm:px-6 lg:px-8 ">
      {/* <div className="grid px-6 sm:px-12 align-middle p-2 w-full bg-white shadow-lg"> */}
      <div className="sm:px-12 align-middle p-2 w-full bg-white shadow-lg">
        {/* <section>
          <ConditionalWrapper
            condition={width > 768}
            wrapper={(children) => (
              <div className="flex flex-row-reverse">{children}</div>
            )}
          > */}
        {/* <div
          hidden={width >= 768}
          className="flex md:flex-row-reverse md:flex-none"
        > */}
        <div className="flex flex-row justify-between">
          <ProductFilters />
          <div className="lg:hidden flex content-normal justify-center mb-4">
            <div onClick={toggleSlideover} className="ais-SortBy-select px-2">
              Filters +
            </div>
          </div>

          <div
            id="slideover-container"
            className={
              isOpenTwo
                ? "w-full h-full fixed inset-0"
                : "w-full h-full fixed inset-0 invisible"
            }
          >
            <div
              onClick={toggleSlideover}
              id="slideover-bg"
              className={
                isOpenTwo
                  ? "w-full h-full  duration-300 transition ease-in-out transition-all inset-0 absolute bg-gray-900 opacity-50"
                  : "w-full h-full  duration-300 transition ease-in-out transition-all inset-0 absolute bg-gray-900 opacity-0"
              }
            ></div>
            <div
              id="slideover"
              className={
                "w-1/2 bg-white h-full absolute right-0 duration-300 transition ease-in-out transition-all"
              }
            >
              <div className="absolute cursor-pointer text-gray-600 duration-300 transition ease-in-out top-0 w-8 h-8 flex items-center justify-center right-0 mt-2 mr-2">
                <svg
                  onClick={toggleSlideover}
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>{" "}
              </div>

              {/* <div className="bg-offWhite mx-4 lg:inline-flex">
                <ProductFiltersSlideOut />
              </div> */}
              <div className="bg-offWhite flex flex-col justify-evenly lg:inline-flex px-8 py-8 h-full">
                {AlgoliaDropdownMenu(
                  "Influencer",
                  <CustomRefinementList
                    attribute="vendor"
                    showMore={true}
                    showMoreLimit={500}
                  />
                )}

                {AlgoliaDropdownMenu(
                  "Price",
                  <CustomRangeSlider
                    onClick={handleAlgoliaDropdownClick}
                    attribute="price"
                  />
                )}
                {AlgoliaDropdownMenu(
                  "Size",
                  <CustomRefinementList
                    onClick={handleAlgoliaDropdownClick}
                    attribute="meta.custom_fields.size"
                  />
                )}
                {AlgoliaDropdownMenu(
                  "Brand",
                  <CustomRefinementList attribute="options.brand" />
                )}
                {AlgoliaDropdownMenu(
                  "Colour",
                  <CustomRefinementList attribute="options.colour" />
                )}
                {AlgoliaDropdownMenu(
                  "Condition",
                  <CustomRefinementList attribute="meta.custom_fields.product_condition" />
                )}
                {AlgoliaDropdownMenu(
                  "Packaging",
                  <CustomRefinementList attribute="meta.custom_fields.product_packaging" />
                )}
                {AlgoliaDropdownMenu(
                  "Availability",
                  <CustomRefinementList attribute="inventory_available" />
                )}
              </div>
            </div>
          </div>
          {/* : null
        } */}
        </div>
        <Results>
          <h1 className={`${playfair.className} text-4xl text-center p-4`}>
            Results for {searchParameters.query}
          </h1>
          <Configure {...searchParameters} />
          <Hits hitComponent={ProductCard} />
        </Results>
        {/* </div> */}
        {/* </ConditionalWrapper>
        </section> */}
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

const Results = connectStateResults(
  ({ searchState, searchResults, children }) =>
    searchResults && searchResults.nbHits !== 0 ? (
      children
    ) : (
      <div>No results have been found for {searchState.query}.</div>
    )
);

export default ProductList;
