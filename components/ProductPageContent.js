import Image from "next/image";
import ProductForm from "./ProductForm";
export default function ProductPageContent({ product }) {
  return (
    <div>
      <div className="flex flex-col justify-center items-center space-y-8 md:flex-row md:items-start md:space-y-0 md:spacex-4 lg:space-x-8 max-w-6xl w-11/12 mx-auto z-0">
        {/* {product.title} */}
        <div className="w-full max-w-md border bg-white overflow-hidden shadow-lg md:w-1/2">
          <div className="grid py-14 place-items-center">
            <Image
              src={
                product.images
                  ? product.images.edges[0].node.url
                  : "https://cdn.shopify.com/s/files/1/2481/5934/files/Loading_icon_70beb786-4ca6-4438-89a3-810f9c41ac15.gif?v=1674579018"
              }
              alt={product.title}
              height="2000"
              width="1000"
              className="z-0 object-contain center max-h-96"
            />
          </div>
        </div>
        <ProductForm product={product} />
      </div>
    </div>
  );
}
