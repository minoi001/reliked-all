import React, { useContext } from "react";
import { ProductContext } from "../../../context/productContext";
import { AccountContext } from "../../../context/accountContext";
const Ownership = ({ products }) => {
  const { productInfo } = useContext(ProductContext);
  const { userInfo } = useContext(AccountContext);

  return (
    <div>
      <fieldset className="px-4 border-solid border-2 border-indigo-600 ">
        <legend className="p-1">{"OWNERSHIP"}</legend>
        <div className="flex">
          <input className="mb-4 p-2 inline w-24" placeholder={"Influencer"} />
          <p className="mb-4 py-2 inline">:</p>
          <input className="mb-4 p-2 inline w-24" placeholder={"Anonymous"} />
        </div>
      </fieldset>
    </div>
  );
};

export default Ownership;
