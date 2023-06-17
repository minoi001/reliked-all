import algoliasearch from "algoliasearch/lite";

const appId = process.env.ALGOLIA_APP_ID;
const apiKey = process.env.ALGOLIA_API_KEY;

const searchClient = algoliasearch(appId, apiKey);

const indexNames = {
  products: "shopify_products",
  collections: "shopify_collections",
};

export { searchClient, indexNames };
