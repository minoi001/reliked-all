import React, { useContext } from "react";
import Select from "react-select";

import { ProductContext } from "../../../context/productContext";
import { AccountContext } from "../../../context/accountContext";
const Audience = ({ styles }) => {
  const { productInfo, updateProductValue } = useContext(ProductContext);
  const { userInfo } = useContext(AccountContext);

  const ages = [
    {
      value: "Adult",
      label: "Adult",
      variable: "age",
    },
    { value: "Kids", label: "Kids", variable: "age" },
  ];

  const categories = [
    {
      value: "Womens (Girls)",
      label: "Womens (Girls)",
      variable: "gender",
    },
    { value: "Mens (Boys)", label: "Mens (Boys)", variable: "gender" },
  ];

  const handleChange = (event) => {
    updateProductValue({ [event.variable]: event.value });
  };

  return (
    <div>
      <fieldset className="px-4 border-solid border-2 border-taupe ">
        <legend className="p-1">{"AUDIENCE"}</legend>
        <div className="flex">
          <Select
            className="mb-4 p-2 inline w-1/2"
            id="type"
            type="text"
            options={ages}
            placeholder="Age"
            onChange={handleChange}
            styles={styles}
          />
          {/* <p className="mb-4 py-2 inline">:</p> */}
          <Select
            className="mb-4 p-2 inline w-1/2"
            id="type"
            type="text"
            options={categories}
            placeholder="Category"
            onChange={handleChange}
            styles={styles}
          />
        </div>
      </fieldset>
    </div>
  );
};

export default Audience;
