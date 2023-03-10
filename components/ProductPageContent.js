import Image from "next/image";
import ProductForm from "./ProductForm";
export default function ProductPageContent({ product }) {
  return (
    <div className="flex flex-col justify-center items-center space-y-8 md:flex-row md:items-start md:space-y-0 md:spacex-4 lg:space-x-8 max-w-6xl w-11/12 mx-auto">
      {/* {product.title} */}
      <div className="w-full max-w-md border bg-white rounded-2xl overflow-hidden shadow-lg md:w-1/2">
        <div className="relative h-full w-full p-5">
          <Image
            src={product.images.edges[0].node.url}
            alt={product.images.edges[0].node.altText}
            height="2000"
            width="1000"
          />
        </div>
      </div>
      <ProductForm product={product} />
    </div>
  );
}
