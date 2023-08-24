import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function MiniDropdownMenu(menuTitle, menuHandle, menuItems) {
  return (
    <div>
      <div class="peer px-5 py-2 flex">
        <Link href={menuHandle}>{menuTitle}</Link>
        {menuItems.length > 0 ? (
          <ChevronDownIcon className="inline-flex w-5 h-5 p-1" />
        ) : (
          <div></div>
        )}
      </div>
      <div
        class="hidden peer-hover:flex hover:flex
        w-[200px]
        flex-col bg-white drop-shadow-lg absolute"
      >
        {menuItems.map((item) => (
          <Link
            href={item.href}
            key={item.name}
            class="px-5 py-3 hover:bg-gray-200"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
