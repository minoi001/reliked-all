import React, { useContext, useState } from "react";
import Select from "react-select";
import { ProductContext } from "../../../context/productContext";
import { AccountContext } from "../../../context/accountContext";
const Price = ({ styles }) => {
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
    updateProductValue({ [event.variable]: event.value });
  };

  const handlePriceChange = (variable) => (event) => {
    // logic around higher/lower prices not working
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
      <fieldset className="px-4 border-2 border-taupe">
        <legend className="p-1">PRICING</legend>
        <div className="sm:flex mb-4 ">
          <Select
            className="inline w-full rounded-none"
            id="availability"
            name="availability"
            type="text"
            options={availabilities}
            placeholder="Availability"
            onChange={handleChange}
            styles={styles}
          />
          <fieldset className="pl-1 sm:inline sm:w-2/3 sm:-mt-2 sm:ml-2 sm:mr-1 max-sm:my-2 max-sm:pb-1 border border-cream">
            <legend className="pl-1 text-xs">RRP</legend>

            <div className="inline-flex pl-1">
              <span className="inline px-1">£</span>
              <input
                className="inline w-full bg-white focus:ring-0 focus:outline-none"
                name="RRP"
                id="RRP"
                placeholder={"RRP"}
                onChange={handlePriceChange("RRP")}
                value={productInfo.RRP}
              />
            </div>
          </fieldset>

          <fieldset className="pl-1 sm:inline sm:w-2/3 sm:-mt-2 sm:ml-2 sm:mr-1 max-sm:my-2 max-sm:pb-1 border border-cream">
            <legend className="pl-1 text-xs">Sale Price</legend>

            <div className="inline-flex pl-1">
              <span className="inline px-1">£</span>
              <input
                className="inline w-full bg-white focus:ring-0 focus:outline-none"
                name="SalePrice"
                id="SalePrice"
                placeholder={"Sale Price"}
                onChange={handlePriceChange("salePrice")}
                value={productInfo.salePrice}
              />
            </div>
          </fieldset>
          <fieldset className="pl-1 sm:inline sm:w-2/3 sm:-mt-2 sm:ml-2 sm:mr-1 max-sm:my-2 max-sm:pb-1 border border-cream">
            <legend className="pl-1 text-xs">Price</legend>

            <div className="inline-flex pl-1 text-taupe">
              <span className="inline px-1">£</span>
              <input
                className="inline w-full bg-white focus:ring-0 focus:outline-none"
                name="price"
                id="price"
                placeholder={"Price"}
                disabled={true}
                value={productInfo.price}
              />
            </div>
          </fieldset>
          {/* <p className="mb-4 py-2 inline">:</p> */}
        </div>
      </fieldset>
    </div>
  );
};

export default Price;
