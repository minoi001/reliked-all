import { usePagination } from 'react-instantsearch';

const Pagination = ({ currentRefinement, nbPages, refine }) => (
  <ul className="flex justify-center">
    {new Array(nbPages).fill(null).map((_, index) => {
      const page = index + 1;
      const isSelected = currentRefinement === page;

      return (
        <li
          className={`py-1 px-2 ${isSelected ? "border-2 border-rose" : ""}`}
          key={index}
          onClick={(event) => {
            event.preventDefault();
            refine(page);
          }}
        >
          {page}
        </li>
      );
    })}
  </ul>
);

export const CustomPagination = connectPagination(Pagination);

// TODO (Codemod generated): ensure your usage correctly maps the props from the connector to the hook
function connectPagination(Component) {
  const Pagination = (props) => {
    const data = usePagination(props);

    return <Component {...props} {...data} />;
  };

  return Pagination;
}
