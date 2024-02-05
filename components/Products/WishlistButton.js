import React from "react";
import AddToWishlist from "../Assets/AddToWishlist.svg"; // relative path to image
import InWishlist from "../Assets/InWishlist.svg"; // relative path
import { useContext } from "react";
import { AccountContext } from "../../context/accountContext";
import Image from "next/image";
import { VALID_LOADERS } from "next/dist/shared/lib/image-config";

const WishlistButton = ({ itemInfo, productInfo }) => {
  const { userInfo, updateWishlistItem, updateUserValue } =
    useContext(AccountContext);
  //   console.log(userInfo.wishlist.lineItemIds);
  //   console.log(itemInfo);
  //   console.log(InWishlist.src, AddToWishlist.src);
  const wishlistButton = (itemInfo, reqType) => {
    if (localStorage.wishlistId) {
      const request = {
        type: `${reqType}`,
        string: `[{"epi":${Number(itemInfo.variantId)},"empi":${Number(
          itemInfo.productId
        )},"du":"https://e-bloggers.myshopify.com/${itemInfo.handle}"}]`,
      };
      updateWishlistItem(request);
    } else {
      let array = userInfo.wishlist.lineItems;
      array.push(productInfo);
      let itemsArray = [];
      for (let item of array) {
        itemsArray.push(item.id);
      }

      updateUserValue({
        wishlist: {
          status: true,
          lineItems: array,
          lineItemIds: itemsArray,
        },
      });
      localStorage.setItem(
        "tempWishlistItems",
        JSON.stringify({
          wishlist: {
            status: true,
            lineItems: array,
            lineItemIds: itemsArray,
          },
        })
      );
    }
  };

  return (
    <div className="cursor-pointer">
      {userInfo.wishlist.lineItemIds.includes(itemInfo.productId) ? (
        <Image
          src={InWishlist.src}
          width="30"
          height="30"
          alt={itemInfo.productId}
          onClick={() => wishlistButton(itemInfo, "d")}
        />
      ) : (
        <Image
          src={AddToWishlist.src}
          width="30"
          height="30"
          alt={itemInfo.productId}
          onClick={() => wishlistButton(itemInfo, "a")}
        />
      )}
    </div>
  );
};

export default WishlistButton;
