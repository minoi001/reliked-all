import algoliasearch from "algoliasearch/lite";

const appId = process.env.ALGOLIA_APP_ID;
const apiKey = process.env.ALGOLIA_API_KEY;

const searchClient = algoliasearch(appId, apiKey);

const indexNames = {
  products: "shopify_products",
  collections: "shopify_collections",
};

const index = searchClient.initIndex(indexNames.products);
async function getObjectIDByProductHandle(productHandle) {
  try {
    const { hits } = await index.search(productHandle);
    if (hits.length > 0) {
      // Assuming there's only one matching result, you can access its objectID.
      const objectID = hits[0].objectID;
      return `${objectID}`;
    } else {
      // Handle the case when no results are found for the given handle.
      return "";
    }
  } catch (error) {
    console.error("***Error fetching Algolia data:", error);
    return null;
  }
}
export { searchClient, indexNames, getObjectIDByProductHandle };
