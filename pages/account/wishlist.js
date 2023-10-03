import { getNewInProducts, getProduct } from "../../lib/shopify.js";

import { useContext, useEffect } from "react";
import { AccountContext } from "../../context/accountContext";
import { useRouter } from "next/navigation";
import Head from "next/head";
import AccountPageContent from "../../components/Account/AccountPageContent.js";

export default function AccountWishlistPage({ account }) {
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
          <AccountPageContent />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
