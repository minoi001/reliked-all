import { Configure, Hits } from "react-instantsearch-dom";
import ProductCard from "../../components/Products/ProductCard";
import ProductFilters from "../../components/Filters/ProductFilters";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: "italic",
  weight: "700",
});
export default function CollectionPage({ collection }) {
  const searchParameters = {
    query: "",
    filters: `collections:"${collection}"`,
  };
  return (
    <div className="mx-auto my-4 max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* <div className="grid px-6 sm:px-12 align-middle p-2 w-full bg-white shadow-lg"> */}
      <div className="sm:px-12 align-middle p-2 w-full bg-white shadow-lg">
        <h1
          className={`p-4 text-3xl capitalize ${playfair.className} text-center`}
        >
          {collection.replace("-", " ")}
        </h1>
        <Configure {...searchParameters} />
        <ProductFilters />
        <Hits hitComponent={ProductCard} />
      </div>
    </div>
  );
}
export async function getServerSideProps({ params }) {
  return {
    props: {
      collection: params.collection,
    },
  };
}
