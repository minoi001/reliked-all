// import { useState } from "react";

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

export default function AlgoliaDropdownMenu(menuTitle, menuItems, isOpen, toggleMenu) {
  return (
    <div>
      <button
        type="button"
        className="m-1 text-black bg-white hover:bg-cream hover:text-white font-medium text-sm px-4 py-2.5 text-center inline-flex items-center rounded-none border border-cream"
        onClick={toggleMenu}
      >
        {menuTitle}
        <ChevronDown />
      </button>

      <div className={`${isOpen ? "" : "hidden"}`}>{menuItems}</div>
    </div>
  );
}

export const ChevronDown = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
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


