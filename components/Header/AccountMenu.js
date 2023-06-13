import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { AccountContext } from "../../context/accountContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AccountMenu() {
  const { userInfo, logout } = useContext(AccountContext);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 py-2 text-sm font-semibold text-gray-400 hover:text-almostBlack">
          <UserIcon className="h-6 w-6" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-32 origin-top-right bg-offWhite shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-right">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/account"
                  className={classNames(
                    active ? "bg-cream text-black" : "text-almostBlack",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Account
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/account/wishlist"
                  className={classNames(
                    active ? "bg-cream text-black" : "text-almostBlack",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Wishlist
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/selling"
                  className={classNames(
                    active ? "bg-cream text-black" : "text-almostBlack",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Selling
                </Link>
              )}
            </Menu.Item>
            {userInfo.loginStatus ? (
              <form method="POST" action="#">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="submit"
                      className={classNames(
                        active ? "bg-cream text-black" : "text-almostBlack",
                        "block w-full px-4 py-2 text-sm text-right"
                      )}
                      onClick={logout}
                    >
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </form>
            ) : (
              <div></div>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
