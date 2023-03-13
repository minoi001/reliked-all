import Image from "next/image";
import Login from "./Login";
import { useContext } from "react";
import { AccountContext } from "../context/accountContext";

export default function AccountPageContent({ account }) {
  const { userInfo } = useContext(AccountContext);

  return (
    <div className="flex flex-col justify-center items-center space-y-8 md:flex-row md:items-start md:space-y-0 md:spacex-4 lg:space-x-8 max-w-6xl w-11/12 mx-auto">
      {userInfo.loginStatus ? (
        "You are logged in"
      ) : (
        <div className="w-full max-w-md border bg-white rounded-2xl overflow-hidden shadow-lg md:w-1/2">
          <div className="relative h-full w-full">
            <Login />
          </div>
        </div>
      )}
    </div>
  );
}
