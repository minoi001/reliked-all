import { Configure, Hits, RangeInput } from "react-instantsearch-dom";
import ProductCard from "../../components/Products/ProductCard";
import AlgoliaDropdownMenu from "../../components/AlgoliaDropdownMenu";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function CollectionPage({ collection }) {
  console.log(collection);
  const searchParameters = {
    query: "",
    filters: `collections:"${collection}"`,
  };
  return (
    <div className="mx-auto my-4 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid px-6 sm:px-12 place-items-center align-middle p-2 w-full bg-white shadow-lg">
        <h1 className="p-4 text-3xl capitalize">
          {collection.replace("-", " ")}
        </h1>
        <Configure {...searchParameters} />
        <div className="pb-2">
          {AlgoliaDropdownMenu(
            "Price",
            <ChevronDownIcon className="pl-1 w-4 h-4" />,
            <RangeInput attribute="price" />
          )}
        </div>
        <Hits hitComponent={ProductCard} />
      </div>
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
