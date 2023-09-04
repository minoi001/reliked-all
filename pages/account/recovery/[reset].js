import Head from "next/head";
import Reset from "../../../components/Account/Recovery/Reset";
import { useParams } from "next/navigation";

export default function ResetPage({ token }) {
  return (
    <div className="minh-screen">
      <Head>
        <title>Password Reset</title>
      </Head>
      <title>Password Reset</title>
      {/* <meta name="description" content={product.description} />; */}
      <Reset token={token} id={token} />
    </div>
  );
}
export async function getServerSideProps({ params, query, resolvedUrl }) {
  // Fetch data based on the slug parameter
  const token = await params;
  const id = await query;
  const url = await resolvedUrl.replace(
    "/account/recovery/",
    "https://e-bloggers.myshopify.com/_t/c/"
  );

  return {
    props: {
      token,
      id,
      url,
    },
  };
}
