import Head from "next/head";
import Image from "next/image";
import { getProductsInCollection } from "../lib/shopify.js";
import ProductList from "../components/ProductList";

// type products = [];
// I need to learn more about typescript

export default function Home({ products }) {
  console.log(products);
  return (
    <div className="">
      <ProductList products={products} />
    </div>
  );
}

export async function getStaticProps() {
  const products = await getProductsInCollection();
  return {
    props: { products },
  };
}
