import {
  getHeaderContent,
  getHomepageContent,
  getProductsInCollection,
  getNavigation,
} from "../lib/shopify.js";
import HeroImage from "../components/Homepage/HeroImage.js";
import InfluencerSlider from "../components/Homepage/InfluencerSlider.js";
import FeaturedCollections from "../components/Homepage/FeaturedCollections.js";
import NewIn from "../components/Homepage/NewIn";
import Head from "next/head";
import Script from "next/script";

// type products = [];
// I need to learn more about typescript

export default function Home({ products, headerContent, homepageContent }) {
  // const { headerContent, homepageContent } = useContext(ShopContext);

  return (
    <>
      <Head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-2S3478ZN8E"
        />
      </Head>
      <Script
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

// export function Header({ headerContent }) {
//   console.log(headerContent);
//   return (
//     <div >
//       <Nav headerContent={headerContent} />
//     </div>
//   );
// }

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
