import Head from "next/head";
import Image from "next/image";
import {
  getHeaderContent,
  getHomepageContent,
  getProductsInCollection,
} from "../lib/shopify.js";
import ProductList from "../components/ProductList";
import { useContext, useEffect } from "react";
import { ShopContext } from "../context/shopContext.js";
import HeroImage from "../components/HeroImage.js";

// type products = [];
// I need to learn more about typescript

export default function Home({ products, headerContent, homepageContent }) {
  useEffect;
  // const { headerContent, homepageContent } = useContext(ShopContext);
  console.log(products);
  return (
    <div className="bg-white">
      <div class="text-center">
        <div className="lg:max-w-7xl mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {" "}
          <HeroImage homepageContent={homepageContent} />
        </div>
      </div>
      <ProductList products={products} className="z-0" />
    </div>
  );
}

// export function Header({ headerContent }) {
//   console.log(headerContent);
//   return (
//     <div className="">
//       <Nav headerContent={headerContent} />
//     </div>
//   );
// }

export async function getStaticProps() {
  const products = await getProductsInCollection();
  const headerContent = await getHeaderContent(
    "gid://shopify/Metaobject/57180350"
  );
  const homepageContent = await getHomepageContent();
  return {
    props: { products, headerContent, homepageContent },
  };
}
