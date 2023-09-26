import React from "react";
import { CustomRefinementList } from "./CustomRefinementList";
import { CustomRangeSlider } from "./CustomRangeSlider";
import { CustomToggleRefinement } from "./CustomToggle";

function ProductFiltersWithoutSortBy({ format }) {
  return (
    <div
      className={
        format === "row"
          ? `flex flex-row`
          : `bg-offWhite flex flex-col px-8 py-8 h-full`
      }
    >
      <CustomRefinementList
        attribute="meta.custom.influencer"
        showMore={true}
        showMoreLimit={500}
        format={format}
        title="Influencer"
      />
      <CustomRangeSlider attribute="price" format={format} title="Price" />
      <CustomRefinementList
        attribute="meta.custom_fields.size"
        format={format}
        title="Size"
      />
      <CustomRefinementList
        attribute="options.brand"
        format={format}
        title="Brand"
      />
      <CustomRefinementList
        attribute="options.colour"
        format={format}
        title="Colour"
      />
      <CustomRefinementList
        attribute="meta.custom_fields.product_condition"
        format={format}
        title={"Condition"}
      />
      <CustomRefinementList
        attribute="meta.custom_fields.product_packaging"
        format={format}
        title={"Packaging"}
      />
      <CustomToggleRefinement
        attribute="inventory_available"
        label="Inventory available"
        format={format}
        title="Availability"
      />
    </div>
  );
}

export default ProductFiltersWithoutSortBy;
