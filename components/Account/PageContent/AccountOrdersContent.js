import { useContext } from "react";
import { AccountContext } from "../../../context/accountContext";

import Image from "next/image";

export default function AccountOrdersContent() {
  const { userInfo } = useContext(AccountContext);

  return (
    <div className="">
      <h1 className="font-h text-3xl text-center py-3">Order History</h1>
      {userInfo.orderHistory.map((order, index) => (
        <div key={index}>
          <div className="inline">
            <h2 className="inline px-2">Order ID: {order.node.name}</h2>
            <p className="inline px-2">
              Date: {new Date(order.node.createdAt).toLocaleDateString()}
            </p>
            <p className="inline px-2">
              Total Price: {order.node.totalPriceV2.amount}{" "}
              {order.node.totalPriceV2.currencyCode}
            </p>
          </div>
          <div className="mb-2">
            {order.node.lineItems.edges.map((item, index) => (
              <div key={index} className="inline-flex overflow-x-scroll">
                <center>
                  <Image
                    className="h-36 object-contain p-6 bg-offWhite m-2"
                    src={item.node.variant.image.src}
                    alt={item.node.title}
                    width="120"
                    height="120"
                  />
                </center>
                {/* <h3>{item.node.title}</h3>
                <p>Quantity: {item.node.quantity}</p>
                <p>Price: {item.node.discountedTotalPrice.amount}</p> */}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
