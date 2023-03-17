/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    SHOPIFY_STORE_DOMAIN: process.env.SHOPIFY_STORE_DOMAIN,
    SHOPIFY_STOREFRONT_ACCESSTOKEN: process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN,
    SHOPIFY_STOREFRONT_API_VERSION: process.env.SHOPIFY_STOREFRONT_API_VERSION,
    SHOPIFY_ADMIN_ACCESSTOKEN: process.env.SHOPIFY_ADMIN_ACCESSTOKEN,
    SHOPIFY_ADMIN_API_VERSION: process.env.SHOPIFY_ADMIN_API_VERSION,
    SHOPIFY_LOCATION_ID: process.env.SHOPIFY_LOCATION_ID,
    SHEETY_URL: process.env.SHEETY_URL,
    SHEETY_BEARER_TOKEN: process.env.SHEETY_BEARER_TOKEN,
    UPLOADCARE_PUBLIC_KEY: process.env.UPLOADCARE_PUBLIC_KEY,
  },
  images: {
    domains: [`cdn.shopify.com`, `tailwindui.com`],
  },
};
