import { usePagination } from "react-instantsearch";
import { useRouter } from "next/router";

export const CustomPagination = (props) => {
  const { pages, currentRefinement } = usePagination(props);
  const router = useRouter();
  const { page, ...otherQueryParams } = router.query;

  const handleOnClick = (event, page) => {
    event.preventDefault();
    props.setScrollPosition(0);
    router.push({
      pathname: router.pathname,
      query: { ...otherQueryParams, page: page + 1 },
    });
  };

  return (
    <ul className="ais-Pagination-list">
      {pages.map((page) => {
        return (
          <li
            key={page}
            className={
              currentRefinement === page
                ? "ais-Pagination-item--selected"
                : "ais-Pagination-item"
            }
          >
            <button onClick={(e) => handleOnClick(e, page)}>{page + 1}</button>
          </li>
        );
      })}
    </ul>
  );
};
