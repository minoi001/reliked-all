import React from "react";
import { ReactSVG } from "react-svg";
import BookmarkIcon from "../Assets/Wishlist-Bookmark.svg"; // relative path to image
import { useContext } from "react";
import { AccountContext } from "../../context/accountContext";

const WishlistButton = ({ itemInfo }) => {
  const { userInfo } = useContext(AccountContext);
  //   console.log(userInfo.wishlist.lineItemIds);
  console.log(itemInfo);

  const wishlistButton = () => {
    console.log("wishlist button clicked");
  };
  return (
    <div>
      <div className="ml-auto p-4">
        {userInfo.wishlist.lineItemIds.includes(itemInfo.productId) ? (
          <ReactSVG
            src={BookmarkIcon.src}
            className="w-6 h-6 fill-current text-white -mt-60 cursor-pointer"
            beforeInjection={(svg) => {
              svg.classList.add("svg-class-name");
              svg.setAttribute("style", "width: 30px");
            }}
            onClick={wishlistButton}
          />
        ) : (
          "item not in wishlist"
        )}
      </div>
    </div>
  );
};

export default WishlistButton;
