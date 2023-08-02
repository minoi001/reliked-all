import Image from "next/image";
import ProductForm from "./ProductForm";
import RelatedProductsSection from "./RelatedProductsSection";
export default function ProductPageContent({ product }) {
  return (
    <div>
      <div className="flex flex-col justify-center items-center space-y-8 md:flex-row md:items-start md:space-y-0 md:spacex-4 lg:space-x-8 max-w-6xl w-11/12 mx-auto ">
        {/* {product.title} */}
        <div className="p-2 shadow-lg flex flex-col w-full aspect-7/12 md:w-5/12 bg-white max-h-96">
          <div className="grid py-16 place-items-center align-middle max-sm:py-24">
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
              className="static object-contain center max-h-60"
              priority={true}
            />
            {/* <img
              src={
                product.images
                  ? product.images.edges[0].node.url
                      .replace(".png", "_1000x1000.png")
                      .replace(".jpg", "_1000x1000.jpg")
                  : "https://cdn.shopify.com/s/files/1/2481/5934/files/Loading_icon_70beb786-4ca6-4438-89a3-810f9c41ac15.gif?v=1674579018"
              }
            ></img> */}
          </div>
        </div>
        <ProductForm product={product} />
      </div>
      <RelatedProductsSection />
    </div>
  );
}
