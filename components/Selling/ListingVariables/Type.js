import React, { useContext } from "react";
import { ProductContext } from "../../../context/productContext";
import { AccountContext } from "../../../context/accountContext";
const Type = ({ products }) => {
  const { productInfo } = useContext(ProductContext);
  const { userInfo } = useContext(AccountContext);

  return (
    <div>
      <fieldset className="px-4 border-solid border-2 border-indigo-600 ">
        <legend className="p-1">TYPE</legend>
        <input
          className="mb-4 p-2 w-full"
          placeholder={"What are you listing?"}
        />
      </fieldset>
    </div>
  );
};

export default Type;
