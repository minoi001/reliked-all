import React from "react";
import ProductFiltersWithoutSortBy from "./Filters/ProductFiltersWithoutSortBy";

export default function SlideOut({ isSlideOverOpen, toggleSlideover }) {
  return (
    <div
      id="slideover-container"
      className={
        isSlideOverOpen
          ? "w-full h-full fixed inset-0 z-50"
          : "w-full h-full fixed inset-0 invisible"
      }
    >
      <div
        onClick={toggleSlideover}
        id="slideover-bg"
        className={
          isSlideOverOpen
            ? "w-full h-full duration-300 transition ease-in-out transition-all inset-0 absolute bg-gray-900 opacity-50 z-40"
            : "w-full h-full duration-300 transition ease-in-out transition-all inset-0 absolute bg-gray-900 opacity-0"
        }
      ></div>
      <div
        id="slideover"
        className={
          "w-2/3 bg-white h-full absolute right-0 duration-300 transition ease-in-out transition-all z-50"
        }
      >
        <div className="absolute cursor-pointer text-gray-600 duration-300 transition ease-in-out top-0 w-8 h-8 flex items-center justify-center right-0 mt-2 mr-2">
          <svg
            onClick={toggleSlideover}
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </div>

        <ProductFiltersWithoutSortBy format="column" />
      </div>
    </div>
  );
}
