import "../styles/globals.css";
import Layout from "../components/Layout";
import ShopProvider from "../context/shopContext";
import ProductProvider from "../context/productContext";
import AccountProvider from "../context/accountContext";
import { useRouter } from "next/router";
import ErrorBoundary from "../components/ErrorBoundary";
import { indexNames, searchClient } from "../algoliaConfig";
import { InstantSearch } from "react-instantsearch";

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
      <InstantSearch
        searchClient={searchClient}
        indexName={indexNames.products}
        insights={{
          insightsInitParams: {
            //TODO: Replace with cookie consent!!
            //https://www.algolia.com/doc/guides/building-search-ui/events/react/
            useCookie: false,
          },
        }}
      >
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
