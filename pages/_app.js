import "../styles/globals.css";
import Layout from "../components/Layout";
import ShopProvider from "../context/shopContext";
import ProductProvider from "../context/productContext";
import AccountProvider from "../context/accountContext";
import { useRouter } from "next/router";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-dom";
import ErrorBoundary from "../components/ErrorBoundary";

const appId = process.env.ALGOLIA_APP_ID;
const apiKey = process.env.ALGOLIA_API_KEY;

const searchClient = algoliasearch(appId, apiKey);

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
      <InstantSearch searchClient={searchClient} indexName="shopify_products">
        <ShopProvider>
          <AccountProvider>
            <ProductProvider>
              <Layout>
                <ErrorBoundary>
                  <Component {...pageProps} key={router.asPath} />
                </ErrorBoundary>
              </Layout>
            </ProductProvider>
          </AccountProvider>
        </ShopProvider>
      </InstantSearch>
    </div>
  );
}

export default MyApp;
