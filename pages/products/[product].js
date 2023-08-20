import ProductPageContent from "../../components/Product/ProductPageContent";
import { getProduct } from "../../lib/shopify.js";

export default function ProductPage({ product, id }) {
  return (
    <div className="minh-screen py-12 sm:pt-20">
      <ProductPageContent product={product} id={id} />
    </div>
  );
}
export async function getServerSideProps({ params, query }) {
  // Fetch data based on the slug parameter
  const product = await getProduct(params.product);

  return {
    props: {
      product,
      id: query.id,
    },
  };
}
