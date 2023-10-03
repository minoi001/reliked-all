import { useContext } from "react";
import { AccountContext } from "../../context/accountContext";
import Link from "next/link";

import AccountHomeContent from "./AccountHomeContent";

export default function AccountPageContent() {
  const {
    userInfo,
    setUserInfo,
    getUserInfo,
    sendUserRequest,
    updateUserValue,
  } = useContext(AccountContext);

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
      <div className="md:px-12 align-middle p-2 py-2 w-full bg-white shadow-lg">
        <div className="md:grid md:grid-cols-5 p-4">
          <div className="col-span-1">
            <p className={`m-1 font-black text-sm uppercase px-4 py-2.5 pt-6`}>
              Account Menu
            </p>

            <Link href="/account/details">
              <p className={`m-1 font-medium text-sm px-4 py-2.5 bg-cream`}>
                Personal Details
              </p>
            </Link>
            <Link href="/account/orders">
              <p className={`m-1 font-medium text-sm px-4 py-2.5 bg-cream`}>
                Orders
              </p>
            </Link>
            <Link href="/account/rewards">
              <p className={`m-1 font-medium text-sm px-4 py-2.5 bg-cream`}>
                Rewards
              </p>
            </Link>
            <Link href="/account/wishlist">
              <p className={`m-1 font-medium text-sm px-4 py-2.5 bg-cream`}>
                Wishlist
              </p>
            </Link>
          </div>
          <div className="col-span-4 text-center">
            <AccountHomeContent />
          </div>
        </div>
      </div>
    </div>
  );
}
