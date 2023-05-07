import NewListing from '../components/Selling/NewListing';
import { getAllProducts, getProduct } from '../lib/shopify.js';

import { AccountContext } from '../context/accountContext';
import { useContext } from 'react';
import Login from '../components/Account/Login';
import Link from 'next/link';

export default function Selling({ product }) {
  const { userInfo } = useContext(AccountContext);
  return (
    <div>
      {userInfo.loginStatus ? (
        <div>
          <div className="minh-screen py-12 sm:pt-20">selling page</div>
          <Link href="/selling/add-listing">Add listing</Link>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

// export async function getStaticPaths() {
//   const products = await getAllProducts();
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
