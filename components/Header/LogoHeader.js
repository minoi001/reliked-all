import React, { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShopContext } from "../../context/shopContext";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
  XMarkIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";
import ShoppingHeader from "../ShoppingHeader";
import SearchBar from "./SearchBar";

const LogoHeader = () => {
  const [open, setOpen] = useState(false);

  const { headerContent } = useContext(ShopContext);
  return (
    <div>
      <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="">
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
                <SearchBar />
              </Link>
            </div>
            {/* End of DesktopSearch/HamburgerMenu */}

            {/* Icons */}
            <div className="float-right -mt-9 text-sm">
              <Link href="/">
                <span className="sr-only">Icons</span>
                Icons Here
              </Link>
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
            <ShoppingHeader open={open} setOpen={setOpen} />
            {/* End of Navigation */}
            {/* Mobile Search Bar */}
            <div className="lg:hidden">
              <SearchBar />
            </div>
            {/* End of Mobile Search Bar */}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default LogoHeader;
