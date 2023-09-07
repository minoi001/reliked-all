import Head from "next/head";
import Reset from "../../../../components/Account/Recovery/Reset";
import { useParams } from "next/navigation";

export default function ResetPage({ reset }) {
  return (
    <div className="minh-screen">
      <Head>
        <title>Password Reset</title>
      </Head>
      <title>Password Reset</title>
      {/* <meta name="description" content={product.description} />; */}
      <Reset reset={reset} id={reset.token} />
    </div>
  );
}
export async function getServerSideProps({ params, query, resolvedUrl }) {
  // Fetch data based on the slug parameter
  const reset = await params;
  const id = await query;
  const url = await resolvedUrl.replace(
    "/account/recovery/",
    "https://e-bloggers.myshopify.com/_t/c/"
  );

  return {
    props: {
      reset,
      id,
      url,
    },
  };
}
