import {
  getHeaderContent,
  getHomepageContent,
  getNavigation,
  getProductsInCollection,
  getFooterNav,
} from "../lib/shopify.js";
import HeroImage from "../components/Homepage/HeroImage.js";
import InfluencerSlider from "../components/Homepage/InfluencerSlider.js";
import FeaturedCollections from "../components/Homepage/FeaturedCollections.js";
import NewIn from "../components/Homepage/NewIn";
import Head from "next/head";

export default function Home({ headerContent, homepageContent }) {
  return (
    <>
      <div className="bg-white">
        <Head>
          <title>
            Reliked | Buy Second Hand & Preloved Clothes from Influencers
          </title>
        </Head>
        <HeroImage homepageContent={homepageContent} />
        <InfluencerSlider />
        <FeaturedCollections />
        <NewIn />
      </div>
    </>
  );
  s;
}

export async function getStaticProps() {
  const headerContent = await getHeaderContent(
    "gid://shopify/Metaobject/57180350"
  );
  const homepageContent = await getHomepageContent();
  const navigation = await getNavigation();
  const footerNavigation = await getFooterNav();

  return {
    props: {
      headerContent,
      homepageContent,
      navigation,
      footerNavigation,
    },
  };
}
