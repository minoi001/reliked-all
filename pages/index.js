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
import Script from "next/script";

export default function Home({ products, headerContent, homepageContent }) {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-2S3478ZN8E"
      />
      <Script
        id={"google-analytics"}
        dangerouslySetInnerHTML={{
          __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());

                  gtag('config', '${process.env.GOOGLE_ANALYTICS_TRACKING_ID}', {
                  page_path: window.location.pathname,
                  }); 
              `,
        }}
      />
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
