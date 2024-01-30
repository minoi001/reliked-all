import React from "react";
import AddToWishlist from "../Assets/AddToWishlist.svg"; // relative path to image
import InWishlist from "../Assets/InWishlist.svg"; // relative path
import { useContext } from "react";
import { AccountContext } from "../../context/accountContext";
import Image from "next/image";

const WishlistButton = ({ itemInfo }) => {
  const { userInfo } = useContext(AccountContext);
  console.log(userInfo.wishlist.lineItemIds);
  console.log(itemInfo);
  console.log(InWishlist.src, AddToWishlist.src);
  const wishlistButton = () => {
    console.log("wishlist button clicked");
  };
  return (
    <div>
      {userInfo.wishlist.lineItemIds.includes(itemInfo.productId) ? (
        <Image
          src={InWishlist.src}
          width="30"
          height="30"
          alt={itemInfo.productId}
        />
      ) : (
        <Image
          src={AddToWishlist.src}
          width="30"
          height="30"
          alt={itemInfo.productId}
        />
      )}
    </div>
  );
};

export default WishlistButton;
