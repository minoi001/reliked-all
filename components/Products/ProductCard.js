import Link from "next/link";
import Image from "next/image";
import { formatter } from "../../utils/helpers";
import { event } from "../../lib/ga";
import {
  InformationCircleIcon,
  CurrencyPoundIcon,
  SunIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";

const ProductCard = ({ hit }) => {
  const { handle, title, objectID } = hit;
  const image = hit.image
    ? hit.image
    : hit.images?.edges[0]
    ? hit.images?.edges[0].node.originalSrc
    : "https://cdn.shopify.com/s/files/1/2481/5934/files/Loading_icon_70beb786-4ca6-4438-89a3-810f9c41ac15.gif?v=1674579018";
  const altText = hit.body_html_safe ? hit.body_html_safe : "image";

  const price = hit.price ?? hit.priceRange.minVariantPrice.amount;
  return (
    <div>
      <Link
        href={{ pathname: `/products/${handle}` }}
        onClick={() =>
          event("view_item", {
            currency: hit.priceRange?.minVariantPrice?.currencyCode ?? "GBP",
            value: price,
            items: [
              {
                item_id: objectID,
                item_name: title,
              },
            ],
            ecomm_pagetype: "product",
          })
        }
      >
        <div>
          <div className="group w-full bg-offWhite overflow-hidden ">
            <div className="grid group-hover:opacity-75-20 w-full aspect-4/5 p-3 place-items-center">
              <Image
                src={image}
                alt={altText}
                width="446"
                height="533"
                className="object-contain w-36 max-h-12 xxs:max-h-24 xs:max-h-48 sm:max-h-60"
                priority
              />
            </div>
          </div>

          {hit.meta.custom && (
            <div>
              {hit.tags.toString().includes("Anonymous") ||
              hit.tags.toString().includes("HideVendor") ? (
                <div>
                  {/* only show you may also like on influencer collections */}
                  {title.includes("Black") ? (
                    <div className="group flex relative">
                      <span className="bg-mint text-almostBlack px-2 py-0.5 w-full pl-3 text-sm hover:cursor-help">
                        You might also like
                        <SunIcon
                          color="black"
                          className="h-6 w-6 inline pb-0.5 pl-1"
                        />
                      </span>
                      <span
                        className="group-hover:opacity-100 transition-opacity absolute bg-almostBlack pl-3 py-1 text-sm text-white w-full  left-1/2
    -translate-x-1/2 -translate-y-full opacity-0 px-2 mx-auto -mb-5 "
                      >
                        {/* Need to access collection title somehow and only if you hover on the mint box, not above it */}
                        This item isn{"'"}t owned by{" "}
                        {hit.meta.custom.influencer}
                        but our algorithm thinks you might still like it!
                      </span>
                    </div>
                  ) : (
                    <div className="group flex relative">
                      <span className="bg-offWhite text-almostBlack px-2 py-0.5 w-full pl-3 text-sm hover:cursor-help">
                        Sold Anonymously
                        <BanknotesIcon
                          color="black"
                          className="h-6 w-6 inline pb-0.5 pl-1"
                        />
                      </span>
                      <span
                        className="group-hover:opacity-100 transition-opacity absolute bg-almostBlack pl-3 py-1 text-sm text-white w-full  left-1/2
    -translate-x-1/2 -translate-y-full opacity-0 px-2 mx-auto -mb-5 "
                      >
                        {/* Need to access collection title somehow and only if you hover on the mint box, not above it */}
                        We are a preowned marketplace, so this item is sold by a
                        private seller.
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="group flex relative">
                  <span className="bg-cream text-almostBlack px-2 py-0.5 w-full pl-3 text-sm hover:cursor-help">
                    {hit.meta.custom.influencer}
                    <BanknotesIcon
                      color="black"
                      className="h-6 w-6 inline pb-0.5 pl-1"
                    />
                  </span>
                  <span
                    className="group-hover:opacity-100 transition-opacity absolute bg-almostBlack pl-3 py-1 text-sm text-white w-full  left-1/2
    -translate-x-1/2 -translate-y-full opacity-0 px-2 mx-auto -mb-5 "
                  >
                    {/* Need to access collection title somehow and only if you hover on the mint box, not above it */}
                    We are a preowned marketplace, so this item is sold by{" "}
                    {hit.meta.custom.influencer} (a private seller).
                  </span>
                </div>
              )}
            </div>
          )}
          <h3 className="mt-2 text-mg font-medium text-gray-900 px-1">
            {title}
          </h3>
          <h4 className="mt-2 text-md font-medium text-gray-900 px-0">
            {formatter.format(price)}
          </h4>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
