import { LockClosedIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useContext, useState, useEffect } from "react";
import { AccountContext } from "../../context/accountContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const { push } = useRouter();

  const { userInfo, loginUser, updateUserValue } = useContext(AccountContext);

  useEffect(() => {
    const form = document.getElementById("loginForm");

    const handleFormSubmit = (e) => {
      e.preventDefault();
      // Your form submission logic here
    };

    if (form) {
      form.addEventListener("submit", handleFormSubmit);
    }

    // Cleanup the event listener on component unmount
    return () => {
      if (form) {
        form.removeEventListener("submit", handleFormSubmit);
      }
    };
  }, []); // Empty dependency array means this effect runs once after the initial render

  // const formInput = (name, value) => {
  //   console.log({
  //     [name]: value,
  //   });
  //   updateUserValue({
  //     [name]: value,
  //   });
  //   updateUserValue({
  //     [name]: value,
  //   });
  // };

  const buttonClick = async (event) => {
    event.preventDefault();

    if (!userInfo.email || !userInfo.password) {
      updateUserValue({
        errorMessage: `Please enter a valid email address and password.`,
      });
    } else {
      let response = await loginUser();
      if (userInfo.loginStatus) {
        push("/account");
      }
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
                Sign in to your account
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Or
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {" "}
                  create an account
                </a>
              </p>
              {userInfo.errorMessage ? (
                <h4 className="mt-6 text-center text-1xl font-bold tracking-tight text-gray-900 bg-red-300 text-red-700">
                  {userInfo.errorMessage}
                </h4>
              ) : (
                ""
              )}
            </div>
            <form
              className="mt-8 space-y-6"
              action="#"
              method="POST"
              id="loginForm"
              onSubmit={buttonClick}
            >
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
                    className="relative block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-taupe sm:text-sm sm:leading-6"
                    placeholder="Email address"
                    onChange={(event) => {
                      event.preventDefault();
                      updateUserValue({
                        email: event.target.value,
                      });
                    }}
                    defaultValue={userInfo.email}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="relative block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-taupe sm:text-sm sm:leading-6"
                    placeholder="Password"
                    onChange={(event) => {
                      event.preventDefault();
                      updateUserValue({
                        password: event.target.value,
                      });
                    }}
                    defaultValue={userInfo.password}
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
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockClosedIcon
                      className="h-5 w-5 text-almostBlack group-hover:text-taupe"
                      aria-hidden="true"
                    />
                  </span>
                  Sign in
                </button>
              </div>
            </form>
            <center>
              <div className="text-sm">
                <a
                  href="/account/login/recover"
                  className="font-medium text-taupe hover:text-almostBlack"
                >
                  Forgot your password?
                </a>
              </div>
            </center>
          </div>
        </div>
      )}
    </>
  );
}
