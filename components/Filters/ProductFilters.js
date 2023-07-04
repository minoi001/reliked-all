import AlgoliaDropdownMenu from "../AlgoliaDropdownMenu";
import { RefinementList, SortBy } from "react-instantsearch-dom";
import { CustomRangeSlider } from "./CustomRangeSlider";
import { CustomRefinementList } from "./CustomRefinementList";

const ProductFilters = () => {
  return (
    // Also need to add a fixed height to the dropdown menus and add a scroll, preferably with an apply button fixed at the bottom of the dropdown menu which closes it
    // styling on algolia dropdown menu needs to be full width of the refinements/range inputs

    <div className="inline pb-4 flex justify-between ">
      <div>
        <SortBy
          defaultRefinement="shopify_products"
          items={[
            // { value: "shopify_products", label: "Relevance" },
            { value: "shopify_products_published_at_desc", label: "Newest in" },
            { value: "shopify_products_price_desc", label: "Price descending" },
            { value: "shopify_products_price_asc", label: "Price ascending" },
          ]}
        />
      </div>
      <div className="inline-flex">
        {
          // Algolia only lets you show the X most popular filters, so I've set it to 20 for now
          AlgoliaDropdownMenu(
            "Influencer",
            <CustomRefinementList
              attribute="vendor"
              showMore={true}
              showMoreLimit={20}
            />
          )
        }

        {AlgoliaDropdownMenu("Price", <CustomRangeSlider attribute="price" />)}
      </div>
    </div>
  );
};

export default ProductFilters;
