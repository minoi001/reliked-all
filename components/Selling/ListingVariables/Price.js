import React, { useContext, useState } from "react";
import Select from "react-select";
import { ProductContext } from "../../../context/productContext";
import { AccountContext } from "../../../context/accountContext";
const Price = ({ products }) => {
  const { productInfo, updateProductValue } = useContext(ProductContext);
  const { userInfo } = useContext(AccountContext);

  const availabilities = [
    {
      value: true,
      label: "In Stock",
      variable: "availability",
    },
    {
      value: false,
      label: "Sold Out",
      variable: "availability",
    },
  ];
  const handleChange = (event) => {
    console.log(event);
    updateProductValue({ [event.variable]: event.value });
  };

  const handlePriceChange = (variable) => (event) => {
    // logic around higher/lower prices not working
    console.log(event.target.value, variable);
    if (variable === "RRP") {
      if (productInfo.salePrice > 0) {
        alert("Sale price has been cleared as you entered a new RRP");
      }
      updateProductValue({
        [variable]: Number(event.target.value),
        salePrice: 0,
        price: Number(
          event.target.value * productInfo.discount * productInfo.multiplier
        ),
      });
    } else if (event.target.value > productInfo.RRP) {
      alert("RRP cleared as you entered a higher sale price");
      updateProductValue({
        [variable]: Number(event.target.value),
        price: Number(
          event.target.value * productInfo.discount * productInfo.multiplier
        ),
        RRP: 0,
      });
    } else {
      updateProductValue({
        [variable]: Number(event.target.value),
        price: Number(
          event.target.value * productInfo.discount * productInfo.multiplier
        ),
      });
    }
  };

  return (
    <div>
      <fieldset className="px-4 border-solid border-2 border-taupe ">
        <legend className="p-1">PRICE</legend>
        <div className="flex">
          <Select
            className="mb-4 p-2 pr-4 inline w-1/2"
            id="anonymous"
            type="text"
            options={availabilities}
            placeholder="Availability"
            onChange={handleChange}
          />
          <span className="py-4 inline w-1/12">£</span>

          <input
            id="RRP"
            name="RRP"
            className="mb-4 inline w-1/6 "
            placeholder={"RRP"}
            onChange={handlePriceChange("RRP")}
            value={productInfo.RRP}
          />
          {/* <p className="mb-4 py-2 inline">:</p> */}
          <span className="py-4 inline w-1/12">£</span>

          <input
            id="SalePrice"
            className="mb-4 p-2 inline w-1/4"
            placeholder={"Sale Price"}
            onChange={handlePriceChange("salePrice")}
            value={productInfo.salePrice}
          />
          {/* <p className="mb-4 py-2 inline">:</p> */}
          {/* <p className="mb-4 py-2 inline">:</p> */}
          <span className="py-4 inline w-1/12">£</span>
          <input
            className="mb-4 p-2 inline w-1/6"
            placeholder={"Price"}
            disabled={true}
            value={productInfo.price}
          />
        </div>
      </fieldset>
    </div>
  );
};

export default Price;
