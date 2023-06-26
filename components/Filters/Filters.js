import AlgoliaDropdownMenu from "../AlgoliaDropdownMenu";
import { connectRange, RefinementList } from "react-instantsearch-dom";
import { CustomRangeSlider } from "./CustomRangeSlider";

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
            // <RangeInput attribute="price" className="w-full m-2" default />
            <CustomRangeSlider attribute="price" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Filters;
