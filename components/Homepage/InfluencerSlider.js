import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const InfluencerSlider = () => {
  const products = [
    {
      img: 'https://images.hardlyeverwornit.com/shop_product_thumbnail/products/122918/F50627C9-6C03-4D7F-9A99-4598CF2D115E-6418d2802cc39-64199dc26c9e3.jpg',
      title: 'Machalka',
    },
    {
      img: 'https://images.hardlyeverwornit.com/shop_product_thumbnail/products/119920/Screenshot-2023-03-21-at-10-53-48-64198cc9d0c0c-64199dd618cbd.jpg',
      title: 'bag',
    },
    {
      img: 'https://images.hardlyeverwornit.com/shop_product_thumbnail/products/122579/i09-6415ca2536abb-641694c589e6d.jpg',
      title: 'chanel',
    },
    {
      img: 'https://images.hardlyeverwornit.com/shop_product_thumbnail/products/122293/622391-01-jpg-641360a8d4832-6414521ede818.jpg',
      title: 'loewe',
    },
    {
      img: 'https://images.hardlyeverwornit.com/shop_product_thumbnail/products/122018/i01-6411e693299a6-6411f89683384.jpg',
      title: 'balenciaga',
    },
    {
      img: 'https://images.hardlyeverwornit.com/shop_product_thumbnail/products/122924/P00776280-6418dff2bd2fc-64199dd1bf2e3.jpg',
      title: 'Joseph',
    },
    {
      img: 'https://images.hardlyeverwornit.com/shop_product_thumbnail/products/122918/F50627C9-6C03-4D7F-9A99-4598CF2D115E-6418d2802cc39-64199dc26c9e3.jpg',
      title: 'Machalka',
    },
    {
      img: 'https://images.hardlyeverwornit.com/shop_product_thumbnail/products/119920/Screenshot-2023-03-21-at-10-53-48-64198cc9d0c0c-64199dd618cbd.jpg',
      title: 'bag',
    },
    {
      img: 'https://images.hardlyeverwornit.com/shop_product_thumbnail/products/122579/i09-6415ca2536abb-641694c589e6d.jpg',
      title: 'chanel',
    },
    {
      img: 'https://images.hardlyeverwornit.com/shop_product_thumbnail/products/122293/622391-01-jpg-641360a8d4832-6414521ede818.jpg',
      title: 'loewe',
    },
    {
      img: 'https://images.hardlyeverwornit.com/shop_product_thumbnail/products/122018/i01-6411e693299a6-6411f89683384.jpg',
      title: 'balenciaga',
    },
    {
      img: 'https://images.hardlyeverwornit.com/shop_product_thumbnail/products/122924/P00776280-6418dff2bd2fc-64199dd1bf2e3.jpg',
      title: 'Joseph',
    },
  ];
  return (
    <div className="">
      <div className="container w-full ml-6 -px-2 py-5 lg:max-w-7xl lg:px-8">
        <h1 className="font-h text-3xl lg:text-4xl py-5 font-bold">Your home of celebrity and influencer closets</h1>
        <div className="flex overflow-x-scroll">
          {products.map((product, index) => (
            <Link key={index} href={'/products'}>
              <div className="flex-col cursor-pointer">
                <div className=" bg-white flex items-center justify-center shadow-sm hover:shadow-md h-48 w-36 ">
                  <Image className="w-100" width="100" height="100" src={product.img} alt="" />
                </div>
                <p className="text-sm p-1 font-semibold">{product.title} </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfluencerSlider;
