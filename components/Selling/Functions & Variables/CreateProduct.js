import { useContext, useEffect, useRef, useState, useCallback } from "react";
import { createProduct } from "../../../lib/relikedAPI";

const locationID = process.env.SHOPIFY_LOCATION_ID;

export default function CreateProduct(productInfo) {
  createProduct({
    input: {
      bodyHtml: productInfo.description,
      descriptionHtml: productInfo.description,
      images: productInfo.images,
      // {
      //   "altText": "",
      //   "id": "",
      //   "src": ""
      // }
      metafields: productInfo.metafields,
      // {
      //   "description": "",
      //   "id": "",
      //   "key": "",
      //   "namespace": "",
      //   "type": "",
      //   "value": ""
      // }
      options: productInfo.options,
      productType: productInfo.type,
      published: true,
      seo: {
        description: "",
        title: "",
      },
      status: "DRAFT",
      tags: productInfo.tags,
      title: productInfo.title,
      variants: [
        {
          compareAtPrice: productInfo.RRP,
          harmonizedSystemCode: productInfo.HScode,
          inventoryQuantities: [
            {
              availableQuantity: 1,
              locationId: locationID,
            },
          ],
          options: [""],
          position: 1,
          price: productInfo.price,
          requiresShipping: productInfo.requiresShipping,
          weight: productInfo.weight,
        },
      ],
      vendor: productInfo.vendor,
    },
  });
  return;
}
