import { getNewInProducts, getProduct } from "../../lib/shopify.js";

import { useContext, useEffect } from "react";
import { AccountContext } from "../../context/accountContext";
import { useRouter } from "next/navigation";

export default function LoginPage({ account }) {
  const { userInfo, logout } = useContext(AccountContext);
  const { push } = useRouter();

  useEffect(() => {
    if (!userInfo.loginStatus) {
      push("/account/login");
    }
  }, []);

  return (
    <div>
      {userInfo.loginStatus ? (
        <div>
          <div className="minh-screen py-12 sm:pt-20">Account Home Page </div>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

// export async function getStaticPaths() {
//   // const products = await getNewInProducts();
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
