import AccountPageContent from "../../components/Account/AccountPageContent.js";
import { getNewInProducts, getProduct } from "../../lib/shopify.js";
import { useRouter } from "next/navigation.js";
import { useEffect } from "react";
import { useContext } from "react";
import { AccountContext } from "../../context/accountContext";

export default function LoginPage({ account }) {
  const { push } = useRouter();

  const {
    userInfo,
    setUserInfo,
    getUserInfo,
    sendUserRequest,
    updateUserValue,
  } = useContext(AccountContext);

  useEffect(() => {
    if (!userInfo.loginStatus) {
      push("/account");
    }
  }, []);

  return (
    <div className="minh-screen py-12 sm:pt-20">
      <AccountPageContent account={account} />
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
