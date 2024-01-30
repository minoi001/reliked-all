import ProductList from "../components/Homepage/ProductList";
import { useSearchParams } from "next/navigation";
import Head from "next/head";

export default function Search() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Head>
        <title>{`Search results for ${
          searchParams.get("q") || ""
        } | Shop Preowned Fashion & Beauty at Reliked`}</title>
      </Head>
      <div className="sm:px-12 align-middle p-2 w-full bg-white shadow-lg">
        <h1 className={`p-4 text-3xl font-h text-center`}>
          Search results for {query}
        </h1>
        <ProductList paramsQuery={searchParams.get("q")} />
      </div>
    </div>
  );
}
