import Link from "next/link";
import Image from "next/image";
import { formatter } from "../../utils/helpers";
import { event } from "../../lib/ga";
import {
  InformationCircleIcon,
  QuestionMarkCircleIcon,
  SunIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";

import { useEffect } from "react";

const ProductCard = ({ hit, collection, collectionInfo }) => {
  useEffect(() => {
    console.log(hit.hit);
  }, []);

  const { handle, title, objectID } = hit.hit ? hit.hit : hit;
  const image = hit.hit.image
    ? hit.hit.image
    : hit.hit.images?.edges[0]
    ? hit.hit.images?.edges[0].node.originalSrc
    : "https://cdn.shopify.com/s/files/1/2481/5934/files/Loading_icon_70beb786-4ca6-4438-89a3-810f9c41ac15.gif?v=1674579018";
  const altText = hit.hit.body_html_safe ? hit.hit.body_html_safe : "image";

  const price = hit.hit ? hit.hit.price : 1000;

  return (
    <div>
      <Link
        href={{ pathname: `/products/${handle}` }}
        onClick={() =>
          event("view_item", {
            currency:
              hit.hit.priceRange?.minVariantPrice?.currencyCode ?? "GBP",
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
                sizes="(max-width: 768px) 17vw, (max-width: 1200px) 15vw, 7vw"
                src={image}
                alt={altText}
                width="446"
                height="533"
                className="object-contain w-36 max-h-12 xxs:max-h-24 xs:max-h-48 sm:max-h-60"
                priority
              />
            </div>
          </div>

          {hit.hit.meta.custom && collectionInfo && collectionInfo.type && (
            <div>
              {collectionInfo.type.value !== "Vendor" ? (
                ""
              ) : collectionInfo.vendor.value !== hit.hit.vendor ||
                hit.hit.meta.custom.influencer === "Anonymous" ||
                hit.hit.tags.includes("Anonymous") ? (
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
                    This item is sold by another private seller but our
                    algorithm thinks you might still like it!
                  </span>
                </div>
              ) : (
                <div className="group flex relative">
                  <span className="bg-cream text-almostBlack px-2 py-0.5 w-full pl-3 text-sm hover:cursor-help">
                    Sold by{" "}
                    {collectionInfo.title.split(" ").slice(0, 2).join(" ") +
                      " "}
                    <CheckBadgeIcon
                      color="black"
                      className="h-6 w-6 inline pb-0.5 pl-1"
                    />
                  </span>
                  <span
                    className="group-hover:opacity-100 transition-opacity absolute bg-almostBlack pl-3 py-1 text-sm text-white w-full  left-1/2
    -translate-x-1/2 -translate-y-full opacity-0 px-2 mx-auto -mb-5 "
                  >
                    We are a preowned marketplace, so this item is sold by{" "}
                    {collectionInfo.title.split(" ").slice(0, 2).join(" ") +
                      " "}
                    (a private seller).
                  </span>
                </div>
              )}
              {/* { collectionInfo.type !== "Vendor" ||
              hit.hit.tags.toString().includes("HideVendor") ? (
                <div>
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
                        This item isn{"'"}t owned by{" "}
                        {hit.hit.meta.custom.influencer}
                        but our algorithm thinks you might still like it!
                      </span>
                    </div>
                  ) : (
                    <div className="group flex relative">
                      <span className="bg-offWhite text-almostBlack px-2 py-0.5 w-full pl-3 text-sm hover:cursor-help">
                        Sold Anonymously
                        <QuestionMarkCircleIcon
                          color="black"
                          className="h-6 w-6 inline pb-0.5 pl-1"
                        />
                      </span>
                      <span
                        className="group-hover:opacity-100 transition-opacity absolute bg-almostBlack pl-3 py-1 text-sm text-white w-full  left-1/2
    -translate-x-1/2 -translate-y-full opacity-0 px-2 mx-auto -mb-5 "
                      >
                        We are a preowned marketplace, so this item is sold by a
                        private seller.
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="group flex relative">
                  <span className="bg-cream text-almostBlack px-2 py-0.5 w-full pl-3 text-sm hover:cursor-help">
                    Sold by {hit.hit.meta.custom.influencer}
                    <CheckBadgeIcon
                      color="black"
                      className="h-6 w-6 inline pb-0.5 pl-1"
                    />
                  </span>
                  <span
                    className="group-hover:opacity-100 transition-opacity absolute bg-almostBlack pl-3 py-1 text-sm text-white w-full  left-1/2
    -translate-x-1/2 -translate-y-full opacity-0 px-2 mx-auto -mb-5 "
                  >
                    We are a preowned marketplace, so this item is sold by{" "}
                    {hit.hit.meta.custom.influencer} (a private seller).
                  </span>
                </div>
              )} */}
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
