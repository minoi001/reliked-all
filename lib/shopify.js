const domain = process.env.SHOPIFY_STOREFRONT_DOMAIN;
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

  try {
    const res = await graphQLClient.request(query, input);
    return res;
  } catch (err) {
    console.error("an error occurred", err);
    return null;
  }
}

export async function getHeaderContent(id) {
  const query = gql`
    {
      metaobject(id: "gid://shopify/Metaobject/57180350") {
        logo: field(key: "logo") {
          key
          value
        }
        bannertext: field(key: "banner_text") {
          key
          value
        }
        banner_background_colour: field(key: "banner_text") {
          key
          value
        }
        background_image_pattern: field(key: "banner_text") {
          key
          value
        }
      }
    }
  `;
  const response = await GraphQLRequest(query, input, "getHeaderContent");
  return response;
}

export async function getHomepageContent(id) {
  const query = gql`
    {
      metaobject(id: "gid://shopify/Metaobject/57147582") {
        hero_image: field(key: "hero_image") {
          key
          value
        }
        hero_image_mobile: field(key: "hero_image_mobile") {
          key
          value
        }
        featured_influencers: field(key: "featured_influencers_homepage") {
          key
          value
        }
        two_featured_collections: field(key: "2_featured_collections") {
          key
          value
        }
      }
    }
  `;
  const response = await GraphQLRequest(query, input, "getHomepageContent");
  return response?.metaobject;
}

