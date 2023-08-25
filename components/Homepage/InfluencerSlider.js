import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { ShopContext } from "../../context/shopContext";
const InfluencerSlider = () => {
  const { homepageContent } = useContext(ShopContext);
  const productsv1 = [
    {
      img: "https://cdn.shopify.com/s/files/1/2481/5934/collections/image.jpg?v=1662378787",
      title: "Laura Wills",
      handle: "/collections/laura-wills",
    },
    {
      img: "https://images.hardlyeverwornit.com/shop_product_thumbnail/products/119920/Screenshot-2023-03-21-at-10-53-48-64198cc9d0c0c-64199dd618cbd.jpg",
      title: "bag",
      handle: "/collections/pink",
    },
  ];

  const [products, setProducts] = useState([
    {
      img: "https://cdn.shopify.com/s/files/1/2481/5934/collections/image.jpg?v=1662378787",
      title: "Laura Wills",
      handle: "/collections/laura-wills",
    },
    {
      img: "https://images.hardlyeverwornit.com/shop_product_thumbnail/products/119920/Screenshot-2023-03-21-at-10-53-48-64198cc9d0c0c-64199dd618cbd.jpg",
      title: "bag",
      handle: "/collections/pink",
    },
  ]);

  // useEffect(() => {
  //   async function getCarousel() {
  //     if (homepageContent.featured_influencers.value) {
  //       let categories = await JSON.parse(
  //         homepageContent.featured_influencers.value
  //       );

  //       setProducts(categories);
  //       getCarousel();
  //     }
  //   }
  // }, [homepageContent]);

  return (
    <div>
      <div className="grid px-4 sm:px-12 place-items-center align-middle w-full pt-6">
        <h1 className="font-h text-3xl lg:text-4xl p-4">
          Your home of celebrity and influencer closets
          {/* {homepageContent.featured_influencers.key} */}
        </h1>
        <div className="flex overflow-x-scroll w-full py-6">
          {homepageContent.featured_influencers.value
            ? JSON.parse(homepageContent.featured_influencers.value).map(
                (product, index) => (
                  <Link key={index} href={product.handle}>
                    <div className="flex-col cursor-pointer ">
                      <div className=" bg-white relative shadow-sm hover:shadow-md mr-2 w-48">
                        <div className="">
                          <Image
                            className="h-48 w-full object-cover"
                            width="100"
                            height="100"
                            src={product.img}
                            alt=""
                          />
                        </div>
                      </div>
                      <p className="text-sm p-1 font-semibold pt-2 pl-2">
                        {product.title}{" "}
                      </p>
                    </div>
                  </Link>
                )
              )
            : ""}
        </div>
      </div>
    </div>
  );
};

export default InfluencerSlider;
