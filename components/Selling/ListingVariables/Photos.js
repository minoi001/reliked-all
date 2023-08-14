import React, { useContext, useState } from "react";
import { ProductContext } from "../../../context/productContext";
import { AccountContext } from "../../../context/accountContext";
import Select from "react-select";
import PhotoUploader from "./PhotoUploader";

const Photos = ({ styles }) => {
  const { productInfo, updateProductValue, listingVariables } =
    useContext(ProductContext);
  const { userInfo } = useContext(AccountContext);
  let { cdnUrl, setCdnUrl } = useState("");

  const handleChange = (event) => {
    console.log(event);
    updateProductValue({ [event.variable]: event.value });
  };

  return (
    <div className="photos">
      {/* <div className="flex">
          <input
            className="p-2 flex-auto w-full bg-white"
            placeholder={"How is this item being photographed?"}
            disabled
          />
        </div> */}
      <div className="">
        <div className="w-full ml-2 pr-3.5 mt-1 mb-4">
          <Select
            styles={styles}
            placeholder={"How is this item being photographed?"}
            options={[
              {
                value: "DeskPhoto",
                label: "Photographed at my desk",
                variable: "photography",
              },
              {
                value: "MachinePhoto",
                label: "Sent to be photographed",
                variable: "photography",
              },
              {
                value: "StockPhoto",
                label: "Photo found online & uploaded",
                variable: "photography",
              },
            ]}
            onChange={handleChange}
          />
        </div>

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
  );
};

export default Photos;
