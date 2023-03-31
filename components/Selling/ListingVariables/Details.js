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
          <div className="block">
            <input className="mb-4 p-2 inline" placeholder={"Condition"} />
            <input className="mb-4 p-2 inline" placeholder={"Description"} />
          </div>
          <div className="block">
            <input className="mb-4 p-2 inline" placeholder={"Packaging"} />
            <input className="mb-4 p-2 inline" placeholder={"Faults"} />
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default Details;
