import { LockClosedIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useContext } from "react";
import { AccountContext } from "../../../context/accountContext";
import Link from "next/link";
import { useState } from "react";
export default function Reset({ reset, id, url }) {
  const {
    userInfo,
    setUserInfo,
    getUserInfo,
    updateUserValue,
    sendRecoveryRequest,
  } = useContext(AccountContext);

  const { tokenObject, setTokenObject } = useState(reset);
  const formInput = async (event) => {
    // console.log(event);
    // console.log(event.nativeEvent.srcElement.name);
    updateUserValue({
      [event.nativeEvent.srcElement.name]: `${event.target.value}`,
    });
  };

  const buttonClick = async (event) => {
    event.preventDefault();

    if (userInfo.newPassword !== userInfo.confirmPassword) {
      updateUserValue({
        errorMessage: `Passwords do not match.`,
      });
    } else {
      console.log(
        "password reset url: " +
          `https://e-bloggers.myshopify.com/account/reset/${reset.customerID}/${reset.token}`
      );
      console.log("passwords match");
    }
  };

  return (
    <>
      {userInfo.checkingLogin ? (
        "Loading"
      ) : userInfo.loginStatus ? (
        <div>You are logged in as {userInfo.userType}</div>
      ) : (
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                {reset.customerID} {` `} {reset.token}
                Update Password
              </h2>

              {userInfo.errorMessage ? (
                <h4 className="mt-6 text-center text-1xl font-bold tracking-tight text-gray-900 bg-red-300 text-red-700">
                  {userInfo.errorMessage}
                </h4>
              ) : (
                ""
              )}
              {userInfo.successMessage ? (
                <h4 className="mt-6 text-center text-1xl font-bold tracking-tight text-gray-900 bg-green-300 text-green-700">
                  {userInfo.successMessage}
                </h4>
              ) : (
                ""
              )}
            </div>
            <form className="mt-8 space-y-3" action="#" method="POST">
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="-space-y-px shadow-sm">
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    autoComplete="password"
                    required
                    className="relative block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-taupe sm:text-sm sm:leading-6"
                    placeholder="New Password"
                    onChange={formInput}
                  />
                </div>
                <div className="pt-1">
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="password"
                    required
                    className="relative block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-taupe sm:text-sm sm:leading-6"
                    placeholder="Confirm Password"
                    onChange={formInput}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center bg-taupe py-2 px-3 text-sm font-semibold text-white hover:bg-almostBlack focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-taupe"
                  onClick={buttonClick}
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockClosedIcon
                      className="h-5 w-5 text-almostBlack group-hover:text-taupe"
                      aria-hidden="true"
                    />
                  </span>
                  Update Password
                </button>
                <center>
                  <div className="text-sm p-2">
                    <Link
                      href="/account/login"
                      className="font-medium text-taupe hover:text-almostBlack"
                    >
                      Remembered your details?
                    </Link>
                  </div>
                </center>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
