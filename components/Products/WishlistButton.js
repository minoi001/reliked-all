import React from "react";
import AddToWishlist from "../Assets/AddToWishlist.svg"; // relative path to image
import InWishlist from "../Assets/InWishlist.svg"; // relative path
import { useContext } from "react";
import { AccountContext } from "../../context/accountContext";
import Image from "next/image";
import { VALID_LOADERS } from "next/dist/shared/lib/image-config";

const WishlistButton = ({ itemInfo }) => {
  const { userInfo, updateWishlistItem } = useContext(AccountContext);
  //   console.log(userInfo.wishlist.lineItemIds);
  //   console.log(itemInfo);
  //   console.log(InWishlist.src, AddToWishlist.src);
  const wishlistButton = (itemInfo, reqType) => {
    const request = {
      productId: Number(itemInfo.productId),
      variantId: Number(itemInfo.variantId),
      handle: itemInfo.handle,
      reqType: reqType,
    };
    updateWishlistItem(request);
  };

  return (
    <div>
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
