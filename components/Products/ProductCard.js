import Link from "next/link";
import Image from "next/image";
import { formatter } from "../../utils/helpers";

const ProductCard = ({ hit }) => {
  console.log("hit", hit);
  const { handle, title } = hit;
  const image = hit.image
    ? hit.image
    : hit.images?.edges[0]
    ? hit.images?.edges[0].node.originalSrc
    : "https://cdn.shopify.com/s/files/1/2481/5934/files/Loading_icon_70beb786-4ca6-4438-89a3-810f9c41ac15.gif?v=1674579018";
  const altText = hit.body_html_safe ? hit.body_html_safe : "image";

  const price = hit.price ?? hit.priceRange.minVariantPrice.amount;
  return (
    <div>
      <Link href={`/products/${handle}`} className="">
        <div className="group ">
          <div className="w-full bg-offWhite overflow-hidden ">
            <div className="grid group-hover:opacity-75-20 w-full aspect-4/5 p-3 place-items-center">
              <Image
                src={image}
                alt={altText}
                width="446"
                height="533"
                className="object-contain w-36 max-h-12 xxs:max-h-24 xs:max-h-48 sm:max-h-60"
              />
            </div>
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
          <h4 className="mt-4 text-md font-medium text-gray-900">
            {formatter.format(price)}
          </h4>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
