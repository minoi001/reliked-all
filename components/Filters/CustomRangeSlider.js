import React, { useState } from "react";
import { connectRange } from "react-instantsearch-dom";
import Slider from "react-slider";
const RangeSlider = ({ min, max, currentRefinement, canRefine, refine }) => {
  const [values, setValues] = useState([]);
  React.useEffect(() => {
    if (canRefine) {
      setValues([currentRefinement.min, currentRefinement.max]);
    }
  }, [currentRefinement.min, currentRefinement.max]);

  // const onChange = ({ values: [min, max] }) => {
  //   // setValues(values);
  //   if (currentRefinement.min !== min || currentRefinement.max !== max) {
  //     refine({ min, max });
  //   }
  // };

  // const onValuesUpdated = ({ values: [min, max] }) => {
  //   setStateMin(min);
  //   setStateMax(max);
  // };

  const onChange = (a) => {
    console.log(a[0], a[1]);
    const [min, max] = a;
    setValues(a);
    if (currentRefinement.min !== min || currentRefinement.max !== max) {
      refine({ min, max });
    }
  };

  return (
    <div>
      <span className="value">£{values[0]}</span> -{" "}
      <p className="value">£{values[1]}</p>
      <Slider
        className="slider"
        value={values}
        min={min}
        max={max}
        onChange={onChange}
      />
    </div>
    // <Rheostat
    //   min={min}
    //   max={max}
    //   values={[currentRefinement.min, currentRefinement.max]}
    //   onChange={onChange}
    //   onValuesUpdated={onValuesUpdated}
    // >
    //   <div className="rheostat-marker round-marker">
    //     <div className="rheostat-value">{stateMin}</div>
    //   </div>
    //   <div className="rheostat-marker round-marker">
    //     <div className="rheostat-value">{stateMax}</div>
    //   </div>
    // </Rheostat>
  );
};

export const CustomRangeSlider = connectRange(RangeSlider);
