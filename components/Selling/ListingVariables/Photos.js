import React, { useContext } from "react";
import { ProductContext } from "../../../context/productContext";
import { AccountContext } from "../../../context/accountContext";
import Effects from "uploadcare-widget-tab-effects";
import Select from "react-select";

const Photos = ({ styles }) => {
  const { productInfo } = useContext(ProductContext);

  return (
    <div>
      <fieldset className="px-4 border-solid border-2 border-taupe w-full">
        <legend className="p-1">PHOTOS</legend>
        <div className="flex">
          <input
            className="p-2 flex-auto w-full"
            placeholder={"How is this item being photographed?"}
          />
        </div>
        <div className="flex">
          <div className="w-1/2 m-1 mb-4">
            <Select
              styles={styles}
              options={[
                { value: "pink", label: "Pinkkkkkkkkkkkkkkkkkkkk" },
                { value: "blue", label: "Blue" },
              ]}
            />
          </div>
          <div className="mt-1 text-black">
            {" "}
            <lr-file-uploader-regular class="uploadcare-settings lr-wgt-common"></lr-file-uploader-regular>
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default Photos;
