import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MiniDropdownMenu(menuTitle, menuHandle, menuItems) {
  return (
    <Menu as="div" className="">
      {/* can't make drop down for now */}
      {menuItems.length > 0 ? (
        <div className="">
          <Menu.Button className="">
            {menuTitle}
            <ChevronDownIcon className="w-4 inline" />
          </Menu.Button>
          <div className="">
            <Transition
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              {/* <Menu.Items className="absolute left-0 mt-2 w-32 origin-top-left bg-offWhite shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"> */}
              <Menu.Items className="">
                <div className="">
                  {menuItems.map((item) => (
                    <div className="" key={item.name}>
                      <Menu.Item className="">
                        {({ active }) => (
                          <Link
                            href={item.href.replace(
                              "https://e-bloggers.myshopify.com",
                              ""
                            )}
                            className={classNames(
                              active
                                ? "bg-cream text-black"
                                : "text-almostBlack",
                              "text-sm"
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
        <Link href={menuHandle.replace("https://e-bloggers.myshopify.com", "")}>
          <button className="flex">{menuTitle}</button>
        </Link>
      )}
    </Menu>
  );
}
