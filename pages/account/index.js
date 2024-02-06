import { useContext, useEffect } from "react";
import { AccountContext } from "../../context/accountContext";
import { useRouter } from "next/navigation";
import Head from "next/head";
import AccountPageTemplate from "../../components/Account/AccountPageTemplate.js";
import AccountHomeContent from "../../components/Account/PageContent/AccountHomeContent.js";
import Login from "../../components/Account/Login";
export default function AccountPage({ account }) {
  const { userInfo, logout } = useContext(AccountContext);
  const { push } = useRouter();

  const Content = () => {
    return <AccountHomeContent />;
  };

  console.log("userInfo.loginStatus", userInfo.loginStatus);

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
