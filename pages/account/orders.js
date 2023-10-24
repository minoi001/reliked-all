import { useContext, useEffect } from "react";
import { AccountContext } from "../../context/accountContext";
import { useRouter } from "next/navigation";
import Head from "next/head";
import AccountPageTemplate from "../../components/Account/AccountPageTemplate.js";
import AccountOrdersContent from "../../components/Account/PageContent/AccountOrdersContent.js";
import Login from "../../components/Account/Login";
export default function AccountOrdersPage({ account }) {
  const { userInfo, logout } = useContext(AccountContext);
  const { push } = useRouter();
  const Content = () => {
    return <AccountOrdersContent />;
  };

  return (
    <div>
      <Head>
        <title>Account</title>
      </Head>
      {userInfo.loginStatus ? (
        <div>
          <AccountPageTemplate Content={Content} />
        </div>
      ) : (
        <div>
          <Login />
        </div>
      )}
    </div>
  );
}
