import { useContext } from "react";
import { AccountContext } from "../../../context/accountContext";

import Image from "next/image";
import ProductCard from "../../Products/ProductCard";
import { getProductHandleByVariant } from "../../../lib/shopify";

export default function AccountOrdersContent() {
  const { userInfo } = useContext(AccountContext);

  return (
    <div className="md:pl-6">
      <h1 className="font-h text-3xl text-center py-3">Order History</h1>
      {userInfo.orderHistory.map((order, index) => {
        return (
          <div key={index} className="">
            <div className="py-4">
              {" "}
              <h2 className="inline px-2 pt ">Order ID: {order.node.name}</h2>
              <p className="inline px-2">
                Date: {new Date(order.node.createdAt).toLocaleDateString()}
              </p>
              <p className="inline px-2">
                Total Price: {order.node.totalPriceV2.amount}{" "}
                {order.node.totalPriceV2.currencyCode}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 ">
              {order.node.lineItems.edges.map((item, index) => {
                return (
                  <div key={index} className="">
                    <ProductCard
                      className="m-2"
                      hit={{
                        title: item.node.title,
                        image: item.node.variant.image?.src
                          ? item.node.variant.image.src
                          : "https://cdn.shopify.com/s/files/1/2481/5934/files/color-gold.png?v=1613519126",
                        price: item.node.discountedTotalPrice.amount,
                        handle: item.node.title
                          .toLowerCase()
                          .replaceAll("  ", " ")
                          .replaceAll(" ", "-")
                          .replace(
                            /[!@#$%^&*()_+={}\[\]:;<>,.?\/\\|`\s]/g,
                            "-"
                          ),
                        body_html_safe: "",
                        objectID: item.node.id,
                        id: item.node.variant.id,
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
