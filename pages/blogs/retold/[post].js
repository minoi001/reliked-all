import { getBlogPost } from "../../../lib/shopify.js";
import BlogPostPageContent from "../../../components/Blog/BlogPostPageContent.js";
import Head from "next/head";

export default function BlogPost({ post, id }) {
  return (
    <div className="minh-screen">
      <Head>
        <title>{post.title}</title>
      </Head>
      <title>{post.title}</title>
      <meta name="description" content={post.description} />
      <BlogPostPageContent post={post} id={id} />
    </div>
  );
}
export async function getServerSideProps({ params, query }) {
  // Fetch data based on the slug parameter
  const post = await getBlogPost(`${params.post}`);
  return {
    props: {
      post,
      id: post.id,
    },
  };
}
