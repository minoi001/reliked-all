import { Configure, Hits, RangeInput } from "react-instantsearch-dom";
import ProductCard from "../../components/Products/ProductCard";

export default function CollectionPage({ collection }) {
  const searchParameters = {
    query: "",
    filters: `collections:"${collection}"`,
  };
  return (
    <div>
      <Configure {...searchParameters} />
      <RangeInput attribute={"price"} />
      <Hits hitComponent={ProductCard} />
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
