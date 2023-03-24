import NewListing from "../components/selling/NewListing.js";
import { getAllProducts, getProduct } from "../lib/shopify.js";

export default function AddListing({ selling }) {
  return (
    <div className="minh-screen py-12 sm:pt-20">
      <NewListing selling={selling} />
    </div>
  );
}
