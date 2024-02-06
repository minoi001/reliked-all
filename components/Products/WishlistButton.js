import React from "react";
import AddToWishlist from "../Assets/AddToWishlist.svg"; // relative path to image
import InWishlist from "../Assets/InWishlist.svg"; // relative path
import { useContext } from "react";
import { AccountContext } from "../../context/accountContext";
import Image from "next/image";

const WishlistButton = ({ itemInfo, productInfo }) => {
  const { userInfo, updateWishlistItem, updateUserValue } =
    useContext(AccountContext);

  const wishlistButton = async (itemInfo, reqType) => {
    if (localStorage.wishlistId) {
      const request = {
        type: `${reqType}`,
        string: `[{"epi":${Number(itemInfo.variantId)},"empi":${Number(
          itemInfo.productId
        )},"du":"https://e-bloggers.myshopify.com/${itemInfo.handle}"}]`,
      };
      await updateWishlistItem(request);
    } else {
      const updatedWishlist = {
        wishlist: {
          status: true,
          lineItems: [...userInfo.wishlist.lineItems, productInfo],
          lineItemIds: userInfo.wishlist.lineItems.map((item) => item.id),
        },
      };

      updateUserValue(updatedWishlist);

      const itemsArray = userInfo.wishlist.lineItems.map((item) => ({
        epi: Number(item.objectID),
        empi: Number(item.id),
        du: `https://e-bloggers.myshopify.com/${item.handle}`,
      }));

      const request = {
        type: "a",
        string: JSON.stringify(itemsArray),
      };

      await updateWishlistItem(request);
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
          onClick={async () => await wishlistButton(itemInfo, "d")}
        />
      ) : (
        <Image
          src={AddToWishlist.src}
          width="30"
          height="30"
          alt={itemInfo.productId}
          onClick={async () => await wishlistButton(itemInfo, "a")}
        />
      )}
    </div>
  );
};

export default WishlistButton;
