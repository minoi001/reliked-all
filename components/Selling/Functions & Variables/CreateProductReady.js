import { useContext, useEffect, useRef, useState, useCallback } from "react";
import CreateProduct from "./CreateProduct";

const locationID = process.env.SHOPIFY_LOCATION_ID;

export default function CreateProductReady(productInfo) {
  let isFormReady = true;
  let errorMessage = "";
  if (!productInfo.photography) {
    isFormReady = false;
    errorMessage = "Please select how this item is being photographed.";
  } else if (productInfo.photography !== "MachinePhoto") {
    if (productInfo.photosCount === 0) {
      isFormReady = false;
      errorMessage =
        "You aren't sending this item to be photographed, please add at least 1 photo.";
    }
    // else {
    //   isFormReady = true;
    // }
  }
  if (!productInfo.description.trim()) {
    isFormReady = false;
    errorMessage = "Please add a product title.";
  }
  if (!productInfo.type) {
    isFormReady = false;
    errorMessage = "Please add a product type.";
  }
  if (!productInfo.RRP) {
    isFormReady = false;
    errorMessage =
      "Please add an RRP (go off of similar items from that brand if you can't find it).";
  }
  if (!productInfo.condition) {
    isFormReady = false;
    errorMessage = "Please add a product condition.";
  }
  if (!productInfo.packaging) {
    isFormReady = false;
    errorMessage = "Please add product packaging.";
  }
  if (!productInfo.influencer) {
    isFormReady = false;
    errorMessage = "Please add an influencer.";
  }
  if (!productInfo.gender) {
    isFormReady = false;
    errorMessage = "Please add a product gender.";
  }
  if (!productInfo.brand.trim()) {
    isFormReady = false;
    errorMessage = "Please add a product brand.";
  }
  if (!productInfo.colour.trim()) {
    isFormReady = false;
    errorMessage = "Please add a product shade/colour.";
  }
  if (!productInfo.size.trim()) {
    isFormReady = false;
    errorMessage = "Please add a product size.";
  }
  if (!productInfo.age) {
    isFormReady = false;
    errorMessage = "Please add a product age.";
  }
  if (productInfo.type.includes("Handbag")) {
    if (productInfo.bagType.length < 1) {
      isFormReady = false;
      errorMessage = "This item is a handbag, please select a bag type.";
    }
  }
  if (productInfo.type.includes("Bottoms")) {
    if (!productInfo.bottomsRise) {
      isFormReady = false;
      errorMessage = "These are bottoms, please select a bottoms rise.";
    }
  }
  if (productInfo.type.includes("Dress")) {
    if (!productInfo.dressType) {
      isFormReady = false;
      errorMessage = "This item is a dress, please select a dress type.";
    }
  }
  if (
    productInfo.type.includes("Fashion") &&
    !productInfo.type.includes("Lingerie") &&
    !productInfo.type.includes("Underwear")
  ) {
    if (productInfo.occasion.length < 1) {
      isFormReady = false;
      errorMessage = "This is a fashion item, please select an occasion.";
    }
  }
  if (
    productInfo.type.includes("Tops") ||
    productInfo.type.includes("Outfits")
  ) {
    if (!productInfo.sleeveLength) {
      isFormReady = false;
      errorMessage = "This is a top or outfit, please select a sleeve length.";
    }
  }
  if (
    productInfo.type.includes("Trousers") ||
    productInfo.type.includes("Jeans")
  ) {
    if (!productInfo.trouserFit) {
      isFormReady = false;
      errorMessage =
        "These are trousers or jeans, please select a trouser fit.";
    }
  }
  if (isFormReady === true) {
    CreateProduct(productInfo);
  } else {
    alert(errorMessage);
  }
  return;
}
