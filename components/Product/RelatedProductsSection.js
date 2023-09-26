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
    <div className="flex items-center justify-center">
      {currentIndex > 0 && (
        <div className="px-1" onClick={handlePrevClick}>
          <ChevronLeft />
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 xl:gap-4">
        {recommendations
          .slice(currentIndex, currentIndex + 4)
          .map((recommendation, index) => (
            <div key={index}>
              <ProductCard hit={recommendation} key={recommendation.objectID} />
            </div>
          ))}
      </div>
      {currentIndex < 2 && (
        <div className="px-1" onClick={handleNextClick}>
          <ChevronRight />
        </div>
      )}
    </div>
  );
};

function ChevronLeft() {
  return (
    <svg
      height="20"
      width="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      height="20"
      width="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  );
}
