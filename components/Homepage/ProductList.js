import ProductCard from "../Products/ProductCard";
import {
  Configure,
  Hits,
  Pagination,
  RangeInput,
  RefinementList,
  connectStateResults,
} from "react-instantsearch-dom";
import AlgoliaDropdownMenu from "../AlgoliaDropdownMenu";

const ProductList = ({ query }) => {
  console.log("***", query.get("q"));
  const searchParameters = {
    query: query.get("q") || "",
    // filters: ``,
  };
  return (
    <div className="mx-auto my-4 max-w-7xl px-4 sm:px-6 lg:px-8 ">
      <div className="grid px-6 sm:px-12 place-items-center align-middle p-2 w-full bg-white shadow-lg">
        <Filters query={query} />
        <Results>
          <Configure {...searchParameters} />
          <Hits hitComponent={ProductCard} />
        </Results>
        <div className="p-12">
          <Pagination />
        </div>
      </div>
    </div>
  );
};

const Results = connectStateResults(
  ({ searchState, searchResults, children }) =>
    searchResults && searchResults.nbHits !== 0 ? (
      children
    ) : (
      <div>No results have been found for {searchState.query}.</div>
    )
);

const Filters = ({ query }) => {
  return (
    // Need to keep the filters applied to the search results when the dropdown menu is closed/minimized
    // Also need to add a fixed heigh to the dropdown menus and add a scroll, preferably with an apply button fixed at the bottom of the dropdown menu which closes it
    // styling on algolia dropdown menu needs to be full width of the refinements/range inputs
    <div className="">
      <h1 className="p-4 text-3xl">Search Results</h1>
      <div className="inline pb-4">
        <div className="inline-flex">
          {AlgoliaDropdownMenu(
            "Influencer",
            <RefinementList
              attribute="vendor"
              className="w-full m-2"
              // defaultRefinement={["JROC - ᴊᴀᴍɪᴇ ʀᴏᴄᴋᴇʀs"]} TODO: Link query param to default refinement
            />
          )}
        </div>
        <div className="inline-flex">
          {AlgoliaDropdownMenu(
            "Price",
            <RangeInput attribute="price" className="w-full m-2" default />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
