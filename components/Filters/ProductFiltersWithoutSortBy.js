import React, { useState, useEffect, useRef } from "react";
import AlgoliaDropdownMenu from "../AlgoliaDropdownMenu";
import { CustomRefinementList } from "./CustomRefinementList";
import { CustomRangeSlider } from "./CustomRangeSlider";
import { CustomToggleRefinement } from "./CustomToggle";

function ProductFiltersWithoutSortBy({ format }) {
  const [isInfluencerOpen, setIsInfluencerOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isSizeOpen, setIsSizeOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isColourOpen, setIsColourOpen] = useState(false);
  const [isConditionOpen, setIsConditionOpen] = useState(false);
  const [isPackagingOpen, setIsPackagingOpen] = useState(false);
  const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(false);

  return (
    <div
      className={
        format === "row"
          ? `flex flex-row`
          : // : `bg-offWhite flex flex-col justify-evenly px-8 py-8 h-full`
            `flex flex-col`
      }
      // ref={dropdownsRef}
    >
      {AlgoliaDropdownMenu(
        "Influencer",
        <CustomRefinementList
          attribute="meta.custom.influencer"
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
          label="Inventory available"
        />
      )}
    </div>
  );
}

export default ProductFiltersWithoutSortBy;
