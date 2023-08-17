import React from "react";
import { SearchBox, useSearchBox } from 'react-instantsearch';
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
      <SearchBox onSubmit={onSubmit} onReset={onReset} />
    </div>
  );
};

// TODO (Codemod generated): ensure your usage correctly maps the props from the connector to the hook
function connectSearchBox(Component) {
  const SearchBox = (props) => {
    const data = useSearchBox(props);

    return <Component {...props} {...data} />;
  };

  return SearchBox;
}
