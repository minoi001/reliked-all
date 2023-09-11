import { LockClosedIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useContext } from "react";
import { AccountContext } from "../../../context/accountContext";
import Link from "next/link";
import { useState } from "react";
import { resetUserPasswordByURL } from "../../../lib/shopify";
import { useRouter } from "next/navigation";

export default function Reset({ reset, id, url }) {
  const { userInfo, updateUserValue } = useContext(AccountContext);

  const [tryAgain, setTryAgain] = useState(false);

  const formInput = async (event) => {
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
    } else if (!userInfo.newPassword) {
      updateUserValue({
        errorMessage: `Please enter a new password.`,
      });
    } else {
      const resetRequest = await resetUserPasswordByURL(
        userInfo.newPassword,
        //TODO: Change this to the correct URL when we go live
        `http://localhost:3006/account/reset/${reset.customerID}/${reset.token}?syclid=ea6378ea-eaac-474a-9570-e16f50510406`
      );

      if (resetRequest.errorMessage === null) {
        updateUserValue({
          successMessage: `Your password was updated successfully, please login.`,
        });
      } else {
        updateUserValue({
          errorMessage: `Your password could not be updated at this time. Please try again.`,
        });
        setTryAgain(true);
      }
    }
  };

  return (
    <>
      {tryAgain ? (
        <div>
          <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
              <div>
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                  {/*{reset.customerID} {` `} {reset.token}*/}
                  Password Reset
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

              <Link
                href={"/account/login/recover"}
                className="group relative flex w-full justify-center bg-taupe py-2 px-3 text-sm font-semibold text-white hover:bg-almostBlack focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-taupe"
              >
                Reset my password
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {userInfo.checkingLogin ? (
            "Loading"
          ) : userInfo.loginStatus ? (
            <div>You are logged in as {userInfo.userType}</div>
          ) : (
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
              <div className="w-full max-w-md space-y-8">
                <div>
                  <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                    {/*{reset.customerID} {` `} {reset.token}*/}
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
        </div>
      )}
    </>
  );
}
