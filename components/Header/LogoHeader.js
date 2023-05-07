import React, { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { ShopContext } from "../../context/shopContext";
import {
  Bars3Icon,
  ShoppingBagIcon,
  UserIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";
import ShoppingSubheader from "./ShoppingSubheader";
import MiniCart from "./MiniCart";
import SellingSubheader from "./SellingSubheader";
import { SearchBox } from "react-instantsearch-dom";

const LogoHeader = () => {
  const [open, setOpen] = useState(false);
  const { cart, cartOpen, setCartOpen, headerContent } =
    useContext(ShopContext);
  const { pathname } = useRouter();

  return (
    <div>
      <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div>
          <div className="flex h-12 items-center"></div>
          <div className="relative">
            {/* Logo */}
            <div className="items-center justify-center flex">
              <Link href="/">
                <span className="sr-only">Reliked</span>
                <Image
                  className="h-8 w-auto -mt-10"
                  src={headerContent.logo}
                  alt=""
                  width="100"
                  height="100"
                />
              </Link>
            </div>
            {/* End of Logo */}
            {/* DesktopSearch/HamburgerMenu */}
            <div className="float-left -mt-9 text-sm w-60 max-lg:hidden">
              <Link href="/">
                <span className="sr-only">Search</span>
                <SearchBox />
              </Link>
            </div>
            {/* End of DesktopSearch/HamburgerMenu */}
            {/* Icons */}
            <div className="float-right -mt-9 text-sm">
              <div className="ml-auto flex items-center">
                {/* Account */}
                <div className="flex lg:ml-6">
                  <Link
                    href="/account"
                    className="p-2 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Account</span>
                    <UserIcon className="h-6 w-6" aria-hidden="true" />
                  </Link>
                </div>
                {/* Selling */}
                <div className="flex lg:ml-6">
                  <Link
                    href="/selling"
                    className="p-2 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Storefront</span>
                    <BuildingStorefrontIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <a
                    className="group -m-2 flex items-center p-2 cursor-pointer"
                    onClick={() => {
                      setCartOpen(!cartOpen);
                    }}
                  >
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />

                    <span className="text-xs font-medium text-white group-hover:text-white bg-rose rounded-full px-1">
                      {cart.length}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
                  <MiniCart cart={cart} />
                </div>
              </div>
            </div>
            {/* End of Icons */}
            {/* Burger Menu Button */}
            <div className="float-left -mt-11 text-sm">
              <button
                type="button"
                className="rounded-md  p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            {/* End of Burger Menu Button */}
            {/* Navigation */}
            {pathname?.includes("/selling") ? (
              <subheader>
                <SellingSubheader open={open} setOpen={setOpen} />
              </subheader>
            ) : (
              <subheader>
                <ShoppingSubheader open={open} setOpen={setOpen} />
              </subheader>
            )}

            {/* End of Navigation */}
            {/* Mobile Search Bar */}
            <div className="lg:hidden pb-2">
              <SearchBox />
            </div>
            {/* End of Mobile Search Bar */}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default LogoHeader;
