import React, { useState } from "react";
import Image from "next/image";
import { formatImageUrl } from "../../utils/helpers";
import WishlistButton from "../Products/WishlistButton";

function ImageZoom({ product }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [placeholderImage, setPlaceholderImage] = useState(
    "https://cdn.shopify.com/s/files/1/2481/5934/files/Loading_icon_70beb786-4ca6-4438-89a3-810f9c41ac15.gif?v=1674579018"
  );

  const [focusImage, setFocusImage] = useState(
    formatImageUrl(product?.images?.edges[0]?.node?.url, "1000")
  );

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="w-full md:w-2/5">
      <div className="group w-full overflow-hidden flex items-start pl-6 pt-6">
        <Image
          src={focusImage ? focusImage : placeholderImage}
          alt={product.title}
          height="1000"
          width="1000"
          sizes="(max-width: 768px) 80vw, (max-width: 1200px) 33vw, 15vw"
          className="w-full aspect-11/12 object-contain p-12 bg-offWhite bg-off cursor-pointer"
          priority={"true"}
          loading="eager"
          onClick={openModal}
        />
        <div className="ml-auto p-4">
          <div className=" fill-black text-white cursor-pointer -ml-16 ">
            <WishlistButton
              itemInfo={{
                productId: parseFloat(product.id.slice(-13)),
                variantId: product.variants.edges[0].node.id.slice(-14),
                handle: product.handle,
              }}
            />
          </div>
        </div>
      </div>

      {product?.images?.edges?.length > 1 ? (
        <div
          alt="images carousel"
          className="list-none overflow-y-hidden flex max-h-36 px-3 overflow-x-scroll"
        >
          {product.images?.edges?.map((image, i) => (
            <div className="p-1 w-1/4 inline-block" key={i}>
              <Image
                src={
                  image.node.url
                    ? formatImageUrl(image.node.url, "1000")
                    : placeholderImage
                }
                alt={image.alt ?? product.title}
                height="1000"
                width="1000"
                sizes="(max-width: 768px) 80vw, (max-width: 1200px) 33vw, 15vw"
                className="w-full aspect-11/12 object-contain p-2 bg-offWhite hover:cursor-pointer"
                onClick={() =>
                  setFocusImage(formatImageUrl(image.node.url, "1000"))
                }
              />
            </div>
          ))}
        </div>
      ) : (
        ""
      )}

      {isModalOpen && (
        <div className="modal">
          <span className="close-button text-almostBlack" onClick={closeModal}>
            X
          </span>
          <Image
            src={focusImage ? focusImage : placeholderImage}
            alt={product.title}
            priority={"true"}
            loading="eager"
            className="modal-image object-contain"
            width="2000"
            height="2000"
          />
        </div>
      )}
    </div>
  );
}

export default ImageZoom;
