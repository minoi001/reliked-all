import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MiniDropdownMenu(menuTitle, menuHandle, menuItems) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className="flex">
        {menuItems.length > 0 ? (
          <div>
            <Menu.Button className="flex">
              {menuTitle}
              <ChevronDownIcon className="flex w-5 h-5 p-1" />
            </Menu.Button>
            <div className="relative z-100">
              <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute left-0 mt-2 w-32 origin-top-left bg-offWhite shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {menuItems.map((item) => (
                      <div key={item.name}>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href={item.href}
                              className={classNames(
                                active
                                  ? "bg-cream text-black"
                                  : "text-almostBlack",
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
              </Transition>
            </div>
          </div>
        ) : (
          <Link href={menuHandle}>
            <button className="flex">{menuTitle}</button>
          </Link>
        )}
      </div>
    </Menu>
  );
}
