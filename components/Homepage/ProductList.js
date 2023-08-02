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
import ProductFiltersSlideOut from "../Filters/ProductFiltersSlideOut";

// useEffect(() => {
//   const width = window.innerWidth;
// }, [])

const ProductList = ({ query }) => {
  const [width, setWidth] = useState(null);
  const [isOpenTwo, setisOpenTwo] = useState(false);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  function toggleSlideover() {
    console.log(!isOpenTwo);
    setisOpenTwo(!isOpenTwo);
    // console.log("slide");
    // document
    //   .getElementById("slideover-container")
    //   .classList.toggle("invisible");
    // document.getElementById("slideover-bg").classList.toggle("opacity-0");
    // document.getElementById("slideover-bg").classList.toggle("opacity-50");
    // document.getElementById("slideover").classList.toggle("translate-x-full");
  }

  const handleAlgoliaDropdownClick = (event) => {
    // Prevent the click event from propagating to the parent div
    event.stopPropagation();
    // Your other handling logic for the AlgoliaDropdownMenu click
  };

  const searchParameters = {
    query: query.get("q") || "",
  };
  console.log(width);
  const ConditionalWrapper = ({ condition, wrapper, children }) => {
    condition ? wrapper(children) : children;
  };

  return (
    <div className="mx-auto my-4 max-w-7xl px-4 sm:px-6 lg:px-8 ">
      <div className="grid px-6 sm:px-12 align-middle p-2 w-full bg-white shadow-lg">
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
          <div className="w-fit h-fit md:hidden flex content-normal justify-center">
            <div
              onClick={toggleSlideover}
              className="cursor-pointer px-5 py-2 text-sm border text-gray-500 hover:bg-gray-100 rounded border-gray-300 mb-4 md:mb-0"
            >
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
                  ? "w-full h-full duration-500 ease-out transition-all inset-0 absolute bg-gray-900 opacity-50"
                  : "w-full h-full duration-500 ease-out transition-all inset-0 absolute bg-gray-900 opacity-0"
              }
            ></div>
            <div
              onClick={toggleSlideover}
              id="slideover"
              className={
                "w-96 bg-white h-full absolute right-0 duration-300 ease-out transition-all"
              }
            >
              <div className="absolute cursor-pointer text-gray-600 ease-in ease-out top-0 w-8 h-8 flex items-center justify-center right-0 mt-5 mr-5">
                <svg
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
                </svg>
              </div>
              <div className="bg-offWhite mx-4 lg:inline-flex">
                {/* <ProductFiltersSlideOut /> */}
              </div>
              <div className="bg-offWhite mx-4 lg:inline-flex">
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
          <Configure {...searchParameters} />
          <Hits hitComponent={ProductCard} />
        </Results>
        {/* </div> */}
        {/* </ConditionalWrapper>
        </section> */}
        <div className="p-12">
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
