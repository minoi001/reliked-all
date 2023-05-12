import {
  getHeaderContent,
  getHomepageContent,
  getProductsInCollection,
} from "../lib/shopify.js";
import ProductList from "../components/Homepage/ProductList.js";
import HeroImage from "../components/Homepage/HeroImage.js";
import InfluencerSlider from "../components/Homepage/InfluencerSlider.js";
import FeaturedCollections from "../components/Homepage/FeaturedCollections.js";

// type products = [];
// I need to learn more about typescript

export default function Home({ products, headerContent, homepageContent }) {
  // const { headerContent, homepageContent } = useContext(ShopContext);

  return (
    <div className="bg-white">
      <HeroImage homepageContent={homepageContent} />
      <InfluencerSlider />
      <FeaturedCollections />
      <ProductList className="z-0" />
    </div>
  );
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
  return {
    props: { products, headerContent, homepageContent },
  };
}
