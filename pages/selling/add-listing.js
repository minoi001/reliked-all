import NewListing from "../../components/Selling/NewListing";
import { getNewInProducts, getProduct } from "../../lib/shopify.js";

export default function AddListing({ product }) {
  return (
    <div className="minh-screen py-12 sm:pt-20">
      <NewListing product={product} />
    </div>
  );
}

// export async function getStaticPaths() {
//   const products = await getNewInProducts();
//   const paths = products.map((item) => {
//     const handle = String(item.node.handle);

//     return {
//       params: { product: handle },
//     };
//   });
//   return {
//     paths,
//     fallback: false,
//   };
// }

// export async function getStaticProps({ params }) {
//   const product = await getProduct(params.product);

//   return {
//     props: {
//       product,
//     },
//   };
// }
