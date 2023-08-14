import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

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

export default function MiniDropdownMenu(menuTitle, menuHandle, menuItems) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        {menuItems.length > 0 ? (
          <Menu.Button className=" text-center inline-flex items-center">
            {menuTitle}

            <ChevronDownIcon className="w-5 h-5 p-1" />
          </Menu.Button>
        ) : (
          <Link href={menuHandle}>
            <Menu.Button className=" text-center inline-flex items-center">
              {menuTitle}
            </Menu.Button>
          </Link>
        )}
      </div>
      {/* need the dropdowns to be top visual priority, currently underneath the subheader items */}
      {/* also need dropdowns to be the width of the column rather than the title text */}
      {/* need subheader to close once a collection has been clicked */}
      <div>
        <Transition
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          {menuItems.length > 0 ? (
            <Menu.Items className="absolute w-full origin-top-right bg-offWhite shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {menuItems.map((item) => (
                  <div key={item.name}>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href={item.href}
                          className={classNames(
                            active ? "bg-cream text-black" : "text-almostBlack",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          {item.name}
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                ))}
              </div>
            </Menu.Items>
          ) : (
            ""
          )}
        </Transition>
      </div>
    </Menu>
  );
}
