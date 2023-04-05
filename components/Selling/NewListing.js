import Image from "next/image";
import Login from "../Account/Login";
import { useContext } from "react";
import { ProductContext } from "../../context/productContext";
import { AccountContext } from "../../context/accountContext";
import Title from "./ListingVariables/Title";
import Type from "./ListingVariables/Type";
import Audience from "./ListingVariables/Audience";
import Ownership from "./ListingVariables/Ownership";
import Photos from "./ListingVariables/Photos";
import Details from "./ListingVariables/Details";
import Staff from "./ListingVariables/Staff";

export default function NewListing({ listing }) {
  const { productInfo } = useContext(ProductContext);
  const { userInfo } = useContext(AccountContext);

  return (
    <div className="flex flex-col justify-center items-center space-y-8 md:flex-row md:items-start md:space-y-0 md:spacex-4 lg:space-x-8 max-w-6xl w-11/12 mx-auto">
      {userInfo.loginStatus ? (
        //  logged in
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
            Add Listing
          </h2>
          <div className="bg-white pb-4">
            <div>
              <div className="max-w-2xl mx-auto py-4 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h3 className="text-xl font-extrabold text-gray-900 mb-6">
                  {productInfo.title}
                </h3>
              </div>
            </div>
            <div className="flex">
              <div className="inline max-w-2xl mx-auto p-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div
                  className={
                    userInfo.userType === "Customer" ||
                    userInfo.userType === "Influencer"
                      ? "hidden "
                      : "" +
                        "grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 z-0"
                  }
                >
                  <Ownership />
                </div>
                <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 z-0">
                  <Type />
                </div>
                <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 z-0">
                  <Audience />
                </div>
                <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 z-0">
                  <Title />
                </div>
              </div>
              <div className="inline max-w-2xl mx-auto p-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div
                  className={
                    userInfo.userType === "Customer" ||
                    userInfo.userType === "Influencer"
                      ? "hidden "
                      : "" +
                        "grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 z-0"
                  }
                >
                  <Photos />
                </div>
                <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 z-0">
                  <Details />
                </div>
                <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 z-0">
                  <Staff />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md border bg-white overflow-hidden shadow-lg md:w-1/2">
          <div className="relative h-full w-full">
            <Login />
          </div>
        </div>
      )}
    </div>
  );
}
