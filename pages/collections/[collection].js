import { Configure, Hits } from "react-instantsearch";
import ProductCard from "../../components/Products/ProductCard";
import ProductFilters from "../../components/Filters/ProductFilters";
import { useState } from "react";
import SlideOut from "../../components/SlideOut";

export default function CollectionPage({ collection }) {
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);

  function toggleSlideover() {
    setIsSlideOverOpen(!isSlideOverOpen);
  }
  const searchParameters = {
    query: "",
    filters: `collections:"${collection}"`,
  };
  return (
    <div className="mx-auto my-4 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="sm:px-12 align-middle p-2 w-full bg-white shadow-lg">
        <h1 className={`p-4 text-3xl capitalize font-h text-center`}>
          {collection.replace("-", " ")}
        </h1>
        <Configure {...searchParameters} />
        <div className="flex flex-row justify-between">
          <ProductFilters toggleSlideover={toggleSlideover} />
          <SlideOut
            isSlideOverOpen={isSlideOverOpen}
            toggleSlideover={toggleSlideover}
          />
        </div>
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
