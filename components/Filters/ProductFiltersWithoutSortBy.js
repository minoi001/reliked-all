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
  const dropdownsRef = useRef(null);
  const handleClickOutside = (event) => {
    if (dropdownsRef.current && !dropdownsRef.current.contains(event.target)) {
      // Close all dropdowns
      setIsInfluencerOpen(false);
      setIsPriceOpen(false);
      setIsSizeOpen(false);
      setIsBrandOpen(false);
      setIsColourOpen(false);
      setIsConditionOpen(false);
      setIsPackagingOpen(false);
      setIsAvailabilityOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener when the component mounts
    document.addEventListener("click", handleClickOutside);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (dropdownName) => {
    // Close all dropdowns
    setIsInfluencerOpen(false);
    setIsPriceOpen(false);
    setIsSizeOpen(false);
    setIsBrandOpen(false);
    setIsColourOpen(false);
    setIsConditionOpen(false);
    setIsPackagingOpen(false);
    setIsAvailabilityOpen(false);

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
          : `bg-offWhite flex flex-col justify-evenly px-8 py-8 h-full`
      }
      ref={dropdownsRef}
    >
      {AlgoliaDropdownMenu(
        "Influencer",
        <CustomRefinementList
          attribute="vendor"
          showMore={true}
          showMoreLimit={500}
        />,
        isInfluencerOpen,
        () => toggleDropdown("Influencer")
      )}

      {AlgoliaDropdownMenu(
        "Price",
        <CustomRangeSlider attribute="price" />,
        isPriceOpen,
        () => toggleDropdown("Price")
      )}
      {AlgoliaDropdownMenu(
        "Size",
        <CustomRefinementList attribute="meta.custom_fields.size" />,
        isSizeOpen,
        () => toggleDropdown("Size")
      )}
      {AlgoliaDropdownMenu(
        "Brand",
        <CustomRefinementList attribute="options.brand" />,
        isBrandOpen,
        () => toggleDropdown("Brand")
      )}
      {AlgoliaDropdownMenu(
        "Colour",
        <CustomRefinementList attribute="options.colour" />,
        isColourOpen,
        () => toggleDropdown("Colour")
      )}
      {AlgoliaDropdownMenu(
        "Condition",
        <CustomRefinementList attribute="meta.custom_fields.product_condition" />,
        isConditionOpen,
        () => toggleDropdown("Condition")
      )}
      {AlgoliaDropdownMenu(
        "Packaging",
        <CustomRefinementList attribute="meta.custom_fields.product_packaging" />,
        isPackagingOpen,
        () => toggleDropdown("Packaging")
      )}
      {AlgoliaDropdownMenu(
        "Availability",
        <CustomRefinementList attribute="inventory_available" />,
        isAvailabilityOpen,
        () => toggleDropdown("Availability")
      )}
    </div>
  );
}

export default ProductFiltersWithoutSortBy;
