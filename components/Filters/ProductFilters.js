import AlgoliaDropdownMenu from "../AlgoliaDropdownMenu";
import { RefinementList, SortBy } from "react-instantsearch-dom";
import { CustomRangeSlider } from "./CustomRangeSlider";

const ProductFilters = () => {
  return (
    // Also need to add a fixed height to the dropdown menus and add a scroll, preferably with an apply button fixed at the bottom of the dropdown menu which closes it
    // styling on algolia dropdown menu needs to be full width of the refinements/range inputs

    <div className="inline pb-4">
      <div className="inline-flex">
        <SortBy
          defaultRefinement="shopify_products"
          items={[
            { value: "shopify_products", label: "Relevance" },
            { value: "shopify_products_price_desc", label: "Price descending" },
            { value: "shopify_products_price_asc", label: "Price ascending" },
            { value: "shopify_products_published_at_desc", label: "Newest in" },
          ]}
        />
      </div>
      <div className="inline-flex">
        {AlgoliaDropdownMenu(
          "Influencer",
          <RefinementList attribute="vendor" className="w-full m-2" />
        )}
      </div>
      <div className="inline-flex">
        {AlgoliaDropdownMenu("Price", <CustomRangeSlider attribute="price" />)}
      </div>
    </div>
  );
};

export default ProductFilters;
