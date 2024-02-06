import Head from "next/head";
import AccountPageTemplate from "../../components/Account/AccountPageTemplate.js";
import AccountWishlistContent from "../../components/Account/PageContent/AccountWishlistContent.js";

export default function AccountWishlistPage({ account }) {
  const Content = () => {
    return <AccountWishlistContent />;
  };

  return (
    <div>
      <Head>
        <title>Account</title>
      </Head>
      <AccountPageTemplate Content={Content} />
    </div>
  );
}
