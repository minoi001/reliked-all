import React, { useContext } from "react";
import Select from "react-select";

import { ProductContext } from "../../../context/productContext";
import { AccountContext } from "../../../context/accountContext";
const Type = ({ styles }) => {
  const {
    productInfo,
    updateProductValue,
    listingVariables,
    getListingVariables,
  } = useContext(ProductContext);
  const { userInfo } = useContext(AccountContext);

  const types = listingVariables.types;

  const handleChange = (event) => {
    console.log(event);
    updateProductValue({ ["type"]: event.value });
  };

  return (
    <div>
      <fieldset className="px-4 border-solid border-2 border-taupe ">
        <legend className="p-1">TYPE</legend>
        <div className="flex">
          <Select
            className="mb-4 p-2 inline w-full"
            id="type"
            type="text"
            options={types}
            placeholder="What are you listing?"
            onChange={handleChange}
            styles={styles}
          />
        </div>
      </fieldset>
    </div>
  );
};

export default Type;
