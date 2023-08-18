import { useRefinementList, Highlight } from "react-instantsearch";

const RefinementList = ({
  items,
  isFromSearch,
  refine,
  searchForItems,
  createURL,
}) => {
  return (
    <ul className="absolute bg-cream rounded-none p-4 overflow-auto h-48">
      {items.map((item) => {
        return (
          <li key={item.label} className="flex items-center space-x-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={item.isRefined}
                onChange={() => refine(item.value)}
                className="h-4 w-4 bg-taupe focus:ring-rose"
                style={{ backgroundColor: item.isRefined ? "#EC516B" : "" }}
              />
              <span style={{ fontWeight: item.isRefined ? "bold" : "" }}>
                {isFromSearch ? (
                  <Highlight attribute="label" hit={item} />
                ) : (
                  getItemLabel(item)
                )}
              </span>
            </label>
          </li>
        );
      })}
    </ul>
  );
};

function getItemLabel(item) {
  if (item && item.label) {
    if (item.label.includes(" - ")) {
      return item.label.split(" - ")[1];
    } else {
      return item.label;
    }
  }

  return "";
}

export const CustomRefinementList = (props) => {
  const refinementBox = useRefinementList(props);
  return <RefinementList {...refinementBox} />;
};
