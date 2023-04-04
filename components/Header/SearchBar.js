import React, { useContext } from "react";

const SearchBar = ({ keyword, onChange }) => {
  const BarStyle = {
    background: "#F0F0F0",
    border: "none",
    padding: "0.4rem",
  };
  return (
    <input
      className="w-full text-sm"
      style={BarStyle}
      key="search-bar"
      value={keyword}
      placeholder={"Search our preowned pieces..."}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchBar;
