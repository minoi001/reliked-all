const axios = require("axios");

var domain = process.env.SHOPIFY_STORE_DOMAIN;
var accessToken = process.env.SHOPIFY_ADMIN_ACCESSTOKEN;

async function createProduct(productData) {
  const result = await axios({
    url: `https://${domain}/admin/api/2022-04/graphql.json`,
    method: "POST",
    headers: {
      "Access-Control-Request-Headers": "X-Shopify-Access-Token",
      "Access-Control-Allow-Headers": "X-Shopify-Access-Token",
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": `${accessToken}`,
      // Host: "https://reliked.com/",
    },
    data: {
      query: `${productCreationQuery}`,
      variables: productData,
    },
  });

  console.log("RESULTS", result.data);
  return result.data;
}

const productCreationQuery = `mutation productCreate($input:ProductInput!) {
      productCreate(input:$input) {
        userErrors {
          field
          message
        }
        product {
          id
          title
          description
          variants(first:1) {
            edges {
              node {
                id
                price
              }
            }
          }
        }
      }
    }`;

export default async function handler(req, res) {
  try {
    const result = await createProduct(req.body);
    res.send(result.data);
  } catch (err) {
    res.status(400).send({ message: err });
  }
}
