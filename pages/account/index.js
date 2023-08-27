import { getNewInProducts, getProduct } from "../../lib/shopify.js";

import { useContext, useEffect } from "react";
import { AccountContext } from "../../context/accountContext";
import { useRouter } from "next/navigation";
import Head from "next/head";

export default function LoginPage({ account }) {
  const { userInfo, logout } = useContext(AccountContext);
  const { push } = useRouter();

  useEffect(() => {
    if (!userInfo.loginStatus) {
      push("/account/login");
    }
  }, [push, userInfo.loginStatus]);

  return (
    <div>
      <Head>
        <title>Account</title>
      </Head>
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
