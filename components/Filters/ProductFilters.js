import { useState } from "react";
import AlgoliaDropdownMenu from "../AlgoliaDropdownMenu";
import { SortBy } from "react-instantsearch-dom";
import { CustomRangeSlider } from "./CustomRangeSlider";
import { CustomRefinementList } from "./CustomRefinementList";

const ProductFilters = () => {
  // Step 1: Define state variables for dropdown open/closed state
  const [isInfluencerOpen, setIsInfluencerOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isSizeOpen, setIsSizeOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isColourOpen, setIsColourOpen] = useState(false);
  const [isConditionOpen, setIsConditionOpen] = useState(false);
  const [isPackagingOpen, setIsPackagingOpen] = useState(false);
  const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(false);


  // Step 2: Create a function to toggle the dropdown open/closed state
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

  // Rest of the component code remains the same
  // ...

  return (
    // ...
    <div className="inline pb-4 flex justify-between ">
      {/* ... */}
      <div className="lg:inline-flex">
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
    </div>
  );
};

export default ProductFilters;
