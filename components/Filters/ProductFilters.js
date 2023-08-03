import AlgoliaDropdownMenu from "../AlgoliaDropdownMenu";
import {
  RefinementList,
  SortBy,
  ToggleRefinement,
} from "react-instantsearch-dom";
import { CustomRangeSlider } from "./CustomRangeSlider";
import { CustomRefinementList } from "./CustomRefinementList";
import ProductFiltersSlideOut from "./ProductFiltersSlideOut";
import { CustomToggleRefinement } from "./CustomToggle";

const ProductFilters = () => {
  return (
    // Also need to add a fixed height to the dropdown menus and add a scroll, preferably with an apply button fixed at the bottom of the dropdown menu which closes it
    // styling on algolia dropdown menu needs to be full width of the refinements/range inputs

    <div className="max-h-min lg:flex-wrap xl:flex md:pb-4 sm:justify-between sm:static sm:inline">
      <SortBy
        className="mb-4 md:mb-0"
        defaultRefinement="shopify_products"
        items={[
          { value: "shopify_products_published_at_desc", label: "Newest in" },
          { value: "shopify_products_price_desc", label: "Price descending" },
          { value: "shopify_products_price_asc", label: "Price ascending" },
        ]}
      />
      <div className="xs:hidden lg:inline-flex">
        <ProductFiltersSlideOut />
      </div>
    </div>
  );
};

export default ProductFilters;
