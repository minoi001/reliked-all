import { getNewInProducts, getProduct } from "../../lib/shopify.js";
import { useRouter } from "next/navigation.js";
import { useEffect } from "react";
import { useContext } from "react";
import { AccountContext } from "../../context/accountContext";
import Login from "../../components/Account/Login.js";
import Head from "next/head";

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
    // why is this redirect not working
    if (userInfo.loginStatus) {
      push("/account");
      // redirect to account page after login
    }
  }, [push, userInfo.loginStatus]);

  return (
    <div className="minh-screen py-12 sm:pt-20">
      <Head>
        <title>Login</title>
      </Head>
      <Login />
    </div>
  );
}
