import React from "react";
import { SearchBox, connectSearchBox } from "react-instantsearch-dom";
import { useRouter } from "next/navigation";
// Include only the reset
import "instantsearch.css/themes/reset.css";

export const Search = () => {
  const onSubmit = (e) => {
    e.preventDefault();
    const searchTerm = e.currentTarget?.elements[0]?.value;
    router.push(`/search?q=${searchTerm.trim().replace(" ", "&")}`);
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
