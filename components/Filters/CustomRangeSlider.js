import React, { useState, useEffect } from "react";
import Slider from "react-slider";
import { useRange } from "react-instantsearch";
export const CustomRangeSlider = (props) => {
  const { range, canRefine, refine } = useRange(props);
  const [values, setValues] = useState([]);
  useEffect(() => {
    if (canRefine && range.min !== undefined && range.max !== undefined) {
      setValues([range.min, range.max]);
    }
  }, [canRefine, range.min, range.max]);

  const onChange = (a) => {
    const [min, max] = a;
    setValues(a);
    if (range.min !== min || range.max !== max) {
      refine([min, max]);
    }
  };

  return (
    <div className="flex flex-col absolute p-4 bg-cream rounded-none">
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
  );
};