export async function getUserAccessToken(email, password) {
  input = {
    input: {
      email: `${email}`,
      password: `${password}`,
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

  const response = await GraphQLRequest(query, input, "getUserAccessToken");

  return response;
}

export async function getProductHandleByVariant(id) {
  input = { id: "gid://shopify/ProductVariant/43311184904382" };
  const query = gql`
    query getProductVariantsFromNode($id: ID!) {
      node(id: $id) {
        id
        ... on Product {
          handle
          variants(first: 5) {
            edges {
              node {
                id
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
    "getProductVariantsFromNode"
  ).then((response) => response.data);
  return response;
}

export async function getUserInfo(token) {
  const query = gql`{
    customer(customerAccessToken: "${token}") {
          firstName
          lastName
          email
          phone
          addresses(first:4, reverse: true) {
            edges {
              node {
                formatted
                id
              }
            }
          }
          orders(first:4, reverse: true) {
            edges {
              node {
                id
                name
                createdAt: processedAt
                totalPriceV2 {
                          amount
                          currencyCode
                        }
                lineItems(first:6) {
                  edges {
                    node {
                      title
                      quantity

                      discountedTotalPrice {
                        amount
                      }
                      variant {
                        id
                        image {
                          src
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          userType: metafield(
                      namespace: "my_fields",
                      key: "user_type"
                  ) {
                      value
                  }
          userCode: metafield(
                    namespace: "my_fields",
                    key: "lister_code"
                ) {
                    value
                }
    }
  }`;

  const response = await GraphQLRequest(query, input, "getUserInfo");
  return response;
}

export async function resetUserPasswordByURL(password, resetUrl) {
  input = {
    password: `${password}`,
    resetUrl: `${resetUrl}`,
  };

  const query = gql`
    mutation customerResetByUrl($password: String!, $resetUrl: URL!) {
      customerResetByUrl(password: $password, resetUrl: $resetUrl) {
        customer {
          id
        }
        customerAccessToken {
          accessToken
        }
        customerUserErrors {
          message
        }
      }
    }
  `;
  const response = await GraphQLRequest(query, input, "resetUserPasswordByURL");

  return response;
}

export async function recoverUserAccount(email) {
  input = {
    input: `${email}`,
  };

  const query = gql`
    mutation customerRecover($input: String!) {
      customerRecover(email: $input) {
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const response = await GraphQLRequest(query, input, "recoverUserAccount");

  return response;
}

export async function getCollection(handle) {
  const query = gql`
    {
      collection(handle: "${handle}") {
        title
        description
        type: metafield(namespace: "custom_fields", key: "collection_type") {
        value
        type
      }
        vendor: metafield(namespace: "custom_fields", key: "vendor_name") {
        value
        type
      }
        aso: metafield(namespace: "custom", key: "aso_tag") {
        value
        type
      }
        category: metafield(namespace: "custom", key: "collection_category") {
        value
        type
      }
      descriptionHtml
      seo {
        description
        title
      }
      }
    }
  `;

  const response = await GraphQLRequest(query, input, "getCollection");

  const collection = response ? response.collection : [];

  return collection;
}

export async function getProduct(handle) {
  const query = `
  {
    product(handle: "${handle}") {
      id
      createdAt
      availableForSale
      title
      condition: metafield(namespace: "custom_fields", key: "product_condition") {
        value
        type
      }
      packaging: metafield(namespace: "custom_fields", key: "product_packaging") {
        value
        type
      }
      influencer: metafield(namespace: "custom", key: "influencer") {
        value
        type
      }
      type: productType
      handle
      description
      descriptionHtml
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
      tags
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
              currencyCode
            }
            compareAtPrice {
            amount
            currencyCode
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

export async function getPage(handle) {
  const query = `
  {
    page(handle: "${handle}") {
      id
      handle
      title
      body
      bodySummary
      seo {
        title
        description
      }
      createdAt
      updatedAt
      }
  }`;

  const response = await GraphQLRequest(query, input, "getPage");
  const page = response.page ? response.page : [];

  return page;
}

export async function getBlogPostsList() {
  const query = `
  {
    blog(handle: "retold") {
      id
      title
      articles(first: 12, sortKey: PUBLISHED_AT, reverse: true) {
        edges {
          node {
            id
            title
            excerpt
            handle
            image {
            	url
            }
          }
        }
      }
    }
  }`;

  const response = await GraphQLRequest(query, input, "getBlogPostList");
  const blog = response.blog ? response.blog : [];
  return blog;
}

export async function getBlogPost(handle) {
  const query = `
  {
    blog(handle: "retold") {
      id
      title
      articleByHandle(handle:"${handle}") {
            id
            title
            excerpt
            handle
            contentHtml
            image {
            	url
            }
          }
        }
}`;

  const response = await GraphQLRequest(query, input, "getBlogPost");
  const post = response.blog.articleByHandle
    ? response.blog.articleByHandle
    : [];

  return post;
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
      userErrors {
        field
        message
        code
      }
    }
  }`;

  const response = await GraphQLRequest(query, input, "updateCheckout");
  // console.log("checkout", response);
  const checkout = response.checkoutLineItemsReplace.checkout
    ? response.checkoutLineItemsReplace.checkout
    : [];

  return checkout;
}

export async function getNavigation() {
  const query = gql`
    {
      menu(handle: "main-menu") {
        items {
          name: title
          href: url
          items {
            name: title
            href: url
            items {
              name: title
              href: url
            }
          }
        }
      }
    }
  `;

  const response = await GraphQLRequest(query, input, "getNavigation");

  return response.menu;
}

export async function getFooterNav() {
  const query = gql`
    {
      menu(handle: "footer") {
        items {
          name: title
          href: url
          items {
            name: title
            href: url
            items {
              name: title
              href: url
            }
          }
        }
      }
    }
  `;

  const response = await GraphQLRequest(query, input, "getFooterNav");

  return response.menu;
}

export async function updateCustomerReq(input) {
  const query = `
  mutation customerUpdate($customer: CustomerUpdateInput!, $customerAccessToken: String!) {
    customerUpdate(customer: $customer, customerAccessToken: $customerAccessToken) {
        customer {
          id
          firstName
          lastName
        }
        customerAccessToken {
          accessToken
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }`;

  const response = await GraphQLRequest(query, input, "updateCustomer");
  const token = response.customerAccessToken
    ? response.customerAccessToken.accessToken
    : input.customerAccessToken;

  return token;
}

export async function updateCustomerAddressReq(input) {
  const query = `
    mutation customerAddressUpdate($address: MailingAddressInput!, $customerAccessToken: String!, $id: ID!) {
      customerAddressUpdate(address: $address, customerAccessToken: $customerAccessToken, id: $id) {
        customerAddress {
          firstName
          lastName
          phone
          formatted
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }`;

  const response = await GraphQLRequest(query, input, "updateCustomer");
  const address = response.customerAddressUpdate.customerAddress
    ? response.customerAddressUpdate.customerAddress
    : "error";

  return address;
}

export async function deleteCustomerAddressReq(input) {
  const query = `
  mutation customerAddressDelete($customerAccessToken: String!, $id: ID!) {
    customerAddressDelete(customerAccessToken: $customerAccessToken, id: $id) {
      customerUserErrors {
        field
        message
        code
      }
      deletedCustomerAddressId
    }
  }`;

  const response = await GraphQLRequest(query, input, "updateCustomer");
  return response;
}
