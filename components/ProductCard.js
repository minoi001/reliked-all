import Link from "next/link";
import Image from "next/image";
import { formatter } from "../utils/helpers";

const ProductCard = ({ product }) => {
  const { handle, title } = product.node;
  const { altText, originalSrc } = product.node.images.edges[0]
    ? product.node.images.edges[0].node
    : {
        originalSrc:
          "https://cdn.shopify.com/s/files/1/2481/5934/files/Loading_icon_70beb786-4ca6-4438-89a3-810f9c41ac15.gif?v=1674579018",
        altText: "placeholder",
      };
  const price = product.node.priceRange.minVariantPrice.amount;
  // console.log(product);
  return (
    <Link href={`/products/${handle}`}>
      <div className="group">
        <div className="w-full bg-gray-200 rounded-3xl overflow-hidden">
          <div className="relative group-hover:opacity-75 h-full p-3">
            <Image src={originalSrc} alt={title} width="500" height="250" />
          </div>
        </div>
        <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
        <h4 className="mt-4 text-md font-medium text-gray-900">
          {formatter.format(price)}
        </h4>
      </div>
    </Link>
  );
};

export default ProductCard;