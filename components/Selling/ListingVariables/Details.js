import React, { useContext } from "react";
import { ProductContext } from "../../../context/productContext";
import { AccountContext } from "../../../context/accountContext";
import Select from "react-select";

const Details = ({ styles }) => {
  const { productInfo, updateProductValue, listingVariables } =
    useContext(ProductContext);
  const { userInfo } = useContext(AccountContext);

  const conditions = [
    {
      value: "Never Worn/Used",
      label: "Never Worn/Used",
      variable: "condition",
    },
    {
      value: "Hardly Worn/Used",
      label: "Hardly Worn/Used",
      variable: "condition",
    },
  ];

  const packagings = [
    {
      value: "In Box",
      label: "In Box",
      variable: "packaging",
    },
    {
      value: "With Tags",
      label: "With Tags",
      variable: "packaging",
    },
  ];

  const handleChange = (event) => {
    updateProductValue({ [event.variable]: event.value });
  };

  return (
    <div>
      <fieldset className="px-4 border-solid border-2 border-taupe ">
        <legend className="p-1">DETAILS</legend>
        <div className="flex">
          <Select
            className="m-1 inline w-1/2"
            id="condition"
            type="text"
            options={conditions}
            placeholder="Condition"
            onChange={handleChange}
            styles={styles}
          />
          <Select
            className="m-1 inline w-1/2"
            id="packaging"
            type="text"
            options={packagings}
            placeholder="Packaging"
            onChange={handleChange}
            styles={styles}
          />
        </div>
        <div className="flex">
          {/* <input
              className="mb-4 p-2 inline w-full"
              placeholder={"Condition"}
            /> */}
          {/* <input className="mb-4 p-2 inline w-full" placeholder={"Packaging"} /> */}
          <input
            className="p-1.5 pl-2.5 inline w-1/2 m-1 border-cream active:border-cream focus:border-taupe hover:border-taupe focus:ring-0"
            id="description"
            type="text"
            placeholder={"More Information"}
            onChange={handleChange}
          />
          <input
            className="p-1.5 pl-2.5 inline w-1/2 m-1 border-cream active:border-cream focus:border-taupe hover:border-taupe focus:ring-0"
            id="description"
            type="text"
            placeholder={"Faults"}
            onChange={handleChange}
          />
        </div>
        {/* additional details */}
        <div className="flex mb-4">
          {/* <input
              className="mb-4 p-2 inline w-full"
              placeholder={"Condition"}
            /> */}
          {/* <input className="mb-4 p-2 inline w-full" placeholder={"Packaging"} /> */}
          <input
            className="p-1.5 pl-2.5 inline w-1/2 m-1 border-cream active:border-cream focus:border-taupe hover:border-taupe focus:ring-0"
            id="description"
            type="text"
            placeholder={"Sleeve Length"}
            onChange={handleChange}
          />
          <input
            className="p-1.5 pl-2.5 inline w-1/2 m-1 border-cream active:border-cream focus:border-taupe hover:border-taupe focus:ring-0"
            id="description"
            type="text"
            placeholder={"Faults"}
            onChange={handleChange}
          />
        </div>
      </fieldset>
    </div>
  );
};

export default Details;
