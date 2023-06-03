import React from "react";
import { SearchBox } from "react-instantsearch-dom";
import { useRouter } from "next/navigation";

export const Search = () => {
  const onSubmit = (e) => {
    e.preventDefault();
    const searchTerm = e.currentTarget?.elements[0]?.value;
    router.push(`/search?q=${searchTerm}`);
  };
  const router = useRouter();
  return (
    <div>
      <SearchBox onSubmit={onSubmit} />
    </div>
  );
};
