import React from "react";
import { SearchBox, connectSearchBox } from "react-instantsearch-dom";
import { useRouter } from "next/navigation";
// Include only the reset
import "instantsearch.css/themes/reset.css";

export const Search = () => {
  const onSubmit = (e) => {
    e.preventDefault();
    router.push("/search");
  };
  const router = useRouter();

  // // SearchBox({
  // //   // ...
  // //   placeholder: "Search for products",
  // // });

  // const SearchBox = ({ currentRefinement, refine }) => {
  //   // return the DOM output
  //   <input
  //     type="search"
  //     value={currentRefinement}
  //     onChange={(event) => refine(event.currentTarget.value)}
  //   />;
  // };

  // // 2. Connect the component using the connector
  // const CustomSearchBox = connectSearchBox(SearchBox);

  // 3. Use your connected widget

  return (
    <div>
      {/* <CustomSearchBox /> */}
      <SearchBox onSubmit={onSubmit} />
    </div>
  );
};
