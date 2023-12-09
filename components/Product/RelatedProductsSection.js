import React, { useEffect, useMemo, useState } from "react";
import { useRelatedProducts } from "@algolia/recommend-react";
import recommend from "@algolia/recommend";
import ProductCard from "../Products/ProductCard";
import { getSimilarProducts } from "../../algoliaConfig";

const recommendClient = recommend(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
);
const indexName = "shopify_products";

export default function RelatedProductsSection({ currentObjectID, product }) {
  const [products, setProducts] = useState([]);

  const { recommendations } = useRelatedProducts({
    recommendClient,
    indexName,
    objectIDs: [currentObjectID],
    maxRecommendations: 10,
    filters: "collections:in-stock",
  });

  useEffect(() => {
    if (recommendations.length > 0) {
      setProducts(recommendations);
    } else {
      getSimilarProducts(product.brand).then((r) => setProducts(r));
    }
  }, [recommendations, product.brand]);

  return (
    <div>
      {/*TODO: We don't yet have the conversion events to enable this*/}
      {/*<FrequentlyBoughtTogether*/}
      {/*  recommendClient={recommendClient}*/}
      {/*  indexName={indexName}*/}
      {/*  objectIDs={[currentObjectID]}*/}
      {/*  itemComponent={({ item }) => {*/}
      {/*    return (*/}
      {/*      <pre>*/}
      {/*        <code>{JSON.stringify(item)}</code>*/}
      {/*      </pre>*/}
      {/*    );*/}
      {/*  }}*/}
      {/*/>*/}

      <YouMayAlsoLike recommendations={products} />
    </div>
  );
}

const YouMayAlsoLike = ({ recommendations }) => {
  return (
    <>
      <h2 className="font-h mx-auto my-4 max-w-7xl px-4 sm:px-6 lg:px-8 text-3xl font-extrabold text-gray-900 mt-6">
        You may also like...
      </h2>
      <div className="flex items-center justify-center mb-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 xl:gap-4">
          {recommendations.map((recommendation, index) => (
            <ProductCard hit={recommendation} key={recommendation.objectID} />
          ))}
        </div>
      </div>
    </>
  );
};

function ChevronLeft({ colour }) {
  return (
    <svg
      height="20"
      width="20"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      stroke={colour}
      className="hover:cursor-pointer"
    >
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
  );
}

function ChevronRight({ colour }) {
  return (
    <svg
      className="hover:cursor-pointer"
      height="20"
      width="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke={colour}
      strokeWidth="1.5"
    >
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  );
}
