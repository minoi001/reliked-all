import React, { useContext } from "react";
import { ProductContext } from "../../../context/productContext";
import { AccountContext } from "../../../context/accountContext";
import { Widget } from "@uploadcare/react-widget";
import Effects from "uploadcare-widget-tab-effects";

const Photos = ({ products }) => {
  const { productInfo } = useContext(ProductContext);
  const { userInfo } = useContext(AccountContext);

  return (
    <div>
      <fieldset className='px-4 border-solid border-2 border-indigo-600 w-full'>
        <legend className='p-1'>PHOTOS</legend>
        <div className='flex'>
          <input
            className='mb-4 p-2 flex-auto w-full'
            placeholder={"How is this item being photographed?"}
          />
        </div>
        <div className='flex'>
          <div className='mb-4 p-2 -mt-2 w-full text-black bg-indigo-600'>
            <Widget
              previewStep
              publicKey={process.env.UPLOADCARE_PUBLIC_KEY}
              multiple='true'
              effects='rotate,mirror,flip'
              customTabs={{ preview: Effects }}
              imagesOnly='true'
              onChange={(data) => {
                console.log(data);
                props.setPhotosCount(data.count);
                props.setCdnLink(data.url);
                getURL(data.cdnUrl, data.count);
              }}
              imageShrink='1334x1559 100%'
              style='backgroundColor: #000000;'
              className='bg-rose'
            />
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default Photos;
