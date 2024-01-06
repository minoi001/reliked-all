import "../styles/globals.css";
import Layout from "../components/Layout";
import ShopProvider from "../context/shopContext";
import ProductProvider from "../context/productContext";
import AccountProvider from "../context/accountContext";
import { useRouter } from "next/router";
import ErrorBoundary from "../components/ErrorBoundary";
import { indexNames, searchClient } from "../algoliaConfig";
import { InstantSearch } from "react-instantsearch";

export function indexToRoute(index) {
  switch (index) {
    case "shopify_products_price_asc":
      return "price_asc";
    case "shopify_products_price_desc":
      return "price_desc";
    case "shopify_products_published_at_desc":
      return "newest_in";
    default:
      return index;
  }
}

export function routeToIndex(route) {
  switch (route) {
    case "price_asc":
      return "shopify_products_price_asc";
    case "price_desc":
      return "shopify_products_price_desc";
    case "newest_in":
      return "shopify_products_published_at_desc";
    default:
      return route;
  }
}
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
        routing={{
          stateMapping: {
            stateToRoute(uiState) {
              const indexUiState = uiState[indexNames.products];
              const isSearchPage = location.pathname === "/search";
              if (!indexUiState || !isSearchPage) return null;
              return {
                q: indexUiState.query,
                sort_by: indexToRoute(indexUiState.sortBy),
                page: indexUiState.page,
              };
            },
            routeToState(routeState) {
              const isSearchPage = location.pathname === "/search";
              if (!isSearchPage) return null;
              return {
                [indexNames.products]: {
                  query: routeState.q,
                  sortBy: routeToIndex(routeState.sort_by),
                  page: routeState.page,
                },
              };
            },
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
