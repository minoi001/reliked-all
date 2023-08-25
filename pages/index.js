import {
  getHeaderContent,
  getHomepageContent,
  getNavigation,
  getProductsInCollection,
} from "../lib/shopify.js";
import HeroImage from "../components/Homepage/HeroImage.js";
import InfluencerSlider from "../components/Homepage/InfluencerSlider.js";
import FeaturedCollections from "../components/Homepage/FeaturedCollections.js";
import NewIn from "../components/Homepage/NewIn";
import { GoogleAnalytics } from "../components/GoogleAnalytics";

export default function Home({ products, headerContent, homepageContent }) {
  return (
    <>
      <GoogleAnalytics />
      <div className="bg-white">
        <HeroImage homepageContent={homepageContent} />
        <InfluencerSlider />
        <FeaturedCollections />
        <NewIn products={products} />
      </div>
    </>
  );
  s;
}

export async function getStaticProps() {
  const products = await getProductsInCollection();
  const headerContent = await getHeaderContent(
    "gid://shopify/Metaobject/57180350"
  );
  const homepageContent = await getHomepageContent();
  const navigation = await getNavigation();

  return {
    props: { products, headerContent, homepageContent, navigation },
  };
}
