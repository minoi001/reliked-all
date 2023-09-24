import React, { useState } from "react";
import { useRelatedProducts } from "@algolia/recommend-react";
import recommend from "@algolia/recommend";
import ProductCard from "../Products/ProductCard";

const recommendClient = recommend(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
);
const indexName = "shopify_products";

export default function RelatedProductsSection({ currentObjectID }) {
  const { recommendations } = useRelatedProducts({
    recommendClient,
    indexName,
    objectIDs: [currentObjectID],
  });
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

      <h2 className="font-h mx-auto my-4 max-w-7xl px-4 sm:px-6 lg:px-8 text-3xl font-extrabold text-gray-900 mt-6">
        You may also like...
      </h2>

      <ProductCarousel recommendations={recommendations} />
    </div>
  );
}

const ProductCarousel = ({ recommendations }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextClick = () => {
    setCurrentIndex(currentIndex + 1);
  };
  const handlePrevClick = () => {
    setCurrentIndex(currentIndex - 1);
  };

  return (
    <div className="flex">
      {currentIndex > 0 && (
        <div className="" onClick={handlePrevClick}>
          &lt;
        </div>
      )}

      <div className="grid grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-6 xl:gap-4">
        {recommendations
          .filter((_, index) => {
            return index >= currentIndex && index < 4 + currentIndex;
          })
          .map((recommendation, index) => (
            <div key={index}>
              <ProductCard hit={recommendation} key={recommendation.objectID} />
            </div>
          ))}
      </div>
      {currentIndex < 2 && (
        <div className="" onClick={handleNextClick}>
          &gt;
        </div>
      )}
    </div>
  );
};
