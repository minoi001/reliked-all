const domain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN;
const apiVersion = process.env.SHOPIFY_STOREFRONT_API_VERSION;
import { gql, GraphQLClient } from "graphql-request";

const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

let input = {
  input: {},
};

async function GraphQLRequest(query, input, reqType) {
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const res = await graphQLClient.request(query, input);
  console.log(reqType, res);
  return res;
}

export async function getUserInfo(email, password) {
  input = {
    input: {
      email: "office@reliked.com",
      password: "acp1rvz!TUP7uka4ehn",
    },
  };

  const query = gql`
    mutation customerAccessTokenCreate(
      $input: CustomerAccessTokenCreateInput!
    ) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const response = await GraphQLRequest(query, input, "getUserInfo");
  return response;
}

export async function getProductsInCollection() {
  const query = gql`
    {
      collection(handle: "in-stock") {
        title
        products(first: 6) {
          edges {
            node {
              id
              title
              handle
              priceRange {
                minVariantPrice {
                  amount
                }
              }
              images(first: 5) {
                edges {
                  node {
                    originalSrc
                    altText
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await GraphQLRequest(
    query,
    input,
    "getProductsInCollection"
  );

  const allProducts = response.collection.products.edges
    ? response.collection.products.edges
    : response;

  return allProducts;
}

export async function getAllProducts() {
  const query = `{
      collection(handle: "in-stock") {
      products(first: 6) {
        edges {
          node {
            handle
            id
          }
        }
      }
    }
  }`;

  const response = await GraphQLRequest(query, input, "getAllProducts");
  const slugs = response.collection.products.edges
    ? response.collection.products.edges
    : [];

  return slugs;
}

export async function getProduct(handle) {
  const query = `
  {
    product(handle: "${handle}") {
    	collections(first: 1, reverse: true) {
      	edges {
          node {
            products(first: 6) {
              edges {
                node {
                  priceRange {
                    minVariantPrice {
                      amount
                    }
                  }
                  handle
                  title
                  id
                  images(first: 1) {
                    edges {
                      node {
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
        }
    	}
      id
      title
      handle
      description
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      options {
        name
        values
        id
      }
      variants(first: 5) {
        edges {
          node {
            selectedOptions {
              name
              value
            }
            image {
              url
              altText
            }
            title
            id
            availableForSale
            priceV2 {
              amount
            }
          }
        }
      }
    }
  }`;

  const response = await GraphQLRequest(query, input, "getProduct");
  const product = response.product ? response.product : [];

  return product;
}

export async function createCheckout(id, quantity) {
  const query = `
    mutation {
      checkoutCreate(input: {
        lineItems: [{
          variantId: "${id}", 
          quantity: ${quantity}
        }]
      }) {
        checkout {
          id
          webUrl
          lineItems(first: 100) {
            edges {
              node {
                id
                title
                quantity
              }
            }
          }
        }
      }
    }`;

  const response = await GraphQLRequest(query, input, "createCheckout");

  console.log(response);
  const checkout = response.checkoutCreate.checkout
    ? response.checkoutCreate.checkout
    : [];

  return checkout;
}

export async function updateCheckout(id, lineItems) {
  const lineItemsObject = lineItems.map((item) => {
    return `{
      variantId: "${item.variantId}",
      quantity: ${item.variantQuantity}
    }`;
  });

  const query = `mutation {
    checkoutLineItemsReplace(lineItems: [${lineItemsObject}], checkoutId:"${id}") {
      checkout {
        id
        webUrl
        lineItems(first: 100) {
          edges {
            node {
              id
              title
              quantity
            }
          }
        }
      }
    }
  }`;

  const response = await GraphQLRequest(query, input, "updateCheckout");
  console.log(response);
  const checkout = response.checkoutLineItemsReplace.checkout
    ? response.checkoutLineItemsReplace.checkout
    : [];

  return checkout;
}
