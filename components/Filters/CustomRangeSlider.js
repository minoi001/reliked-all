import React, { useState } from "react";
import { useRange } from 'react-instantsearch';
import Slider from "react-slider";
const RangeSlider = ({ min, max, currentRefinement, canRefine, refine }) => {
  const [values, setValues] = useState([]);
  React.useEffect(() => {
    if (canRefine) {
      setValues([currentRefinement.min, currentRefinement.max]);
    }
  }, [currentRefinement.min, currentRefinement.max]);
  const onChange = (a) => {
    console.log(a[0], a[1]);
    const [min, max] = a;
    setValues(a);
    if (currentRefinement.min !== min || currentRefinement.max !== max) {
      refine({ min, max });
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
        min={min}
        max={max}
        onChange={onChange}
      />
    </div>
  );
};

export const CustomRangeSlider = connectRange(RangeSlider);

// TODO (Codemod generated): ensure your usage correctly maps the props from the connector to the hook
function connectRange(Component) {
  const Range = (props) => {
    const data = useRange(props);

    return <Component {...props} {...data} />;
  };

  return Range;
}
