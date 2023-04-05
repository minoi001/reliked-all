import AccountPageContent from "../components/Account/AccountPageContent.js";
import { getAllProducts, getProduct } from "../lib/shopify.js";

export default function AccountPage({ account }) {
  return (
    <div className="minh-screen py-12 sm:pt-20">
      <AccountPageContent account={account} />
    </div>
  );
}

// export async function getStaticPaths() {
//   // const products = await getAllProducts();
//   // const paths = products.map((item) => {
//   //   const handle = String(item.node.handle);
//   //   return {
//   //     params: { product: handle },
//   //   };
//   // });
//   // return {
//   //   paths,
//   //   fallback: false,
//   // };
// }

// export async function getStaticProps({ params }) {
//   const product = await getProduct(params.product);

//   return {
//     props: {
//       product,
//     },
//   };
// }
