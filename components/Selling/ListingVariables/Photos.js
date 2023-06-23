import React, { useContext, useState } from "react";
import { ProductContext } from "../../../context/productContext";
import { AccountContext } from "../../../context/accountContext";
import Select from "react-select";
import PhotoUploader from "./PhotoUploader";

const Photos = ({ styles }) => {
  const { productInfo } = useContext(ProductContext);
  let { cdnUrl, setCdnUrl } = useState("");

  return (
    <div className="">
      <fieldset className="px-4 border-solid border-2 border-taupe w-full">
        <legend className="p-1">PHOTOS</legend>
        <div className="flex">
          <input
            className="p-2 flex-auto w-full"
            placeholder={"How is this item being photographed?"}
          />
        </div>
        <div className="">
          <div className="w-full m-1 mb-4">
            <Select
              styles={styles}
              options={[
                { value: "pink", label: "Pinkkkkkkkkkkkkkkkkkkkk" },
                { value: "blue", label: "Blue" },
              ]}
            />
          </div>
          <div className="mt-1 text-black">
            {/* <PhotoUploader /> */}
            {/* photo uploading erroring, asked uploadcare */}
            {/* <lr-file-uploader-regular class="uploadcare-settings lr-wgt-common"></lr-file-uploader-regular>
            <template id="output-template">
              <h3>Files uploaded:</h3>
              <div repeat="filesData">
                <lr-img width="300" set="@uuid: uuid"></lr-img>
                <div>
                  <a set="@href: cdnUrl"></a>
                </div>
              </div>
            </template>
            <lr-data-output
              use-console
              use-event
              use-template="#output-template"
            >
              {" "}
            </lr-data-output> */}
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default Photos;
