import Image from "next/image";
import ProductForm from "./ProductForm";
import RelatedProductsSection from "./RelatedProductsSection";
export default function ProductPageContent({ product, id }) {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
      <div className="md:px-12 align-middle p-2 py-2 w-full bg-white shadow-lg">
        <div className="md:flex">
          <div className="md:w-2/5 p-4 py-12">
            <Image
              src={
                product.images.edges[0]
                  ? product.images.edges[0].node.url
                      .replace(".png", "_1000x1000.png")
                      .replace(".jpg", "_1000x1000.jpg")
                  : "https://cdn.shopify.com/s/files/1/2481/5934/files/Loading_icon_70beb786-4ca6-4438-89a3-810f9c41ac15.gif?v=1674579018"
              }
              alt={product.title}
              height="1000"
              width="1000"
              sizes="(max-width: 768px) 80vw, (max-width: 1200px) 33vw, 15vw"
              className="w-full aspect-11/12 object-contain p-12 bg-offWhite bg-off"
              priority={true}
              loading="eager"
            />
          </div>
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
