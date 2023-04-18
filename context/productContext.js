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
    availability: null,
    RRP: 0,
    salePrice: 0,
    price: 0,
    discount: 0.5,
    multiplier: 1,
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
    title: "Product Title",
  });

  const [listingVariables, setListingVariables] = useState();

  function updateProductValue(valuesObject) {
    setProductInfo({ ...productInfo, ...valuesObject });
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
