import React, { useState, useEffect, useRef } from "react";
import AlgoliaDropdownMenu from "../AlgoliaDropdownMenu";
import { CustomRefinementList } from "./CustomRefinementList";
import { CustomRangeSlider } from "./CustomRangeSlider";

function ProductFiltersWithoutSortBy({ format }) {
  const [isInfluencerOpen, setIsInfluencerOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isSizeOpen, setIsSizeOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isColourOpen, setIsColourOpen] = useState(false);
  const [isConditionOpen, setIsConditionOpen] = useState(false);
  const [isPackagingOpen, setIsPackagingOpen] = useState(false);
  const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(false);

  const toggleDropdown = (dropdownName) => {
    // Toggle the selected dropdown
    switch (dropdownName) {
      case "Influencer":
        setIsInfluencerOpen(!isInfluencerOpen);
        break;
      case "Price":
        setIsPriceOpen(!isPriceOpen);
        break;
      case "Size":
        setIsSizeOpen(!isSizeOpen);
        break;
      case "Brand":
        setIsBrandOpen(!isBrandOpen);
        break;
      case "Colour":
        setIsColourOpen(!isColourOpen);
        break;
      case "Condition":
        setIsConditionOpen(!isConditionOpen);
        break;
      case "Packaging":
        setIsPackagingOpen(!isPackagingOpen);
        break;
      case "Availability":
        setIsAvailabilityOpen(!isAvailabilityOpen);
        break;
      default:
        break;
    }
  };

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
          attribute="vendor"
          showMore={true}
          showMoreLimit={500}
        />,
        isInfluencerOpen,
        () => toggleDropdown("Influencer"),
        setIsInfluencerOpen
      )}

      {AlgoliaDropdownMenu(
        "Price",
        <CustomRangeSlider attribute="price" />,
        isPriceOpen,
        () => toggleDropdown("Price"),
        setIsPriceOpen
      )}
      {AlgoliaDropdownMenu(
        "Size",
        <CustomRefinementList attribute="meta.custom_fields.size" />,
        isSizeOpen,
        () => toggleDropdown("Size"),
        setIsSizeOpen
      )}
      {AlgoliaDropdownMenu(
        "Brand",
        <CustomRefinementList attribute="options.brand" />,
        isBrandOpen,
        () => toggleDropdown("Brand"),
        setIsBrandOpen
      )}
      {AlgoliaDropdownMenu(
        "Colour",
        <CustomRefinementList attribute="options.colour" />,
        isColourOpen,
        () => toggleDropdown("Colour"),
        setIsColourOpen
      )}
      {AlgoliaDropdownMenu(
        "Condition",
        <CustomRefinementList attribute="meta.custom_fields.product_condition" />,
        isConditionOpen,
        () => toggleDropdown("Condition"),
        setIsConditionOpen
      )}
      {AlgoliaDropdownMenu(
        "Packaging",
        <CustomRefinementList attribute="meta.custom_fields.product_packaging" />,
        isPackagingOpen,
        () => toggleDropdown("Packaging"),
        setIsPackagingOpen
      )}
      {AlgoliaDropdownMenu(
        "Availability",
        <CustomRefinementList attribute="inventory_available" />,
        isAvailabilityOpen,
        () => toggleDropdown("Availability"),
        setIsAvailabilityOpen
      )}
    </div>
  );
}

export default ProductFiltersWithoutSortBy;
