import { useContext } from "react";
import { AccountContext } from "../../../context/accountContext";
export default function AccountOrdersContent() {
  const { userInfo } = useContext(AccountContext);

  return (
    <div className="text-center ">
      <h1 className="font-h text-3xl text-center pt-6">Orders</h1>
      <ul>
        {userInfo.orderHistory.map((order) => (
          <li key={order.node.id}>
            Order: {order.node.name}, Total: {order.node.totalPriceV2.amount}{" "}
            {order.node.totalPriceV2.currencyCode}, Date: {order.node.createdAt}
          </li>
        ))}
      </ul>
    </div>
  );
}
