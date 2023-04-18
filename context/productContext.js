import { createContext, useState, useEffect } from "react";
import { createCheckout, updateCheckout } from "../lib/shopify";
import { getBrandVariables } from "../lib/relikedAPI";

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

  const [listingVariables, setListingVariables] = useState({
    brands: [],
    influencers: [],
    types: [],
  });

  function updateProductValue(valuesObject) {
    setProductInfo({ ...productInfo, ...valuesObject });
  }

  const getListingVariables = async () => {
    let brandVariables = await getBrandVariables();
    updateListingVariables({ brands: brandVariables });
  };

  function updateListingVariables(valuesObject) {
    setListingVariables({ ...listingVariables, ...valuesObject });
  }

  return (
    <ProductContext.Provider
      value={{
        productInfo,
        setProductInfo,
        updateProductValue,
        listingVariables,
        setListingVariables,
        getListingVariables,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

const ProductConsumer = ProductContext.Consumer;

export { ProductConsumer, ProductContext };
