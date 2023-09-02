import Head from "next/head";
import { getBlogPostsList } from "../../../lib/shopify";
import BlogPageContent from "../../../components/Blog/BlogPageContent";

export default function BlogPostList({ blog, id }) {
  return (
    <div className="minh-screen">
      <Head>
        <title>Reliked Blog | Retold</title>
      </Head>
      <meta name="description" content={blog.description} />

      <BlogPageContent blog={blog} id={id} />
    </div>
  );
}

export async function getServerSideProps({ params, query }) {
  // Fetch data based on the slug parameter
  const blog = await getBlogPostsList(); //

  return {
    props: {
      blog,
      id: blog.id,
      // query ID wouldn't work? is this an issue?
    },
  };
}
