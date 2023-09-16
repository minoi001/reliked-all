import { useEffect, useRef, useState } from "react";
import { ClearRefinements } from "react-instantsearch";

export default function AlgoliaDropdownMenu(menuTitle, menuItems, isRefined) {
  const dropdownsRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleClickOutside = (event) => {
    if (dropdownsRef.current && !dropdownsRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener when the component mounts
    document.addEventListener("click", handleClickOutside);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div ref={dropdownsRef}>
      <button
        type="button"
        className={`m-1 text-black ${
          isRefined ? "bg-taupe" : "bg-white"
        } hover:bg-cream hover:text-white font-medium text-sm py-2.5 p-4 text-center inline-flex items-center rounded-none border border-cream`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {menuTitle}
        {isRefined ? <Cross /> : <ChevronDown />}
      </button>

      <div className={`${isOpen ? "" : "hidden"}`}>{menuItems}</div>
    </div>
  );
}

export const ChevronDown = () => (
  <div className={"px-1"}>
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
  </div>
);

const Cross = (isRefinement) => {
  return isRefinement ? (
    <div className={"px-1"}>
      <ClearRefinements
        translations={{
          resetButtonText: "✕",
        }}
      />
    </div>
  ) : (
    <div className={"px-1"}>
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
          d="M6.75 6.75l10.5 10.5M17.25 6.75L6.75 17.25"
        />
      </svg>
    </div>
  );
};
