import { usePagination } from "react-instantsearch";
export const CustomPagination = (props) => {
  const { pages, refine, currentRefinement } = usePagination(props);

  return (
    <ul className="ais-Pagination-list">
      {pages.map((page) => (
        <li
          key={page}
          className={
            currentRefinement === page
              ? "ais-Pagination-item--selected"
              : "ais-Pagination-item"
          }
        >
          <a
            onClick={(event) => {
              event.preventDefault();
              window.scrollTo(0, 0);
              refine(page);
            }}
          >
            {page + 1}
          </a>
        </li>
      ))}
    </ul>
  );
};
