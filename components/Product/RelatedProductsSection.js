import React from "react";
import {
  FrequentlyBoughtTogether,
  RelatedProducts,
} from "@algolia/recommend-react";
import recommend from "@algolia/recommend";
import ProductCard from "../Products/ProductCard";

const recommendClient = recommend(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
);
const indexName = "shopify_products";

export default function RelatedProductsSection({ currentObjectID }) {
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

      <RelatedProducts
        recommendClient={recommendClient}
        indexName={indexName}
        objectIDs={[currentObjectID]}
        itemComponent={({ item }) => {
          return <ProductCard hit={item} />;
        }}
        maxRecommendations={9}
        headerComponent={() => {
          return (
            <h2 className=" mx-auto my-4 max-w-7xl px-4 sm:px-6 lg:px-8 text-2xl font-extrabold text-gray-900 mt-16">
              YOU MIGHT ALSO LIKE
            </h2>
          );
        }}
        classNames={{
          list: "grid grid-cols-3 sm:grid-cols-5 gap-4",
          container: "bg-white p-4 mx-auto my-4 max-w-7xl px-4 sm:px-6 lg:px-8",
        }}
      />
    </div>
  );
}
