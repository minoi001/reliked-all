import PageContent from "../../components/Page/PageContent";
import { getPage } from "../../lib/shopify.js";
import Head from "next/head";

export default function Page({ page, id }) {
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
export async function getServerSideProps({ params }) {
  // Fetch data based on the slug parameter
  const page = await getPage(params.page);

  return {
    props: {
      page,
      id: page.id,
    },
  };
}
