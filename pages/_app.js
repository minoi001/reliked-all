import "../styles/globals.css";
import Layout from "../components/Layout";
import ShopProvider from "../context/shopContext";
import ProductProvider from "../context/productContext";
import AccountProvider from "../context/accountContext";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <div className="bg-offWhite">
      <title>Reliked Headless Demo Store</title>
      {/* Image Share Link Preview Thumbnail */}
      <meta
        property="og:image"
        content="https://cdn.shopify.com/s/files/1/2481/5934/files/Homepage_Design_24.png?v=1680620417"
      />
      <ShopProvider>
        <AccountProvider>
          <ProductProvider>
            <Layout>
              <Component {...pageProps} key={router.asPath} />
            </Layout>
          </ProductProvider>
        </AccountProvider>
      </ShopProvider>
    </div>
  );
}

export default MyApp;
