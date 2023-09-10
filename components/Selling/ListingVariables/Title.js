import React, { useContext, useEffect } from "react";
import Select from "react-select";
import Creatable from "react-select/creatable";

import { ProductContext } from "../../../context/productContext";
import { AccountContext } from "../../../context/accountContext";

const Title = ({ styles }) => {
  const {
    productInfo,
    updateProductValue,
    listingVariables,
    getListingVariables,
  } = useContext(ProductContext);
  const { userInfo } = useContext(AccountContext);

  // useEffect(() => {
  //   getListingVariables();
  // }, []);

  const brands = listingVariables.brands;
  const colours = listingVariables.colours;
  const sizes = listingVariables.sizes;

  const handleChange = (event) => {
    if (event.variable) {
      updateProductValue({ [event.variable]: event.value });
    } else {
      updateProductValue({ description: event.target.value });
    }
  };

  return (
    <div>
      <fieldset className="px-4 border-solid border-2 border-taupe ">
        <legend className="p-1">TITLE</legend>
        <p className="pl-2">
          {productInfo.brand} {productInfo.colour} {productInfo.description}{" "}
          {productInfo.size}
        </p>
        <div className="flex">
          <Select
            className="pt-2 pr-1 pl-2 inline w-1/2"
            id="brand"
            type="text"
            options={brands}
            placeholder="Brand"
            onChange={handleChange}
            styles={styles}
          />
          {/* <p className="mb-4 py-2 inline">:</p> */}
          <Select
            className="pt-2 pb-2 pr-1 inline w-1/2"
            id="colour"
            type="text"
            options={colours}
            placeholder="Colour"
            onChange={handleChange}
            styles={styles}
          />
          {/* <p className="mb-4 py-2 inline">:</p> */}
        </div>{" "}
        <div className="flex mb-2">
          <input
            className="p-1 pl-2.5 inline w-full mb-2 ml-2 mr-1 border-cream active:border-cream focus:border-taupe hover:border-taupe focus:ring-0"
            id="description"
            type="text"
            placeholder={
              userInfo.userType === "Customer" || "Influencer"
                ? "Description"
                : "Copy & paste product title..."
            }
            onChange={handleChange}
          />
          {/* <p className="mb-4 py-2 inline">:</p> */}
          <Select
            className="pb-2 pr-2 inline w-2/5 rounded-none"
            id="size"
            type="text"
            options={sizes}
            placeholder="Size"
            onChange={handleChange}
            styles={styles}
          />
        </div>
      </fieldset>
    </div>
  );
};

export default Title;
