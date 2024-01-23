import ProductCard from "../../components/Products/ProductCard";
import ProductFilters from "../../components/Filters/ProductFilters";
import { useContext, useEffect, useState } from "react";
import SlideOut from "../../components/SlideOut";
import Head from "next/head";
import { getCollection } from "../../lib/shopify";
import { Configure, Hits } from "react-instantsearch";
import { ProductContext } from "../../context/productContext";
import { CustomPagination } from "../../components/Pagination";
import { useRouter } from "next/router";

export default function CollectionPage({ collection, collectionInfo }) {
  const { scrollPosition, setScrollPosition } = useContext(ProductContext);
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [searchParameters, setSearchParameters] = useState({});

  //get page number from url
  const router = useRouter();
  const { query } = router;
  const pageNumber = Number(query.page) || 0;

  useEffect(() => {
    setSearchParameters({
      filters: `collections:"${collection}"`,
      page: pageNumber - 1,
    });

    window.scrollTo(0, scrollPosition);
  }, []);

  function toggleSlideover() {
    setIsSlideOverOpen(!isSlideOverOpen);
  }

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
              hit={hit.hit}
              collection={collection}
              collectionInfo={collectionInfo}
              setScrollPosition={setScrollPosition}
            />
          )}
        />
        <CustomPagination setScrollPosition={setScrollPosition} />
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
