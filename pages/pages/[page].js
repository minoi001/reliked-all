import PageContent from "../../components/Page/PageContent";
import { getPage } from "../../lib/shopify.js";
import Head from "next/head";

export default function Page({ page, id }) {
  console.log(page.title);
  return (
    <div className="minh-screen">
      <Head>
        <title>{page.title}</title>
      </Head>
      <title>{page.title}</title>
      <meta name="description" content={page.description} />
      <PageContent page={page} id={id} />
    </div>
  );
}
export async function getServerSideProps({ params, query }) {
  // Fetch data based on the slug parameter
  console.log(params);
  const page = await getPage(params.page);

  return {
    props: {
      page,
      id: page.id,
      // query ID wouldn't work? is this an issue?
    },
  };
}
