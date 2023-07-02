import { connectRefinementList, Highlight } from "react-instantsearch-dom";

const RefinementList = ({
  items,
  isFromSearch,
  refine,
  searchForItems,
  createURL,
}) => (
  <ul className="absolute bg-cream rounded p-4">
    {items.map((item) => (
      <li key={item.label}>
        <a
          href={createURL(item.value)}
          style={{ fontWeight: item.isRefined ? "bold" : "" }}
          onClick={(event) => {
            event.preventDefault();
            refine(item.value);
          }}
        >
          {isFromSearch ? (
            <Highlight attribute="label" hit={item} />
          ) : (
            item.label.split(" - ")[1]
          )}
        </a>
      </li>
    ))}
  </ul>
);

export const CustomRefinementList = connectRefinementList(RefinementList);
