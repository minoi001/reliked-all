import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useContext, useEffect } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// menuItems prop should be passed in the following format:
// const MenuItemsPropExampleFormat = [
//   { title: "title", handle: "url" },
//   { title: "title", handle: "url" },
//   { title: "title", url: "url" },
//   { title: "title", url: "url" },
//   { title: "title", url: "url" },
// ];

export default function AlgoliaDropdownMenu(
  menuTitle,
  menuIcon,
  RefinementList
) {
  console.log(menuTitle, RefinementList);
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="m-1 text-black bg-cream hover:bg-taupe hover:text-white font-medium text-sm px-4 py-2.5 text-center inline-flex items-center">
          {menuTitle}
          {menuIcon}
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
        <Menu.Items className="absolute ml-1 w-full origin-top-right bg-offWhite shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {RefinementList}
            {/* {menuItems.map((item) => (
              <div key={item.title}>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href={item.handle}
                      className={classNames(
                        active ? "bg-cream text-black" : "text-almostBlack",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      {item.title}
                    </Link>
                  )}
                </Menu.Item>
              </div>
            ))} */}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
