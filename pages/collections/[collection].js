import {
  Configure,
  Hits,
  Pagination,
  RangeInput,
} from "react-instantsearch-dom";
import ProductCard from "../../components/Products/ProductCard";

export default function CollectionPage({ collection }) {
  // TODO: Some products seem to return empty (on Algolia but not on Shopify/ wrong handle?)
  // 1. Import the RefinementList component
  // 2. Query by default to the products with the handle = collection.handle
  // 3. Create a few different filters: gender, price...
  const searchParameters = {
    query: "",
    filters: `collections:"${collection}"`,
    // Add any other search parameters here
  };
  return (
    <div>
      <Configure {...searchParameters} />
      <RangeInput attribute={"price"} />
      <Hits hitComponent={ProductCard} />
      <Pagination />
    </div>
  );
}
export async function getServerSideProps({ params }) {
  // Fetch data based on the slug parameter
  //const collection = await getCollection(params.collection);

  return {
    props: {
      collection: params.collection,
    },
  };
}
