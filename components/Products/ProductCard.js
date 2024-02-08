import Link from "next/link";
import Image from "next/image";
import { formatImageUrl, formatter } from "../../utils/helpers";
import { event } from "../../lib/ga";
import { CheckBadgeIcon, SunIcon } from "@heroicons/react/24/outline";
import WishlistButton from "./WishlistButton";

const ProductCard = ({ hit, collectionInfo, setScrollPosition }) => {
  const { handle, title, objectID } = hit;
  const image = formatImageUrl(
    hit.image.replace("_620x620", "") ??
      "https://cdn.shopify.com/s/files/1/2481/5934/files/Loading_icon_70beb786-4ca6-4438-89a3-810f9c41ac15.gif?v=1674579018",
    "500"
  );
  const altText = hit.body_html_safe ?? "image";

  const price = hit.price ?? 1000;

  const handleHitClick = () => {
    if (setScrollPosition) {
      setScrollPosition(window.scrollY);
    }
  };

  return (
    <div className="">
      <div className="group w-full bg-offWhite overflow-hidden flex items-start">
        {/* Image container */}
        <Link
          href={{ pathname: `/products/${handle}` }}
          onClick={() => {
            event("view_item", {
              currency: "GBP",
              value: price,
              items: [
                {
                  item_id: objectID,
                  item_name: title,
                },
              ],
              ecomm_pagetype: "product",
            });
            handleHitClick();
          }}
          className="grid group-hover:opacity-75-20 w-full aspect-4/5 p-3 place-items-center -mr-16"
        >
          <Image
            sizes="(max-width: 768px) 17vw, (max-width: 1200px) 15vw, 7vw"
            src={image}
            alt={altText}
            width="446"
            height="533"
            className="object-contain w-36 max-h-12 xxs:max-h-24 xs:max-h-48 sm:max-h-60"
            priority
          />
        </Link>
        {/* SVG icon */}
        <div className="ml-auto p-4">
          <WishlistButton
            itemInfo={{
              variantId: hit.objectID,
              productId: hit.id,
              handle: hit.handle.split("?")[0],
            }}
          />
        </div>
      </div>

      {/* logic
          if the hit has loaded
          if there's no collection OR the collection isn't a vendor collection show who it's sold by
          otherwise, if it's a vendor collection show you may also like on ASO item

      */}

      {hit.meta?.custom ? (
        !collectionInfo?.title || collectionInfo?.type?.value !== "Vendor" ? (
          hit.meta.custom.influencer === "Anonymous" ||
          hit.tags.includes("Anonymous") ||
          hit.tags.includes("Beauty") ||
          hit.tags.includes("HideVendor") ? (
            <div className="group flex relative">
              <span className="bg-offWhite text-offWhite px-2 py-0.5 w-full pl-3 text-sm">
                Sold by a private seller.
                <CheckBadgeIcon className="h-6 w-6 inline pb-0.5" />
              </span>
            </div>
          ) : (
            <div className="group flex relative">
              <span className="bg-cream text-almostBlack px-2 py-0.5 w-full pl-3 text-sm hover:cursor-help">
                Sold by{" "}
                {hit.meta?.custom?.influencer
                  ? hit.meta.custom.influencer
                      .split(" ")
                      .slice(0, 2)
                      .join(" ") + " "
                  : ""}
                <CheckBadgeIcon
                  color="black"
                  className="h-6 w-6 inline pb-0.5"
                />
              </span>
              <span
                className="group-hover:opacity-100 transition-opacity absolute bg-almostBlack pl-3 py-1 text-sm text-white w-full  left-1/2
  -translate-x-1/2 -translate-y-full opacity-0 px-2 mx-auto -mb-5 "
              >
                We are a preowned marketplace, so this item is sold by{" "}
                {hit.meta?.custom.influencer
                  ? hit.meta.custom.influencer
                      .split(" ")
                      .slice(0, 2)
                      .join(" ") + " "
                  : ""}
                (a private seller).
              </span>
            </div>
          )
        ) : collectionInfo?.vendor?.value !== hit.vendor ||
          hit.meta?.custom?.influencer === "Anonymous" ||
          hit.tags.includes("Anonymous") ? (
          <div className="group flex relative">
            <span className="bg-mint text-almostBlack px-2 py-0.5 w-full pl-3 text-sm hover:cursor-help">
              You might also like
              <SunIcon color="black" className="h-6 w-6 inline pb-0.5" />
            </span>
            <span
              className="group-hover:opacity-100 transition-opacity absolute bg-almostBlack pl-3 py-1 text-sm text-white w-full  left-1/2
-translate-x-1/2 -translate-y-full opacity-0 px-2 mx-auto -mb-5 "
            >
              This item is sold by another private seller but our algorithm
              thinks you might still like it!
            </span>
          </div>
        ) : (
          <div className="group flex relative">
            <span className="bg-cream text-almostBlack px-2 py-0.5 w-full pl-3 text-sm hover:cursor-help">
              Sold by{" "}
              {collectionInfo.title.split(" ").slice(0, 2).join(" ") + " "}
              <CheckBadgeIcon color="black" className="h-6 w-6 inline pb-0.5" />
            </span>
            <span
              className="group-hover:opacity-100 transition-opacity absolute bg-almostBlack pl-3 py-1 text-sm text-white w-full  left-1/2
  -translate-x-1/2 -translate-y-full opacity-0 px-2 mx-auto -mb-5 "
            >
              We are a preowned marketplace, so this item is sold by{" "}
              {collectionInfo.title.split(" ").slice(0, 2).join(" ") + " "}
              (a private seller).
            </span>
          </div>
        )
      ) : (
        // hit not loaded
        ""
      )}
      <Link
        href={{ pathname: `/products/${handle}` }}
        onClick={() => {
          event("view_item", {
            currency: "GBP",
            value: price,
            items: [
              {
                item_id: objectID,
                item_name: title,
              },
            ],
            ecomm_pagetype: "product",
          });
          handleHitClick();
        }}
      >
        <h3 className="mt-2 text-mg font-medium text-gray-900 px-1">{title}</h3>
        <h4 className="mt-2 text-md font-medium text-gray-900 px-0">
          {formatter.format(price)}
        </h4>
      </Link>
    </div>
  );
};

export default ProductCard;
