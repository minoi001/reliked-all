import { useEffect, useState } from "react";

import ProductCard from "../../Products/ProductCard";
import { getWishlistItems } from "../../../lib/swym";

export default function AccountWishlistContent() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const fetchData = async () => {
    const wishlistItemData = await getWishlistItems(
      localStorage.wishlistSessionid,
      localStorage.wishlistRegid,
      localStorage.wishlistId
    );
    setWishlistItems(wishlistItemData?.items || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="md:pl-6">
      <h1 className="font-h text-3xl text-center py-3">Wishlist</h1>
      <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 ">
        {wishlistItems.map((item, index) => (
          <div key={index}>
            {item.empi ? (
              <div key={index}>
                <ProductCard
                  className="m-2"
                  hit={{
                    title: item.dt,
                    image: item.iu,
                    price: item.pr,
                    handle: item.du
                      .replace("https://reliked.com/products/", "")
                      .split("?")[0],
                    body_html_safe: "",
                    objectID: item.epi,
                    id: item.empi,
                  }}
                />
              </div>
            ) : (
              <div key={index}>
                <ProductCard className="m-2" hit={item} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
