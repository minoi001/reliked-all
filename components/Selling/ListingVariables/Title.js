import React, { useContext, useEffect } from "react";
import Select from "react-select";
import Creatable from "react-select/creatable";

import { ProductContext } from "../../../context/productContext";
import { AccountContext } from "../../../context/accountContext";

const Title = ({ products }) => {
  const {
    productInfo,
    updateProductValue,
    listingVariables,
    getListingVariables,
  } = useContext(ProductContext);
  const { userInfo } = useContext(AccountContext);

  useEffect(() => {
    getListingVariables();
  }, []);

  const brands = listingVariables.brands;
  const colours = listingVariables.colours;
  const sizes = listingVariables.sizes;

  const handleChange = (event) => {
    console.log(event);
    updateProductValue({ [event.variable]: event.value });
  };

  return (
    <div>
      <fieldset className="px-4 border-solid border-2 border-indigo-600 ">
        <legend className="p-1">TITLE</legend>
        <div className="flex">
          <Select
            className="pt-2 pb-6 pr-1 pl-2 inline w-1/5"
            id="type"
            type="text"
            options={brands}
            placeholder="Brand"
            onChange={handleChange}
          />
          {/* <p className="mb-4 py-2 inline">:</p> */}
          <Select
            className="pt-2 pb-2 pr-1 inline w-1/5"
            id="type"
            type="text"
            options={colours}
            placeholder="Colour"
            onChange={handleChange}
          />
          {/* <p className="mb-4 py-2 inline">:</p> */}

          <Creatable
            className="pt-2 pb-2 pr-1 inline w-2/5"
            id="type"
            type="text"
            placeholder={
              userInfo.userType === "Customer" || "Influencer"
                ? "Description"
                : "Copy & paste product title..."
            }
            isCreat
            onChange={handleChange}
          />
          {/* <p className="mb-4 py-2 inline">:</p> */}
          <Select
            className="pt-2 pb-2 pr-2 inline w-1/5"
            id="type"
            type="text"
            options={sizes}
            placeholder="Size"
            onChange={handleChange}
          />
        </div>
      </fieldset>
    </div>
  );
};

export default Title;
