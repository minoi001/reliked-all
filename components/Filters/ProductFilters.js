import AlgoliaDropdownMenu from "../AlgoliaDropdownMenu";
import {
  RefinementList,
  SortBy,
  ToggleRefinement,
} from "react-instantsearch-dom";
import { CustomRangeSlider } from "./CustomRangeSlider";
import { CustomRefinementList } from "./CustomRefinementList";
import { CustomToggleRefinement } from "./CustomToggle";

const ProductFilters = () => {
  return (
    // Also need to add a fixed height to the dropdown menus and add a scroll, preferably with an apply button fixed at the bottom of the dropdown menu which closes it
    // styling on algolia dropdown menu needs to be full width of the refinements/range inputs

    <div className="inline pb-4 flex justify-between ">
      <div>
        <SortBy
          defaultRefinement="shopify_products"
          items={[
            { value: "shopify_products_published_at_desc", label: "Newest in" },
            { value: "shopify_products_price_desc", label: "Price descending" },
            { value: "shopify_products_price_asc", label: "Price ascending" },
          ]}
        />
      </div>
      <div className="lg:inline-flex">
        {AlgoliaDropdownMenu(
          "Influencer",
          <CustomRefinementList
            attribute="vendor"
            showMore={true}
            showMoreLimit={500}
          />
        )}

        {AlgoliaDropdownMenu("Price", <CustomRangeSlider attribute="price" />)}
        {AlgoliaDropdownMenu(
          "Size",
          <CustomRefinementList attribute="meta.custom_fields.size" />
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
          <CustomToggleRefinement
            attribute="inventory_available"
            label="Available"
            value={true}
          />
        )}
      </div>
    </div>
  );
};

export default ProductFilters;
