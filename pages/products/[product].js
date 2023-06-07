import ProductPageContent from "../../components/Product/ProductPageContent";
import { getAllProducts, getProduct } from "../../lib/shopify.js";

export default function ProductPage({ product }) {
  // TODO: Some products seem to return empty (on Algolia but not on Shopify/ wrong handle?)
  return (
    <div className="minh-screen py-12 sm:pt-20">
      <ProductPageContent product={product} />
    </div>
  );
}
export async function getServerSideProps({ params }) {
  // Fetch data based on the slug parameter
  console.log("Product?", params);
  const product = await getProduct(params.product);

  return {
    props: {
      product,
    },
  };
}
