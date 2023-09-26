import ProductPageContent from "../../components/Product/ProductPageContent";
import { getProduct } from "../../lib/shopify.js";
import Head from "next/head";
import { getObjectIDByProductHandle } from "../../algoliaConfig";

export default function ProductPage({ product, id }) {
  return (
    <div className="minh-screen">
      <Head>
        <title>{product.title}</title>
      </Head>
      <title>{product.title}</title>
      <meta name="description" content={product.description} />
      <ProductPageContent product={product} id={id} />
    </div>
  );
}
export async function getServerSideProps({ params }) {
  // Fetch data based on the slug parameter
  const product = await getProduct(params.product);
  const id = await getObjectIDByProductHandle(params.product);

  return {
    props: {
      product,
      id,
    },
  };
}
