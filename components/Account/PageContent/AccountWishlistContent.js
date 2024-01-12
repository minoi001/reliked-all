import { useContext } from "react";
import { AccountContext } from "../../../context/accountContext";

import Image from "next/image";
import Link from "next/link";

export default function AccountWishlistContent() {
  const { userInfo } = useContext(AccountContext);

  return (
    <div className="">
      <h1 className="font-h text-3xl text-center py-3">Wishlist</h1>
      {userInfo.wishlist.lineItems.map((item, index) => (
        <div key={index} className="inline-flex w-1/6">
          <div className="inline">
            <Link
              href={`/products/${item.du.replace(
                "https://reliked.com/products/",
                ""
              )}`}
            >
              <center>
                <Image
                  className="h-36 object-contain p-6 bg-offWhite m-2"
                  src={item.iu}
                  alt={item.dt}
                  width="120"
                  height="120"
                />
                <h2 className="inline px-2">{item.dt}</h2>
              </center>
            </Link>
          </div>
          {/* <div className="mb-2">
            <div key={index} className="inline-flex overflow-x-scroll">
              <center>
                <Image
                  className="h-36 object-contain p-6 bg-offWhite m-2"
                  src={item.iu}
                  alt={item.dt}
                  width="120"
                  height="120"
                />
              </center>
            </div>
          </div> */}
        </div>
      ))}
    </div>
  );
}
