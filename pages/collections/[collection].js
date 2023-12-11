import ProductCard from "../../components/Products/ProductCard";
import ProductFilters from "../../components/Filters/ProductFilters";
import { useEffect, useState } from "react";
import SlideOut from "../../components/SlideOut";
import Head from "next/head";
import { getCollection } from "../../lib/shopify";
import { getProducts } from "../../algoliaConfig";

export default function CollectionPage({ collection, collectionInfo }) {
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [maxPage, setMaxPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { hits, nbPages } = await getProducts("", collection, page);
      setData(data.concat(hits));
      setMaxPage(nbPages);
    };
    fetchData();
  }, [collection, page]);

  function toggleSlideover() {
    setIsSlideOverOpen(!isSlideOverOpen);
  }

  function loadMore() {
    if (page < maxPage - 1) setPage(page + 1);
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
        {/* Button for collection description */}
        {/* <div
          className="pt-6 pb-4 items-center"
          dangerouslySetInnerHTML={{
            __html: collectionInfo.descriptionHtml,
          }}
        ></div> */}

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
        <div className={"ais-Hits-list"}>
          {data.map((product) => (
            <ProductCard hit={product} key={product.id} />
          ))}
        </div>
        {page < maxPage - 1 && (
          <div className={"w-full text-center p-4"}>
            <button
              className={
                "font-h text-2xl w-40 justify-center text-white bg-rose"
              }
              onClick={loadMore}
            >
              Load More
            </button>
          </div>
        )}
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
