import React, { useEffect, useState } from "react";
import AddToWishlist from "../Assets/AddToWishlist.svg"; // relative path to image
import InWishlist from "../Assets/InWishlist.svg"; // relative path
import Image from "next/image";
import { updateSwymWishlist } from "../../lib/swym";

const WishlistButton = ({ itemInfo }) => {
  const [inWishlist, setInWishlist] = useState(false);
  const wishlistItemIds = sessionStorage.getItem("wishlistItemsIds") ?? [];

  useEffect(() => {
    setInWishlist(wishlistItemIds?.includes(itemInfo.productId));
  }, [wishlistItemIds, itemInfo.productId]);

  const wishlistButton = async (itemInfo, reqType) => {
    if (localStorage.wishlistId) {
      const request = {
        type: `${reqType}`,
        string: `[{"epi":${Number(itemInfo.variantId)},"empi":${Number(
          itemInfo.productId
        )},"du":"https://e-bloggers.myshopify.com/${itemInfo.handle}"}]`,
      };
      await updateSwymWishlist(
        localStorage.wishlistSessionid,
        localStorage.wishlistRegid,
        localStorage.wishlistId,
        request
      );
    } else {
      // TODO: If no wishlist exists, create one or retrieve the wishlist id
    }
  };

  return (
    <div className="cursor-pointer">
      {inWishlist ? (
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
