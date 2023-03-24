import React, { useContext } from "react";
import { ProductContext } from "../../../context/productContext";
import { AccountContext } from "../../../context/accountContext";
const Details = ({ products }) => {
  const { productInfo } = useContext(ProductContext);
  const { userInfo } = useContext(AccountContext);

  return (
    <div>
      <fieldset className="px-4 border-solid border-2 border-indigo-600 ">
        <legend className="p-1">DETAILS</legend>
        <div className="flex">
          <input className="mb-4 p-2 inline w-16" placeholder={"Condition"} />
          <p className="mb-4 py-2 inline">:</p>
          <input className="mb-4 p-2 inline w-16" placeholder={"Packaging"} />
          <p className="mb-4 py-2 inline">:</p>

          <input className="mb-4 p-2 inline w-12" placeholder={"Description"} />
          <p className="mb-4 py-2 inline">:</p>
          <input className="mb-4 p-2 inline w-16" placeholder={"Faults"} />
        </div>
      </fieldset>
    </div>
  );
};

export default Details;
