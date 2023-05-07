import React from "react";

let SKUzone = "*****-";
let SKUaisle = "*-";
let SKUbay = "****-";
let SKUwkyr = "****-";
let SKUinfluencer = "****-";
let SKUlister = "****-";
let SKUnum = "00000-";
let SKUcon = "***-";
let SKUpack = "***";
let SKUarray = [];

export const SKU = (product, user) => {
  // https://stackoverflow.com/questions/32888728/correct-way-to-share-functions-between-components-in-react
  SKUarray = [];
  if (product.type.includes("Fashion  >  Clothing")) {
    if (product.week.slice(1) === "1") {
      SKUaisle = "E-";
    } else if (product.week.slice(1) === "2") {
      SKUaisle = "F-";
    } else if (product.week.slice(1) === "3") {
      SKUaisle = "G-";
    } else if (product.week.slice(1) === "4") {
      SKUaisle = "H-";
    } else if (product.week.slice(1) === "5") {
      SKUaisle = "I-";
    } else if (product.week.slice(1) === "6") {
      SKUaisle = "J-";
    } else if (product.week.slice(1) === "7") {
      SKUaisle = "K-";
    } else if (product.week.slice(1) === "8") {
      SKUaisle = "L-";
    } else if (product.week.slice(1) === "9") {
      SKUaisle = "M-";
    } else if (product.week.slice(1) === "0") {
      SKUaisle = "N-";
    }
  } else {
    if (product.week.slice(1) === "1") {
      SKUaisle = "A-";
    } else if (product.week.slice(1) === "2") {
      SKUaisle = "B-";
    } else if (product.week.slice(1) === "3") {
      SKUaisle = "C-";
    } else if (product.week.slice(1) === "4") {
      SKUaisle = "D-";
    } else if (product.week.slice(1) === "5") {
      SKUaisle = "E-";
    } else if (product.week.slice(1) === "6") {
      SKUaisle = "F-";
    } else if (product.week.slice(1) === "7") {
      SKUaisle = "G-";
    } else if (product.week.slice(1) === "8") {
      SKUaisle = "H-";
    } else if (product.week.slice(1) === "9") {
      SKUaisle = "I-";
    } else if (product.week.slice(1) === "0") {
      SKUaisle = "J-";
    }
  }
  if (product.age === "Kids" || product.type.includes("Baby & Child")) {
    // Kids
    SKUzone = "-KIDS-";
  } else {
    if (product.type.includes("Home")) {
      // Home
      SKUzone = "!HOME-";
    } else if (product.type.includes("Beauty")) {
      // Beauty
      SKUzone = "*BEAU-";
    } else if (tproduct.ype.includes("Accessories")) {
      // Accessories
      if (product.RRP >= 150) {
        SKUzone = "@LUXA-";
      } else {
        SKUzone = "!S&AC-";
      }
    } else if (product.type.includes("Shoes")) {
      // Shoes
      if (product.RRP >= 150) {
        SKUzone = "@LUXA-";
        SKUaisle = "S-";
      } else {
        SKUzone = "!S&AC-";
      }
    } else {
      // Clothing
      if (product.RRP >= 150) {
        SKUzone = ":LUXE-";
      } else {
        if (product.type.includes("Fashion  >  Clothing  >  Out")) {
          SKUzone = "&MAIN-";
        } else {
          SKUzone = "#MAIN-";
        }
      }
      if (product.type.includes("Tops")) {
        SKUbay = "TOPS-";
      } else if (type.includes("Bottoms")) {
        SKUbay = "BOTS-";
      } else if (type.includes("Outfits")) {
        SKUbay = "DRES-";
      } else if (type.includes("Outerwear")) {
        SKUbay = "COAT-";
      }
    }
  }
  if (product.condition === "Never Worn") {
    SKUcon = "NVR-";
  } else if (product.condition === "Hardly Worn") {
    SKUcon = "HAR-";
  } else if (product.condition === "Pre-worn") {
    SKUcon = "PRE-";
  } else if (product.condition === "Sold As Seen") {
    SKUcon = "SAS-";
  } else if (product.condition === "Never Used") {
    SKUcon = "NVR-";
  } else if (product.condition === "Hardly Used") {
    SKUcon = "HAR-";
  } else if (product.condition === "Used") {
    SKUcon = "PRE-";
  }
  if (product.packaging === "Unpackaged") {
    SKUpack = "UNP";
  } else if (product.packaging === "With Tags") {
    SKUpack = "TAG";
  } else if (product.packaging === "Sealed") {
    SKUpack = "SEA";
  } else if (product.packaging === "With Dust Bag") {
    SKUpack = "DUS";
  } else if (product.packaging === "In Damaged Box") {
    SKUpack = "DOX";
  } else if (product.packaging === "In Box") {
    SKUpack = "BOX";
  }
  SKUinfluencer = `${product.influencer.slice(0, 4)}-`;
  SKUlister = `${user.listerCode}-`;
  SKUnum = `${product.itemCode}-`;
  SKUwkyr = `${product.wkYr}-`;
  SKUarray.push(
    SKUzone,
    SKUaisle,
    SKUbay,
    SKUwkyr,
    SKUinfluencer,
    SKUlister,
    SKUnum,
    SKUcon,
    SKUpack,
  );
  return SKUarray;
};
