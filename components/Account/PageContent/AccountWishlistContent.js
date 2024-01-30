import { useContext } from "react";
import { AccountContext } from "../../../context/accountContext";

import Image from "next/image";
import Link from "next/link";
import ProductCard from "../../Products/ProductCard";

export default function AccountWishlistContent() {
  const { userInfo } = useContext(AccountContext);
  return (
    <div className="md:pl-6">
      <h1 className="font-h text-3xl text-center py-3">Wishlist</h1>
      <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 ">
        {userInfo.wishlist.lineItems.map((item, index) => (
          <div key={index}>
            <ProductCard
              className="m-2"
              hit={{
                title: item.dt,
                image: item.iu,
                price: item.pr,
                handle: item.du.replace("https://reliked.com/products/", ""),
                body_html_safe: "",
                objectID: item.epi,
                id: item.empi,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
