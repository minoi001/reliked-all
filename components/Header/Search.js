import React from "react";
import { SearchBox } from "react-instantsearch";
import { useRouter } from "next/navigation";
// Include only the reset
import "instantsearch.css/themes/reset.css";
import { event } from "../../lib/ga";

export const Search = () => {
  const router = useRouter();
  const onSubmit = (e) => {
    e.preventDefault();
    const searchTerm = e.currentTarget?.elements[0]?.value;
    event("search", { search_term: searchTerm });
    router.push(`/search?q=${searchTerm.trim().replace(" ", "+")}`);
  };

  const onReset = () => {
    router.push(`/search`);
  };

  return (
    <div>
      <SearchBox onSubmit={onSubmit} onReset={onReset} />
    </div>
  );
};
