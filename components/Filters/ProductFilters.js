import { SortBy } from "react-instantsearch";
import ProductFiltersWithoutSortBy from "./ProductFiltersWithoutSortBy";
import CustomSortBy from "./CustomSortBy";
import { useState } from "react";
import AlgoliaDropdownMenu from "../AlgoliaDropdownMenu";

const ProductFilters = ({ toggleSlideover, isFromSearch, refine }) => {
  const [isSortByOpen, setIsSortByOpen] = useState();
  return (
    // Also need to add a fixed height to the dropdown menus and add a scroll, preferably with an apply button fixed at the bottom of the dropdown menu which closes it
    // styling on algolia dropdown menu needs to be full width of the refinements/range inputs
    <>
      <div className="max-h-min lg:flex md:pb-4 sm:static sm:inline">
        {AlgoliaDropdownMenu(
          "Sort By",
          <CustomSortBy
            className="mb-4 md:mb-0"
            items={[
              {
                value: "shopify_products_published_at_desc",
                label: "Newest in",
              },
              {
                value: "shopify_products_price_desc",
                label: "Price descending",
              },
              { value: "shopify_products_price_asc", label: "Price ascending" },
            ]}
          />
        )}
      </div>
      <div className="hidden lg:block">
        <ProductFiltersWithoutSortBy format={"row"} />
      </div>
      <div className="lg:hidden justify-center">
        <div onClick={toggleSlideover} className="ais-SortBy-select px-2">
          Filters +
        </div>
      </div>
    </>
  );
};

export default ProductFilters;
