import { createContext, useState, useEffect } from "react";
import { createCheckout, updateCheckout } from "../lib/shopify";

const ProductContext = createContext();

export default function ProductProvider({ children }) {
  const [productInfo, setProductInfo] = useState({
    barcode: "",
    barcodeURL: "",
    variantID: "",
    photography: "",
    styleName: "",
    photosCount: 0,
    cdnLink: "",
    imageVariables: [
      {
        src: "",
      },
    ],
    additionalDetails: "",
    type: "",
    RRP: "",
    price: "",
    condition: "",
    faults: "",
    packaging: "",
    age: "",
    influencer: "",
    anonymous: "No",
    gender: "",
    brand: "",
    colour: "",
    size: "",
    occasion: [],
    sleeveLength: "",
    dressType: "",
    trouserFit: "",
    bottomsRise: "",
    bagType: [],
    tags: [],
    description: "",
    SKU: "",
  });

  function updateProductValue(value, label) {
    setProductInfo({ ...productInfo, [productInfo[label]]: value });
  }

  return (
    <ProductContext.Provider
      value={{
        productInfo,
        setProductInfo,
        updateProductValue,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

const ProductConsumer = ProductContext.Consumer;

export { ProductConsumer, ProductContext };
