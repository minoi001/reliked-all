import Image from "next/image";

export default function PageContent({ page, id }) {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 mt-2 md:mt-6">
      <div className="md:px-12 align-middle p-2 py-2 w-full bg-white shadow-lg">
        <div className="w-full p-4 py-12  text-center">
          <h1 className="font-h text-3xl">{page.title}</h1>

          <div
            className="pt-6 pb-4"
            dangerouslySetInnerHTML={{
              __html: page.body.replaceAll("<p> </p>", ""),
            }}
          ></div>
        </div>

        <div className="w-full"></div>
      </div>
    </div>
  );
}
