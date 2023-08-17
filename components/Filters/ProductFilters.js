import { SortBy } from 'react-instantsearch';
import ProductFiltersWithoutSortBy from "./ProductFiltersWithoutSortBy";

const ProductFilters = ({ toggleSlideover }) => {
  return (
    // Also need to add a fixed height to the dropdown menus and add a scroll, preferably with an apply button fixed at the bottom of the dropdown menu which closes it
    // styling on algolia dropdown menu needs to be full width of the refinements/range inputs
    <>
      <div className="max-h-min lg:flex-wrap flex md:pb-4 sm:justify-between sm:static sm:inline">
        <SortBy
          className="mb-4 md:mb-0"
          /* TODO (Codemod generated): Move this into `InstantSearch`'s `initialUiState` prop.
          See https://www.algolia.com/doc/guides/building-search-ui/upgrade-guides/react/#default-refinements */
          defaultRefinement="shopify_products"
          items={[
            { value: "shopify_products_published_at_desc", label: "Newest in" },
            { value: "shopify_products_price_desc", label: "Price descending" },
            { value: "shopify_products_price_asc", label: "Price ascending" },
          ]}
        />
        <div className="xs:hidden lg:inline-flex">
          <ProductFiltersWithoutSortBy format={"row"} />
        </div>
      </div>
      <div className="lg:hidden flex content-normal justify-center mb-4">
        <div onClick={toggleSlideover} className="ais-SortBy-select px-2">
          Filters +
        </div>
      </div>
    </>
  );
};

export default ProductFilters;
