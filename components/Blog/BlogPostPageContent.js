import Image from "next/image";

export default function BlogPostPageContent({ post, id }) {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 mt-2 md:mt-6">
      <div className="md:px-12 align-middle p-2 py-2 w-full bg-white shadow-lg">
        <div className="w-full p-4 py-12 text-center items-center">
          <h1 className="font-h text-3xl">{post.title}</h1>
          <center>
            <div
              className="pt-6 pb-4 items-center"
              dangerouslySetInnerHTML={{
                __html: post.excerpt,
              }}
            ></div>
            <div
              className="pt-6 pb-4 items-center content-center leading-loose space-y-4 text-center"
              dangerouslySetInnerHTML={{
                __html: post.contentHtml,
              }}
            ></div>
          </center>
        </div>

        <div className="w-full"></div>
      </div>
    </div>
  );
}
