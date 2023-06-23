import { useState } from "react";

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

export default function AlgoliaDropdownMenu(menuTitle, menuItems) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="m-1 text-black bg-cream hover:bg-taupe hover:text-white font-medium text-sm px-4 py-2.5 text-center inline-flex items-center"
          onClick={toggleMenu}
        >
          {menuTitle}
          <ChevronDown />
        </button>
      </div>

      <div
        className={`absolute ml-1 w-full origin-top-right bg-offWhite shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
          isOpen ? "" : "hidden"
        }`}
      >
        <div className="py-1">{menuItems}</div>
      </div>
    </div>
  );
}

const ChevronDown = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    className="w-4 h-4 self-center"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
    />
  </svg>
);