import NewListing from "../components/Selling/NewListing";
import { getNewInProducts, getProduct } from "../lib/shopify.js";

import { AccountContext } from "../context/accountContext";
import { useContext } from "react";
import Login from "../components/Account/Login";
import Link from "next/link";

export default function Selling({ product }) {
  const { userInfo } = useContext(AccountContext);
  return (
    <div>
      {userInfo.loginStatus ? (
        <div className="flex flex-col justify-center items-center space-y-8 md:flex-row md:items-start md:space-y-0 md:spacex-4 lg:space-x-8 max-w-6xl w-full mx-auto ">
          <div className="p-2 shadow-lg flex flex-col w-full md:w-1/3 bg-white">
            <h1 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sell With Us
            </h1>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/selling/add-listing"
                className="bg-cream px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-taupe hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-almostBlack"
              >
                Upload an item
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="minh-screen py-12 sm:pt-20">
          <Login />
        </div>
      )}
    </div>
  );
}
