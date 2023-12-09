import { Configure, Hits } from "react-instantsearch";
import ProductCard from "../../components/Products/ProductCard";
import ProductFilters from "../../components/Filters/ProductFilters";
import { useState, useEffect } from "react";
import SlideOut from "../../components/SlideOut";
import Head from "next/head";
import { SortBy, Pagination } from "react-instantsearch";
import { getCollection } from "../../lib/shopify";

export default function CollectionPage({ collection, collectionInfo }) {
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);

  function toggleSlideover() {
    setIsSlideOverOpen(!isSlideOverOpen);
  }
  const searchParameters = {
    query: "",
    filters: `collections:"${collection}"`,
  };
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Head>
        <title>
          {collectionInfo.seo.title
            ? collectionInfo.seo.title
            : `${formatCollection(collection)} | Shop ${formatCollection(
                collection
              )}'s Preloved Clothes`}
        </title>
        <meta
          name="description"
          content={
            collectionInfo.seo.description
              ? collectionInfo.seo.description
              : collectionInfo.description
              ? collection.description
              : collectionInfo.title
          }
        />
      </Head>
      <div className="sm:px-12 align-middle p-2 w-full bg-white shadow-lg">
        <h1 className={`p-4 text-3xl capitalize font-h text-center`}>
          {collectionInfo.title}
        </h1>
        {/* Button for collection description */}
        {/* <div
          className="pt-6 pb-4 items-center"
          dangerouslySetInnerHTML={{
            __html: collectionInfo.descriptionHtml,
          }}
        ></div> */}
        <Configure {...searchParameters} />
        <div className="flex flex-row justify-between">
          <ProductFilters
            toggleSlideover={toggleSlideover}
            collectionInfo={collectionInfo}
          />
          <SlideOut
            isSlideOverOpen={isSlideOverOpen}
            toggleSlideover={toggleSlideover}
            collectionInfo={collectionInfo}
          />
        </div>
        <Hits
          hitComponent={(hit) => (
            <ProductCard
              hit={hit}
              collection={collection}
              collectionInfo={collectionInfo}
            />
          )}
        />
        {/* <Hits hitComponent={ProductCard} collection={collection} /> */}
        <Pagination
          className="mb-3 mt-12"
          translations={{
            previous: "Previous",
            next: "Next",
            first: "First",
            last: "Last",
            page(currentRefinement) {
              return currentRefinement;
            },
          }}
          showLast={true}
        />
      </div>
    </div>
  );
}
export async function getServerSideProps({ params }) {
  const collectionInfo = await getCollection(params.collection);
  return {
    props: {
      collection: params.collection,
      collectionInfo: collectionInfo,
    },
  };
}

function capitalizeFirstLetters(string) {
  const words = string.split(" ");

  return words
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(" ");
}

const formatCollection = (collection) => {
  return capitalizeFirstLetters(collection.replace("-", " "));
};
