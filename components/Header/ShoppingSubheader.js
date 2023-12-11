import { Fragment, useState } from "react";
import { Dialog, Popover, Tab, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  TvIcon,
  XMarkIcon,
  PlusSmallIcon,
  UserIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { ShopContext } from "../../context/shopContext";
import { AccountContext } from "../../context/accountContext";
import { useContext, useEffect } from "react";
import Link from "next/link";
import MiniDropdownMenu from "./MiniDropdownMenu";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ShoppingSubheader(props) {
  const { navigation, navItemVisible, navSubItemVisible, resetMenuVisibility } =
    useContext(ShopContext);

  let [updateMenu, setUpdateMenu] = useState(true);

  function navItemClick(category, index) {
    navItemVisible(index, !category.hidden);
    setUpdateMenu(!updateMenu);
  }

  function closeMenu() {
    resetMenuVisibility();
    setUpdateMenu(!updateMenu);
  }

  function navSubItemClick(categoryIndex, subcategoryIndex, subcategory) {
    navSubItemVisible(categoryIndex, subcategoryIndex, !subcategory.hidden);
    setUpdateMenu(!updateMenu);
  }

  return (
    <div className="z-100">
      {navigation.items ? (
        <div className="object-cover">
          {/* Mobile menu */}
          <Transition.Root show={props.open} as={Fragment}>
            <Dialog
              as="div"
              className="relative lg:hidden"
              onClose={() => (props.setOpen, closeMenu())}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                    <div className="flex px-4 pb-2 pt-5">
                      <button
                        type="button"
                        className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                        onClick={() => (props.setOpen(false), closeMenu())}
                      >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Links */}
                    <Tab.Group as="div" className="mt-2">
                      <div className="border-b border-gray-200">
                        <Tab.List className="space-y-10 px-4 pb-8 pt-10">
                          {navigation.items.map((category, index1) => (
                            <div key={category.name}>
                              <Link
                                href={
                                  category.items.length > 0
                                    ? "#"
                                    : category.href
                                        .replace(
                                          "https://e-bloggers.myshopify.com",
                                          ""
                                        )
                                        .replace("https://reliked.com", "")
                                }
                                className="font-h"
                                onClick={
                                  category.items.length > 0
                                    ? () => navItemClick(category, index1)
                                    : () => (props.setOpen(false), closeMenu()) //
                                }
                              >
                                {category.name}
                              </Link>
                              {category.hidden ? (
                                ""
                              ) : (
                                <div key="subcategories" className="">
                                  {category.items.map((subcategory, index2) => (
                                    <div key={subcategory.name}>
                                      <Link
                                        key={subcategory.name}
                                        className="block uppercase font-bold mt-4"
                                        href={subcategory.href
                                          .replace(
                                            "https://e-bloggers.myshopify.com",
                                            ""
                                          )
                                          .replace("https://reliked.com", "")}
                                        onClick={
                                          subcategory.items.length > 0
                                            ? (e) =>
                                                navSubItemClick(
                                                  index1,
                                                  index2,
                                                  subcategory
                                                )
                                            : () => (
                                                props.setOpen(false),
                                                closeMenu()
                                              ) //
                                        }
                                      >
                                        {subcategory.name}
                                      </Link>
                                      {subcategory.hidden ? (
                                        ""
                                      ) : (
                                        <div
                                          key="subsubcategories"
                                          className=""
                                        >
                                          {subcategory.items.map(
                                            (subsubcategory) => (
                                              <Link
                                                key={subsubcategory.name}
                                                className="block"
                                                href={subsubcategory.href
                                                  .replace(
                                                    "https://e-bloggers.myshopify.com",
                                                    ""
                                                  )
                                                  .replace(
                                                    "https://reliked.com",
                                                    ""
                                                  )}
                                                onClick={() => (
                                                  props.setOpen(false),
                                                  closeMenu()
                                                )}
                                              >
                                                {subsubcategory.name}
                                              </Link>
                                            )
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </Tab.List>
                      </div>
                    </Tab.Group>

                    <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                      <div className="flow-root">
                        <a
                          href="#"
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          Sign in
                        </a>
                      </div>
                      <div className="flow-root">
                        <a
                          href="#"
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          Create account
                        </a>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6">
                      <a href="#" className="-m-2 flex items-center p-2">
                        <img
                          src="https://tailwindui.com/img/flags/flag-canada.svg"
                          alt=""
                          className="block h-auto w-5 flex-shrink-0"
                        />
                        <span className="ml-3 block text-base font-medium text-gray-900">
                          CAD
                        </span>
                        <span className="sr-only">, change currency</span>
                      </a>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>
          {/* Desktop */}
          <header className="relative max-lg:hidden">
            <nav aria-label="Top" className="max-w-7xl px-4 sm:px-6 lg:px-8">
              <div>
                <div className="flex h-8 items-center justify-center">
                  {/* Flyout menus */}
                  <Popover.Group className="hidden lg:block lg:self-stretch">
                    <div className="items-center justify-center flex h-full space-x-8 pb-1 mt-1.5">
                      {navigation.items.map((category) => (
                        <Popover key={category.name} className="flex">
                          {({ open }) => (
                            <>
                              <div className="relative flex">
                                {category.items.length > 0 ? (
                                  <Popover.Button
                                    className={classNames(
                                      open
                                        ? "border-taupe text-taupe"
                                        : "border-transparent text-gray-700 hover:text-gray-800",
                                      "uppercase relative -mb-px flex items-center border-b-2 border-taupe pt-px text-sm font-medium transition-colors duration-200 ease-out hover:border-taupe hover:text-taupe hover:border-b-2 "
                                    )}
                                  >
                                    {category.name}
                                  </Popover.Button>
                                ) : (
                                  <Link
                                    className={classNames(
                                      "hover:border-taupe hover:text-taupe hover:border-b-2 uppercase relative -mb-px flex items-center pt-px text-sm font-medium transition-colors duration-200 ease-out"
                                    )}
                                    href={
                                      category.items.length > 0
                                        ? "#"
                                        : category.href
                                            .replace(
                                              "https://e-bloggers.myshopify.com",
                                              ""
                                            )
                                            .replace("https://reliked.com", "")
                                    }
                                  >
                                    {category.name}
                                  </Link>
                                )}
                              </div>
                              {category.items.length > 0 ? (
                                <Transition
                                  as={Fragment}
                                  enter="transition ease-out duration-200"
                                  enterFrom="opacity-0"
                                  enterTo="opacity-100"
                                  leave="transition ease-in duration-150"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                                    {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                    <div
                                      className="absolute inset-0 top-1/2 bg-white shadow mt-2"
                                      aria-hidden="true"
                                    />
                                    <div className="relative bg-white mt-2">
                                      <div className="mx-auto max-w-7xl px-8">
                                        <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                          <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                            {/* {category.featured.map((item) => (
                                            <div
                                              key={item.name}
                                              className="group relative text-base sm:text-sm"
                                            >
                                              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                                <img
                                                  src={item.imageSrc}
                                                  alt={item.imageAlt}
                                                  className="object-cover object-center"
                                                />
                                              </div>
                                              <a
                                                href={item.href}
                                                className="mt-6 block font-medium text-gray-900"
                                              >
                                                <span
                                                  className="absolute inset-0 "
                                                  aria-hidden="true"
                                                />
                                                {item.name}
                                              </a>
                                              <p
                                                aria-hidden="true"
                                                className="mt-1"
                                              >
                                                Shop now
                                              </p>
                                            </div>
                                          ))} */}
                                          </div>
                                          <div className="row-start-1 grid grid-cols-3 gap-x-2 gap-y-6 text-sm">
                                            {category.items.map((section) => (
                                              <div
                                                key={section.name}
                                                className="flex"
                                              >
                                                {/* NEEDS TO BE HOVER MENUS */}

                                                <div
                                                  key={section.name}
                                                  className="relative"
                                                >
                                                  {MiniDropdownMenu(
                                                    section.name,
                                                    section.href
                                                      .replace(
                                                        "https://reliked.com",
                                                        ""
                                                      )
                                                      .replace(
                                                        "https://e-bloggers.myshopify.com",
                                                        ""
                                                      ),
                                                    section.items
                                                  )}
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </Popover.Panel>
                                </Transition>
                              ) : (
                                ""
                              )}
                            </>
                          )}
                        </Popover>
                      ))}
                    </div>
                  </Popover.Group>
                </div>
              </div>
            </nav>
          </header>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
