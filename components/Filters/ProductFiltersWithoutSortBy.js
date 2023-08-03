import React from "react";
import AlgoliaDropdownMenu from "../AlgoliaDropdownMenu";
import { CustomRangeSlider } from "./CustomRangeSlider";
import { CustomRefinementList } from "./CustomRefinementList";

function ProductFiltersWithoutSortBy({ format }) {
  return (
    <div
      className={
        format === "row"
          ? `md:flex lg:inline-flex`
          : `bg-offWhite flex flex-col justify-evenly px-8 py-8 h-full`
      }
    >
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
        <CustomRefinementList attribute="inventory_available" />
      )}
    </div>
  );
}

export default ProductFiltersWithoutSortBy;
