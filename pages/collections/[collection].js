import ProductPageContent from "../../components/Product/ProductPageContent";
import { getAllProducts, getCollection } from "../../lib/shopify.js";

export default function CollectionPage({ collection }) {
  // TODO: Some products seem to return empty (on Algolia but not on Shopify/ wrong handle?)
  return <div className="minh-screen py-12 sm:pt-20">Collection Page</div>;
}
export async function getServerSideProps({ params }) {
  // Fetch data based on the slug parameter
  const collection = await getCollection(params.collection);

  return {
    props: {
      collection,
    },
  };
}
