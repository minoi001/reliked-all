import React, { useState, useEffect, useRef } from "react";
import AlgoliaDropdownMenu from "../AlgoliaDropdownMenu";
import { CustomRefinementList } from "./CustomRefinementList";
import { CustomRangeSlider } from "./CustomRangeSlider";
import { CustomToggleRefinement } from "./CustomToggle";

function ProductFiltersWithoutSortBy({ format }) {
  const [isInfluencerRefined, setIsInfluencerRefined] = useState(false);
  const [isPriceRefined, setIsPriceRefined] = useState(false);
  const [isSizeRefined, setIsSizeRefined] = useState(false);
  const [isBrandRefined, setIsBrandRefined] = useState(false);
  const [isColourRefined, setIsColourRefined] = useState(false);
  const [isConditionRefined, setIsConditionRefined] = useState(false);
  const [isPackagingRefined, setIsPackagingRefined] = useState(false);
  const [isAvailabilityRefined, setIsAvailabilityRefined] = useState(false);
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
          setIsRefined={setIsInfluencerRefined}
        />,
        isInfluencerRefined
      )}

      {AlgoliaDropdownMenu(
        "Price",
        <CustomRangeSlider
          attribute="price"
          format={format}
          setIsRefined={setIsPriceRefined}
        />,
        isPriceRefined
      )}
      {AlgoliaDropdownMenu(
        "Size",
        <CustomRefinementList
          attribute="meta.custom_fields.size"
          format={format}
          setIsRefined={setIsSizeRefined}
        />,
        isSizeRefined
      )}
      {AlgoliaDropdownMenu(
        "Brand",
        <CustomRefinementList
          attribute="options.brand"
          format={format}
          setIsRefined={setIsBrandRefined}
        />,
        isBrandRefined
      )}
      {AlgoliaDropdownMenu(
        "Colour",
        <CustomRefinementList
          attribute="options.colour"
          format={format}
          setIsRefined={setIsColourRefined}
        />,
        isColourRefined
      )}
      {AlgoliaDropdownMenu(
        "Condition",
        <CustomRefinementList
          attribute="meta.custom_fields.product_condition"
          format={format}
          setIsRefined={setIsConditionRefined}
        />,
        isConditionRefined
      )}
      {AlgoliaDropdownMenu(
        "Packaging",
        <CustomRefinementList
          attribute="meta.custom_fields.product_packaging"
          format={format}
          setIsRefined={setIsPackagingRefined}
        />,
        isPackagingRefined
      )}
      {AlgoliaDropdownMenu(
        "Availability",
        <CustomToggleRefinement
          attribute="inventory_available"
          label="Inventory available"
          format={format}
          setIsRefined={setIsAvailabilityRefined}
        />,
        isAvailabilityRefined
      )}
    </div>
  );
}

export default ProductFiltersWithoutSortBy;
