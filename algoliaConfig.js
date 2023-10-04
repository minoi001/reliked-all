import algoliasearch from "algoliasearch/lite";

const appId = process.env.ALGOLIA_APP_ID;
const apiKey = process.env.ALGOLIA_API_KEY;

const searchClient = algoliasearch(appId, apiKey);

const indexNames = {
  products: "shopify_products",
  collections: "shopify_collections",
};

const productIndex = searchClient.initIndex(indexNames.products);
async function getObjectIDByProductHandle(productHandle) {
  try {
    const { hits } = await productIndex.search("", {
      filters: `handle:${productHandle}`,
    });

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

const productPublishedAtIndex = searchClient.initIndex(
  "shopify_products_published_at_desc"
);

async function getNewestProducts() {
  try {
    const { hits } = await productPublishedAtIndex.search("", {
      filters: "collections:in-stock",
      hitsPerPage: 4,
    });
    return hits;
  } catch (error) {
    console.error("***Error fetching Algolia data (NewIn):", error);
    return null;
  }
}

export {
  searchClient,
  indexNames,
  getObjectIDByProductHandle,
  getNewestProducts,
};
