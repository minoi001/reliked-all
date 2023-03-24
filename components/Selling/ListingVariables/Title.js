import React, { useContext } from "react";
import { ProductContext } from "../../../context/productContext";
import { AccountContext } from "../../../context/accountContext";
const Title = ({ products }) => {
  const { productInfo } = useContext(ProductContext);
  const { userInfo } = useContext(AccountContext);

  return (
    <div>
      <fieldset className="px-4 border-solid border-2 border-indigo-600 ">
        <legend className="p-1">TITLE</legend>
        <div className="flex">
          <input className="mb-4 p-2 inline w-16" placeholder={"Brand"} />
          <p className="mb-4 py-2 inline">:</p>
          <input className="mb-4 p-2 inline w-16" placeholder={"Colour"} />
          <p className="mb-4 py-2 inline">:</p>

          <input
            className="mb-4 p-2 inline w-12"
            placeholder={
              userInfo.userType === "Customer" || "Influencer"
                ? "Description"
                : "Copy & paste product title..."
            }
          />
          <p className="mb-4 py-2 inline">:</p>
          <input className="mb-4 p-2 inline w-16" placeholder={"Size"} />
        </div>
      </fieldset>
    </div>
  );
};

export default Title;
