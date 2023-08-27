import NewListing from "../../components/Selling/NewListing";
import Head from "next/head";

export default function AddListing({ product }) {
  return (
    <div className="minh-screen py-12 sm:pt-20">
      <Head>
        <title>Add Listing</title>
      </Head>
      <NewListing product={product} />
    </div>
  );
}
