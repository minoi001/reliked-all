import React, { useContext } from "react";
import { ProductContext } from "../../../context/productContext";
import { AccountContext } from "../../../context/accountContext";
const Photos = ({ products }) => {
  const { productInfo } = useContext(ProductContext);
  const { userInfo } = useContext(AccountContext);

  return (
    <div>
      <fieldset className="px-4 border-solid border-2 border-indigo-600">
        <legend className="p-1">PHOTOS</legend>
        <div className="flex">
          <div className="block">
            <input
              className="mb-4 p-2 flex-auto w-72"
              placeholder={"How is this item being photographed?"}
            />
            <input className="mb-4 p-2" placeholder={"Upload: Choose"} />

            <input className="mb-4 p-2 " placeholder={"Gallery"} />
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default Photos;
