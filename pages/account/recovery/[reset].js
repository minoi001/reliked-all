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
export async function getServerSideProps({ params, query }) {
  // Fetch data based on the slug parameter
  const token = await params;

  return {
    props: {
      token,
    },
  };
}
