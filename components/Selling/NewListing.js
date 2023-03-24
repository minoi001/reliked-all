import Image from "next/image";
import Login from "./Login";
import { useContext } from "react";
import { productContext } from "../context/productContext";
import { accountContext } from "../context/accountContext";

export default function NewListing({ listing }) {
  const { productInfo } = useContext(productContext);
  const { userInfo } = useContext(accountContext);

  return (
    <div className="flex flex-col justify-center items-center space-y-8 md:flex-row md:items-start md:space-y-0 md:spacex-4 lg:space-x-8 max-w-6xl w-11/12 mx-auto">
      {userInfo.loginStatus ? (
        //  logged in
        <div>Add new listing</div>
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
