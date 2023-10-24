import { useContext, useEffect } from "react";
import { AccountContext } from "../../context/accountContext";
import { useRouter } from "next/navigation";
import Head from "next/head";
import AccountPageTemplate from "../../components/Account/AccountPageTemplate.js";
import AccountRewardsContent from "../../components/Account/PageContent/AccountRewardsContent.js";
import Login from "../../components/Account/Login";
export default function AccountRewardsPage({ account }) {
  const { userInfo, logout } = useContext(AccountContext);
  const { push } = useRouter();
  const Content = () => {
    return <AccountRewardsContent />;
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
