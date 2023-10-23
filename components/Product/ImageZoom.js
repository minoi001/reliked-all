import React, { useState } from "react";
import Image from "next/image";

function ImageZoom({ product }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="md:w-2/5 p-4 py-12 image-container" onClick={openModal}>
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
          priority={"true"}
          loading="eager"
        />
      </div>

      {isModalOpen && (
        <div className="modal">
          <span className="close-button text-almostBlack" onClick={closeModal}>
            X
          </span>
          <img
            src={
              product.images.edges[0]
                ? product.images.edges[0].node.url
                    .replace(".png", "_1000x1000.png")
                    .replace(".jpg", "_1000x1000.jpg")
                : "https://cdn.shopify.com/s/files/1/2481/5934/files/Loading_icon_70beb786-4ca6-4438-89a3-810f9c41ac15.gif?v=1674579018"
            }
            alt={product.title}
            priority={"true"}
            loading="eager"
            className="modal-image"
          />
        </div>
      )}
    </>
  );
}

export default ImageZoom;
