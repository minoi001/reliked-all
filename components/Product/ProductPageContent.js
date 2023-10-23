import ProductForm from "./ProductForm";
import RelatedProductsSection from "./RelatedProductsSection";
import { useState } from "react";
import ImageZoom from "./ImageZoom";

export default function ProductPageContent({ product, id }) {
  const [isZoomed, setZoomed] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
      <div className="md:px-12 align-middle p-2 py-2 w-full bg-white shadow-lg">
        <div className="md:flex">
          <ImageZoom product={product} />
          <div className="md:w-3/5 p-4 px-8 md:p-12">
            <ProductForm product={product} />
          </div>
        </div>
        <div className="w-full">
          <RelatedProductsSection currentObjectID={id} product={product} />
        </div>
      </div>
    </div>
  );
}
