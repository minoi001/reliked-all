import { createContext, useState, useEffect } from "react";
import { createCheckout, updateCheckout } from "../lib/shopify";
import {
  getBrandVariables,
  getColourVariables,
  getInfluencerVariables,
  getSizeVariables,
  getTypeVariables,
} from "../lib/relikedAPI";

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

  function updateProductValue(valuesObject) {
    setProductInfo({ ...productInfo, ...valuesObject });
  }

  const [listingVariables, setListingVariables] = useState({
    brands: [],
    colours: [],
    influencers: [],
    sizes: [],
    types: [],
  });

  const getListingVariables = async () => {
    let brandVariables = await getBrandVariables();
    let colourVariables = await getColourVariables();
    let influencerVariables = await getInfluencerVariables();
    let sizeVariables = await getSizeVariables();
    let typeVariables = await getTypeVariables();
    updateListingVariables({
      brands: brandVariables,
      colours: colourVariables,
      influencers: influencerVariables,
      sizes: sizeVariables,
      types: typeVariables,
    });
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
