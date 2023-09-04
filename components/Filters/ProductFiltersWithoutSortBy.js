import React, { useState, useEffect, useRef } from "react";
import AlgoliaDropdownMenu from "../AlgoliaDropdownMenu";
import { CustomRefinementList } from "./CustomRefinementList";
import { CustomRangeSlider } from "./CustomRangeSlider";
import { CustomToggleRefinement } from "./CustomToggle";

function ProductFiltersWithoutSortBy({ format }) {
  return (
    <div
      className={
        format === "row"
          ? `flex flex-row`
          : `bg-offWhite flex flex-col  px-8 py-8 h-full`
      }
    >
      {AlgoliaDropdownMenu(
        "Influencer",
        <CustomRefinementList
          attribute="meta.custom.influencer"
          showMore={true}
          showMoreLimit={500}
          format={format}
        />
      )}

      {AlgoliaDropdownMenu(
        "Price",
        <CustomRangeSlider attribute="price" format={format} />
      )}
      {AlgoliaDropdownMenu(
        "Size",
        <CustomRefinementList
          attribute="meta.custom_fields.size"
          format={format}
        />
      )}
      {AlgoliaDropdownMenu(
        "Brand",
        <CustomRefinementList attribute="options.brand" format={format} />
      )}
      {AlgoliaDropdownMenu(
        "Colour",
        <CustomRefinementList attribute="options.colour" format={format} />
      )}
      {AlgoliaDropdownMenu(
        "Condition",
        <CustomRefinementList
          attribute="meta.custom_fields.product_condition"
          format={format}
        />
      )}
      {AlgoliaDropdownMenu(
        "Packaging",
        <CustomRefinementList
          attribute="meta.custom_fields.product_packaging"
          format={format}
        />
      )}
      {AlgoliaDropdownMenu(
        "Availability",
        <CustomToggleRefinement
          attribute="inventory_available"
          label="Inventory available"
          format={format}
        />
      )}
    </div>
  );
}

export default ProductFiltersWithoutSortBy;
