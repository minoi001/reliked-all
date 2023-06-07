import { LockClosedIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useContext } from "react";
import { AccountContext } from "../../context/accountContext";
import Link from "next/link";

export default function Recovery() {
  const {
    userInfo,
    setUserInfo,
    getUserInfo,
    sendRecoveryRequest,
    updateUserValue,
  } = useContext(AccountContext);

  const formInput = async (event) => {
    // console.log(event);
    // console.log(event.nativeEvent.srcElement.name);
    updateUserValue({
      [event.nativeEvent.srcElement.name]: `${event.target.value}`,
    });
  };

  const buttonClick = async (event) => {
    event.preventDefault();

    if (!userInfo.email) {
      updateUserValue({
        errorMessage: `Please enter a valid email address.`,
      });
    } else {
      sendRecoveryRequest();
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
                Account Recovery
              </h2>
              {/* <p className="mt-2 text-center text-sm text-gray-600">
                Or
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  start your 14-day free trial
                </a>
              </p> */}
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
            <form className="mt-8 space-y-6" action="#" method="POST">
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="-space-y-px shadow-sm">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="relative block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-taupe sm:text-sm sm:leading-6"
                    placeholder="Email address"
                    onChange={formInput}
                  />
                </div>
              </div>
              {/* <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>
              </div> */}
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
                  Reset Password
                </button>
                <center>
                  <div className="text-sm p-2">
                    <Link
                      href="/account/login"
                      className="font-medium text-taupe hover:text-almostBlack"
                    >
                      Know your details?
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
