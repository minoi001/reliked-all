import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slider";
import { useRange } from "react-instantsearch";
import { ChevronDown, Cross } from "../AlgoliaDropdownMenu";
export const CustomRangeSlider = (props) => {
  const dropdownsRef = useRef(null);
  const handleClickOutside = (event) => {
    if (dropdownsRef.current && !dropdownsRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  const [isOpen, setIsOpen] = useState(false);
  const { range, canRefine, refine } = useRange(props);
  const [values, setValues] = useState([]);
  const [isRefined, setIsRefined] = useState(false);

  useEffect(() => {
    if (canRefine && range.min !== undefined && range.max !== undefined) {
      setValues([range.min, range.max]);
    }
    document.addEventListener("click", handleClickOutside);
    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [canRefine, range.min, range.max]);

  const onChange = (a) => {
    const [min, max] = a;
    setValues(a);
    if (range.min !== min || range.max !== max) {
      setIsRefined(true);
      refine([min, max]);
    } else {
      setIsRefined(false);
    }
  };

  const onClick = () => {
    refine([range.min, range.max]);
    setValues([range.min, range.max]);
    setIsRefined(false);
  };
  return (
    <div ref={dropdownsRef}>
      <button
        type="button"
        className={`m-1 text-black ${
          isRefined ? "bg-taupe" : "bg-white"
        } hover:bg-cream hover:text-white font-medium text-sm py-2.5 p-4 text-center inline-flex justify-between rounded-none border border-cream ${
          props.format === "row" ? "" : "w-full"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {props.title}
        {isRefined ? (
          <div onClick={onClick}>
            <Cross />
          </div>
        ) : (
          <ChevronDown />
        )}
      </button>
      {isOpen && (
        <div
          className={`flex flex-col ${
            props.format === "row" ? "absolute" : ""
          } p-4 bg-cream rounded-none m-1 mt-0`}
        >
          <div className="flex justify-between">
            <span className="text-sm">£{values[0]}</span>
            <p className="text-sm">£{values[1]}</p>
          </div>
          <Slider
            className="slider"
            value={values}
            min={range.min}
            max={range.max}
            onChange={onChange}
          />
        </div>
      )}
    </div>
  );
};
