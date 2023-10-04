import { useContext, useEffect } from "react";
import { AccountContext } from "../../context/accountContext";
import { useRouter } from "next/navigation";
import Head from "next/head";
import AccountPageTemplate from "../../components/Account/AccountPageTemplate.js";
import AccountHomeContent from "../../components/Account/PageContent/AccountHomeContent.js";
export default function AccountPage({ account }) {
  const { userInfo, logout } = useContext(AccountContext);
  const { push } = useRouter();

  const Content = () => {
    return <AccountHomeContent />;
  };

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
          <AccountPageTemplate Content={Content} />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
