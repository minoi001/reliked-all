const domain = process.env.SHOPIFY_STORE_DOMAIN;
const adminAccessToken = process.env.SHOPIFY_ADMIN_ACCESSTOKEN;
const apiVersion = process.env.SHOPIFY_ADMIN_API_VERSION;

import { gql, GraphQLClient } from "graphql-request";

const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

let input = {
  input: {},
};

async function GraphQLRequest(query, input, reqType) {
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      "X-Shopify-Access-Token": adminAccessToken,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  try {
    const res = await graphQLClient.request(query, input);
    return res;
  } catch (err) {
    console.error("an error occurred", err);
    return null;
  }
}

export async function initialiseRewardsGiftCard(input) {
  // TODO: send gift card value and deductable points value in input,
  const query = `
  mutation {
    giftCardCreate(input: {
      initial_value: ${input.cardValue},
      customerId: "${input.customerId}",
      note: "This is the rewards points gift card for ${input.customerEmail}"
    }) {
      gift_card {
        id
        code
        initial_value
        customerId
      }
      userErrors {
        field
        message
      }
    }
    
  }
`;

  const response = await GraphQLRequest(
    query,
    input,
    "initialiseRewardsGiftCard"
  );
  return response;
}

export async function pointsToGiftCard(input) {
  // TODO: send gift card value and deductable points value in input,
  const query = `
  mutation {
    giftCardUpdate(input: {
      id: "${input.giftCardId}",
      balance: {
        amount: ${input.giftCardAmount},
        currencyCode: "GBP"
      }
    }) {
      giftCard {
        id
        balance {
          amount
          currencyCode
        }
      }
      userErrors {
        field
        message
      }
    }
    customerUpdate(input: {
      id: "${input.customerId}",
      metafields: [{
        namespace: "custom",
        key: "reward_points",
        value: ${input.rewardPoints}
      }]
    }) {
      customer {
        id
        firstName
        lastName
        email
        metafields(namespace: "custom") {
          edges {
            node {
              key
              value
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

  const response = await GraphQLRequest(query, input, "pointsToGiftCard");
  return response;
}
