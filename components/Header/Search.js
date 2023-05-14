import React from "react";
import { SearchBox } from "react-instantsearch-dom";
import { useRouter } from "next/navigation";

export const Search = () => {
  const onSubmit = (e) => {
    e.preventDefault();
    router.push("/search");
  };
  const router = useRouter();
  return (
    <div>
      <SearchBox onSubmit={onSubmit} />
    </div>
  );
};
