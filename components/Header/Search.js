import React from "react";
import { SearchBox, connectSearchBox } from "react-instantsearch-dom";
import { useRouter } from "next/navigation";
// Include only the reset
import "instantsearch.css/themes/reset.css";

export const Search = () => {
  const router = useRouter();
  const onSubmit = (e) => {
    e.preventDefault();
    const searchTerm = e.currentTarget?.elements[0]?.value;
    router.push(`/search?q=${searchTerm.trim().replace(" ", "+")}`);
  };

  const onReset = () => {
    router.push(`/search`);
  };

  return (
    <div>
      {/* <CustomSearchBox /> */}
      <SearchBox onSubmit={onSubmit} onReset={onReset} />
    </div>
  );
};
