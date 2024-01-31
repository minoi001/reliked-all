import React, { useContext } from "react";
import { SearchBox } from "react-instantsearch";
import { useRouter } from "next/navigation";
// Include only the reset
import "instantsearch.css/themes/reset.css";
import { event } from "../../lib/ga";
import { ProductContext } from "../../context/productContext";

export const Search = () => {
  const router = useRouter();
  const { setScrollPosition } = useContext(ProductContext);

  const onSubmit = (e) => {
    e.preventDefault();
    const searchTerm = e.currentTarget?.elements[0]?.value;
    event("search", { search_term: searchTerm });
    router.push(`/search?q=${searchTerm.trim().replace(" ", "+")}`);
    setScrollPosition(0);
  };

  const onReset = () => {
    router.push(`/search`);
  };

  return (
    <SearchBox
      onSubmit={onSubmit}
      onReset={onReset}
      searchAsYouType={false}
      placeholder="Search"
    />
  );
};
